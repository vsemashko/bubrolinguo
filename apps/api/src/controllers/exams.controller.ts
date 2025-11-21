import { Request, Response } from 'express';
import { query, transaction } from '../db/connection';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

/**
 * Get all available mock exams
 */
export async function getMockExams(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { level, exam_type } = req.query;

    let whereClause = 'WHERE me.is_published = true';
    const params: any[] = [];
    let paramCount = 1;

    if (level && level !== 'all') {
      whereClause += ` AND me.level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }

    if (exam_type && exam_type !== 'all') {
      whereClause += ` AND me.exam_type = $${paramCount}`;
      params.push(exam_type);
      paramCount++;
    }

    const result = await query(
      `SELECT
        me.id, me.title_en, me.title_ru, me.description_en, me.description_ru,
        me.level, me.exam_type, me.total_time_minutes, me.passing_score_percentage,
        (SELECT json_agg(json_build_object(
          'section_type', mes.section_type,
          'title_en', mes.title_en,
          'title_ru', mes.title_ru,
          'time_limit_minutes', mes.time_limit_minutes,
          'max_points', mes.max_points,
          'question_count', (SELECT COUNT(*) FROM exam_questions WHERE section_id = mes.id)
        ) ORDER BY mes.section_number)
        FROM mock_exam_sections mes
        WHERE mes.mock_exam_id = me.id) as sections,
        (SELECT json_agg(json_build_object(
          'attempt_id', uea.id,
          'status', uea.status,
          'percentage_score', uea.percentage_score,
          'completed_at', uea.completed_at
        ) ORDER BY uea.created_at DESC)
        FROM user_exam_attempts uea
        WHERE uea.user_id = $${paramCount} AND uea.mock_exam_id = me.id
        LIMIT 5) as user_attempts
      FROM mock_exams me
      ${whereClause}
      ORDER BY me.level, me.title_en`,
      [...params, userId]
    );

    res.json({
      success: true,
      data: {
        exams: result.rows,
        total: result.rows.length
      }
    });
  } catch (error) {
    logger.error('Error getting mock exams', { error });
    throw error;
  }
}

/**
 * Get exam by ID with all details
 */
export async function getExamById(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const examResult = await query(
      `SELECT
        me.*,
        (SELECT json_agg(json_build_object(
          'id', mes.id,
          'section_type', mes.section_type,
          'section_number', mes.section_number,
          'title_en', mes.title_en,
          'title_ru', mes.title_ru,
          'instructions_en', mes.instructions_en,
          'instructions_ru', mes.instructions_ru,
          'time_limit_minutes', mes.time_limit_minutes,
          'max_points', mes.max_points,
          'questions', (
            SELECT json_agg(json_build_object(
              'id', eq.id,
              'question_number', eq.question_number,
              'question_type', eq.question_type,
              'points', eq.points,
              'difficulty', eq.difficulty
            ) ORDER BY eq.question_number)
            FROM exam_questions eq
            WHERE eq.section_id = mes.id
          )
        ) ORDER BY mes.section_number)
        FROM mock_exam_sections mes
        WHERE mes.mock_exam_id = me.id) as sections
      FROM mock_exams me
      WHERE me.id = $1 AND me.is_published = true`,
      [id]
    );

    if (examResult.rows.length === 0) {
      throw new AppError('Mock exam not found', 404, 'EXAM_NOT_FOUND');
    }

    res.json({
      success: true,
      data: { exam: examResult.rows[0] }
    });
  } catch (error) {
    logger.error('Error getting exam', { error });
    throw error;
  }
}

/**
 * Start exam attempt
 */
export async function startExamAttempt(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const attemptResult = await transaction(async (client) => {
      // Insert new attempt
      const result = await client.query(
        `INSERT INTO user_exam_attempts (
          user_id, mock_exam_id, status, started_at
        ) VALUES ($1, $2, 'in_progress', CURRENT_TIMESTAMP)
        RETURNING id, started_at`,
        [userId, id]
      );

      const attemptId = result.rows[0].id;
      const startedAt = result.rows[0].started_at;

      // Get exam details and first section
      const examData = await client.query(
        `SELECT
          me.total_time_minutes,
          (SELECT json_build_object(
            'id', mes.id,
            'section_type', mes.section_type,
            'title_en', mes.title_en,
            'time_limit_minutes', mes.time_limit_minutes,
            'questions', (
              SELECT json_agg(json_build_object(
                'id', eq.id,
                'question_number', eq.question_number,
                'question_type', eq.question_type,
                'question_data', eq.question_data,
                'points', eq.points,
                'difficulty', eq.difficulty
              ) ORDER BY eq.question_number)
              FROM exam_questions eq
              WHERE eq.section_id = mes.id
            )
          )
          FROM mock_exam_sections mes
          WHERE mes.mock_exam_id = me.id
          ORDER BY mes.section_number
          LIMIT 1) as current_section
        FROM mock_exams me
        WHERE me.id = $1`,
        [id]
      );

      const expiresAt = new Date(startedAt);
      expiresAt.setMinutes(expiresAt.getMinutes() + examData.rows[0].total_time_minutes);

      return {
        attempt_id: attemptId,
        exam_id: parseInt(id),
        status: 'in_progress',
        started_at: startedAt,
        expires_at: expiresAt,
        current_section: examData.rows[0].current_section
      };
    });

    res.json({
      success: true,
      data: attemptResult
    });
  } catch (error) {
    logger.error('Error starting exam attempt', { error });
    throw error;
  }
}

/**
 * Submit section answers
 */
export async function submitSectionAnswers(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { attemptId, sectionId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      throw new AppError('Invalid answers format', 400, 'INVALID_ANSWERS');
    }

    const results = await transaction(async (client) => {
      // Verify attempt belongs to user
      const attemptCheck = await client.query(
        `SELECT status FROM user_exam_attempts WHERE id = $1 AND user_id = $2`,
        [attemptId, userId]
      );

      if (attemptCheck.rows.length === 0) {
        throw new AppError('Exam attempt not found', 404, 'ATTEMPT_NOT_FOUND');
      }

      if (attemptCheck.rows[0].status !== 'in_progress') {
        throw new AppError('Exam attempt is not in progress', 400, 'INVALID_STATUS');
      }

      // Insert user answers and auto-grade where possible
      let correctCount = 0;
      let incorrectCount = 0;
      let pointsEarned = 0;
      let pointsPossible = 0;

      for (const answer of answers) {
        const { question_id, answer_data, time_spent_seconds } = answer;

        // Get question details
        const questionResult = await client.query(
          `SELECT question_type, points, correct_answers FROM exam_questions WHERE id = $1`,
          [question_id]
        );

        if (questionResult.rows.length === 0) continue;

        const question = questionResult.rows[0];
        pointsPossible += question.points;

        // Auto-grade multiple choice and fill blank
        let isCorrect = null;
        let pointsForQuestion = 0;
        let gradedBy = 'automatic';

        if (question.question_type === 'multiple_choice' && question.correct_answers) {
          const correctAnswers = question.correct_answers;
          isCorrect = correctAnswers.includes(answer_data.selectedOptionId);
          if (isCorrect) {
            correctCount++;
            pointsForQuestion = question.points;
            pointsEarned += pointsForQuestion;
          } else {
            incorrectCount++;
          }
        } else if (question.question_type === 'fill_blank' && question.correct_answers) {
          const correctAnswers = question.correct_answers;
          const userAnswer = answer_data.answers ? answer_data.answers[0] : answer_data.answer;
          isCorrect = correctAnswers.some((correct: string) =>
            userAnswer.toLowerCase().trim() === correct.toLowerCase().trim()
          );
          if (isCorrect) {
            correctCount++;
            pointsForQuestion = question.points;
            pointsEarned += pointsForQuestion;
          } else {
            incorrectCount++;
          }
        } else {
          // Essay, speaking, etc. require manual grading
          gradedBy = 'pending';
        }

        // Insert answer
        await client.query(
          `INSERT INTO user_exam_answers (
            attempt_id, question_id, answer_data, is_correct,
            points_earned, points_possible, graded_by, time_spent_seconds
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            attemptId, question_id, JSON.stringify(answer_data), isCorrect,
            pointsForQuestion, question.points, gradedBy, time_spent_seconds
          ]
        );
      }

      // Get next section
      const nextSectionResult = await client.query(
        `SELECT mes.id, mes.section_type, mes.title_en, mes.time_limit_minutes,
          (SELECT json_agg(json_build_object(
            'id', eq.id,
            'question_number', eq.question_number,
            'question_type', eq.question_type,
            'question_data', eq.question_data,
            'points', eq.points,
            'difficulty', eq.difficulty
          ) ORDER BY eq.question_number)
          FROM exam_questions eq
          WHERE eq.section_id = mes.id) as questions
        FROM mock_exam_sections mes
        WHERE mes.mock_exam_id = (
          SELECT mock_exam_id FROM user_exam_attempts WHERE id = $1
        )
        AND mes.section_number > (
          SELECT section_number FROM mock_exam_sections WHERE id = $2
        )
        ORDER BY mes.section_number
        LIMIT 1`,
        [attemptId, sectionId]
      );

      return {
        section_completed: true,
        auto_graded_results: {
          correct_count: correctCount,
          incorrect_count: incorrectCount,
          points_earned: pointsEarned,
          points_possible: pointsPossible
        },
        manual_grading_required: answers.some(a =>
          ['essay', 'short_answer', 'speaking_prompt'].includes(a.question_type)
        ),
        next_section: nextSectionResult.rows.length > 0 ? nextSectionResult.rows[0] : null
      };
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    logger.error('Error submitting section answers', { error });
    throw error;
  }
}

/**
 * Complete exam attempt
 */
export async function completeExamAttempt(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { attemptId } = req.params;

    const results = await transaction(async (client) => {
      // Calculate final scores
      const scoresResult = await client.query(
        `SELECT
          SUM(COALESCE(points_earned, 0)) as total_earned,
          SUM(points_possible) as total_possible,
          COUNT(*) FILTER (WHERE is_correct = true) as correct_count,
          COUNT(*) FILTER (WHERE is_correct = false) as incorrect_count
        FROM user_exam_answers
        WHERE attempt_id = $1`,
        [attemptId]
      );

      const scores = scoresResult.rows[0];
      const percentageScore = (scores.total_earned / scores.total_possible * 100).toFixed(2);

      // Get passing score
      const examResult = await client.query(
        `SELECT passing_score_percentage
        FROM mock_exams
        WHERE id = (SELECT mock_exam_id FROM user_exam_attempts WHERE id = $1)`,
        [attemptId]
      );

      const passingScore = examResult.rows[0].passing_score_percentage;
      const passed = parseFloat(percentageScore) >= passingScore;

      // Update attempt
      await client.query(
        `UPDATE user_exam_attempts SET
          status = 'completed',
          completed_at = CURRENT_TIMESTAMP,
          time_spent_minutes = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - started_at))/60,
          total_points_earned = $1,
          total_points_possible = $2,
          percentage_score = $3,
          passed = $4
        WHERE id = $5`,
        [scores.total_earned, scores.total_possible, percentageScore, passed, attemptId]
      );

      // Get section breakdown
      const sectionScores = await client.query(
        `SELECT
          mes.section_type,
          SUM(COALESCE(uea.points_earned, 0)) as earned,
          SUM(uea.points_possible) as possible,
          ROUND(SUM(COALESCE(uea.points_earned, 0)) / SUM(uea.points_possible) * 100, 2) as percentage
        FROM mock_exam_sections mes
        INNER JOIN exam_questions eq ON eq.section_id = mes.id
        INNER JOIN user_exam_answers uea ON uea.question_id = eq.id
        WHERE uea.attempt_id = $1
        GROUP BY mes.section_type`,
        [attemptId]
      );

      const sectionScoresObj: any = {};
      sectionScores.rows.forEach(row => {
        sectionScoresObj[row.section_type] = {
          earned: parseFloat(row.earned),
          possible: parseInt(row.possible),
          percentage: parseFloat(row.percentage)
        };
      });

      return {
        attempt_id: parseInt(attemptId),
        status: 'completed',
        completed_at: new Date(),
        total_points_earned: parseFloat(scores.total_earned),
        total_points_possible: parseInt(scores.total_possible),
        percentage_score: parseFloat(percentageScore),
        passed,
        section_scores: sectionScoresObj
      };
    });

    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    logger.error('Error completing exam attempt', { error });
    throw error;
  }
}

/**
 * Get exam attempt results
 */
export async function getExamResults(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { attemptId } = req.params;

    const result = await query(
      `SELECT
        uea.*,
        me.title_en, me.title_ru, me.level,
        (SELECT json_agg(json_build_object(
          'section_type', mes.section_type,
          'questions', (
            SELECT json_agg(json_build_object(
              'question_id', eq.id,
              'question_number', eq.question_number,
              'question_type', eq.question_type,
              'question_data', eq.question_data,
              'user_answer', ueans.answer_data,
              'is_correct', ueans.is_correct,
              'points_earned', ueans.points_earned,
              'points_possible', ueans.points_possible,
              'feedback_en', ueans.feedback_en,
              'feedback_ru', ueans.feedback_ru
            ) ORDER BY eq.question_number)
            FROM exam_questions eq
            INNER JOIN user_exam_answers ueans ON ueans.question_id = eq.id
            WHERE eq.section_id = mes.id AND ueans.attempt_id = uea.id
          )
        ))
        FROM mock_exam_sections mes
        WHERE mes.mock_exam_id = me.id) as detailed_results
      FROM user_exam_attempts uea
      INNER JOIN mock_exams me ON me.id = uea.mock_exam_id
      WHERE uea.id = $1 AND uea.user_id = $2`,
      [attemptId, userId]
    );

    if (result.rows.length === 0) {
      throw new AppError('Exam results not found', 404, 'RESULTS_NOT_FOUND');
    }

    res.json({
      success: true,
      data: { results: result.rows[0] }
    });
  } catch (error) {
    logger.error('Error getting exam results', { error });
    throw error;
  }
}

/**
 * Get study resources
 */
export async function getStudyResources(req: Request, res: Response) {
  try {
    const { level, section_type, resource_type } = req.query;

    let whereClause = 'WHERE is_published = true';
    const params: any[] = [];
    let paramCount = 1;

    if (level && level !== 'all') {
      whereClause += ` AND level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }

    if (section_type && section_type !== 'all') {
      whereClause += ` AND section_type = $${paramCount}`;
      params.push(section_type);
      paramCount++;
    }

    if (resource_type && resource_type !== 'all') {
      whereClause += ` AND resource_type = $${paramCount}`;
      params.push(resource_type);
      paramCount++;
    }

    const result = await query(
      `SELECT * FROM exam_study_resources
      ${whereClause}
      ORDER BY level, display_order, section_type`,
      params
    );

    res.json({
      success: true,
      data: {
        resources: result.rows,
        total: result.rows.length
      }
    });
  } catch (error) {
    logger.error('Error getting study resources', { error });
    throw error;
  }
}
