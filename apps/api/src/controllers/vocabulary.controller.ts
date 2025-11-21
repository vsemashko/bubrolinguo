import { Request, Response } from 'express';
import { query, transaction } from '../db/connection';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

/**
 * Get vocabulary review queue (spaced repetition)
 */
export async function getReviewQueue(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await query(
      `SELECT
        v.id, v.polish_word, v.translation_en, v.translation_ru,
        v.part_of_speech, v.gender, v.level, v.frequency_rank,
        v.pronunciation_ipa, v.example_sentence_pl, v.example_sentence_en,
        v.example_sentence_ru, v.mnemonic_en, v.mnemonic_ru,
        v.image_url, v.audio_url, v.audio_slow_url,
        uv.proficiency_level, uv.easiness_factor, uv.interval_days,
        uv.next_review_date, uv.times_reviewed, uv.times_correct,
        uv.times_incorrect, uv.current_streak, uv.status
      FROM user_vocabulary uv
      JOIN vocabulary v ON uv.vocabulary_id = v.id
      WHERE uv.user_id = $1
      AND uv.next_review_date <= CURRENT_DATE
      ORDER BY uv.next_review_date ASC, v.frequency_rank ASC
      LIMIT $2`,
      [userId, limit]
    );

    const words = result.rows.map((row) => ({
      id: row.id,
      polishWord: row.polish_word,
      translationEn: row.translation_en,
      translationRu: row.translation_ru,
      partOfSpeech: row.part_of_speech,
      gender: row.gender,
      level: row.level,
      frequencyRank: row.frequency_rank,
      pronunciationIpa: row.pronunciation_ipa,
      exampleSentencePl: row.example_sentence_pl,
      exampleSentenceEn: row.example_sentence_en,
      exampleSentenceRu: row.example_sentence_ru,
      mnemonicEn: row.mnemonic_en,
      mnemonicRu: row.mnemonic_ru,
      imageUrl: row.image_url,
      audioUrl: row.audio_url,
      audioSlowUrl: row.audio_slow_url,
      userProgress: {
        proficiencyLevel: row.proficiency_level,
        easinessFactor: parseFloat(row.easiness_factor),
        intervalDays: row.interval_days,
        nextReviewDate: row.next_review_date,
        timesReviewed: row.times_reviewed,
        timesCorrect: row.times_correct,
        timesIncorrect: row.times_incorrect,
        currentStreak: row.current_streak,
        status: row.status,
      },
    }));

    // Count total due
    const countResult = await query(
      `SELECT COUNT(*) as total
       FROM user_vocabulary
       WHERE user_id = $1 AND next_review_date <= CURRENT_DATE`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        words,
        totalDue: parseInt(countResult.rows[0].total),
      },
    });
  } catch (error) {
    logger.error('Error getting review queue', { error });
    throw error;
  }
}

/**
 * Submit review results (SM-2 algorithm)
 */
export async function submitReviewResults(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { results } = req.body;

    if (!Array.isArray(results) || results.length === 0) {
      throw new AppError('Results array is required', 400, 'INVALID_INPUT');
    }

    let totalXpEarned = 0;

    await transaction(async (client) => {
      for (const result of results) {
        const { vocabularyId, quality, timeSpent, correct } = result;

        // Get current user vocabulary data
        const uvResult = await client.query(
          `SELECT * FROM user_vocabulary
           WHERE user_id = $1 AND vocabulary_id = $2`,
          [userId, vocabularyId]
        );

        if (uvResult.rows.length === 0) continue;

        const uv = uvResult.rows[0];

        // SM-2 algorithm calculations
        let newEasinessFactor = parseFloat(uv.easiness_factor);
        let newInterval = uv.interval_days;
        let newProficiencyLevel = uv.proficiency_level;

        // Update easiness factor
        newEasinessFactor = newEasinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (newEasinessFactor < 1.3) newEasinessFactor = 1.3;

        // Calculate new interval
        if (quality < 3) {
          // Incorrect - reset
          newInterval = 1;
          newProficiencyLevel = 0;
        } else {
          // Correct - increase interval
          if (newProficiencyLevel === 0) {
            newInterval = 1;
          } else if (newProficiencyLevel === 1) {
            newInterval = 6;
          } else {
            newInterval = Math.round(uv.interval_days * newEasinessFactor);
          }
          newProficiencyLevel++;
          if (newProficiencyLevel > 5) newProficiencyLevel = 5;
        }

        // Calculate next review date
        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

        // Determine status
        let status = 'learning';
        if (newProficiencyLevel >= 5) status = 'mastered';
        else if (quality < 3 && uv.times_reviewed > 0) status = 'relearning';

        // Update user vocabulary
        await client.query(
          `UPDATE user_vocabulary SET
            proficiency_level = $1,
            easiness_factor = $2,
            interval_days = $3,
            next_review_date = $4,
            times_reviewed = times_reviewed + 1,
            times_correct = times_correct + $5,
            times_incorrect = times_incorrect + $6,
            current_streak = CASE WHEN $7 THEN current_streak + 1 ELSE 0 END,
            status = $8,
            last_reviewed_at = CURRENT_TIMESTAMP
           WHERE user_id = $9 AND vocabulary_id = $10`,
          [
            newProficiencyLevel,
            newEasinessFactor,
            newInterval,
            nextReviewDate,
            correct ? 1 : 0,
            correct ? 0 : 1,
            correct,
            status,
            userId,
            vocabularyId,
          ]
        );

        // Award XP (1-5 XP based on quality)
        const xp = Math.max(1, quality);
        totalXpEarned += xp;
      }

      // Update user total XP
      await client.query(
        `UPDATE users SET total_xp = total_xp + $1 WHERE id = $2`,
        [totalXpEarned, userId]
      );

      // Update daily activity
      await client.query(
        `INSERT INTO daily_activity (user_id, activity_date, xp_earned, words_reviewed)
         VALUES ($1, CURRENT_DATE, $2, $3)
         ON CONFLICT (user_id, activity_date)
         DO UPDATE SET
           xp_earned = daily_activity.xp_earned + $2,
           words_reviewed = daily_activity.words_reviewed + $3`,
        [userId, totalXpEarned, results.length]
      );
    });

    // Get next review count
    const nextResult = await query(
      `SELECT COUNT(*) as next_count
       FROM user_vocabulary
       WHERE user_id = $1 AND next_review_date <= CURRENT_DATE`,
      [userId]
    );

    res.json({
      success: true,
      data: {
        words_reviewed: results.length,
        xp_earned: totalXpEarned,
        next_review_count: parseInt(nextResult.rows[0].next_count),
      },
    });
  } catch (error) {
    logger.error('Error submitting review results', { error });
    throw error;
  }
}

/**
 * Get vocabulary statistics
 */
export async function getVocabularyStats(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    const result = await query(
      `SELECT
        COUNT(*) as total_words,
        COUNT(*) FILTER (WHERE status = 'new') as new_words,
        COUNT(*) FILTER (WHERE status = 'learning') as learning_words,
        COUNT(*) FILTER (WHERE status = 'mastered') as mastered_words,
        COUNT(*) FILTER (WHERE next_review_date = CURRENT_DATE) as due_today,
        MAX(current_streak) as longest_streak
       FROM user_vocabulary
       WHERE user_id = $1`,
      [userId]
    );

    const stats = {
      totalWords: parseInt(result.rows[0].total_words),
      newWords: parseInt(result.rows[0].new_words || 0),
      learningWords: parseInt(result.rows[0].learning_words || 0),
      masteredWords: parseInt(result.rows[0].mastered_words || 0),
      wordsReviewDueToday: parseInt(result.rows[0].due_today || 0),
      longestStreak: parseInt(result.rows[0].longest_streak || 0),
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Error getting vocabulary stats', { error });
    throw error;
  }
}

/**
 * Get vocabulary word by ID
 */
export async function getVocabularyById(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const result = await query(
      `SELECT
        v.*,
        uv.proficiency_level, uv.easiness_factor, uv.interval_days,
        uv.next_review_date, uv.times_reviewed, uv.times_correct,
        uv.times_incorrect, uv.current_streak, uv.status
      FROM vocabulary v
      LEFT JOIN user_vocabulary uv ON v.id = uv.vocabulary_id AND uv.user_id = $1
      WHERE v.id = $2`,
      [userId, id]
    );

    if (result.rows.length === 0) {
      throw new AppError('Vocabulary not found', 404, 'VOCABULARY_NOT_FOUND');
    }

    const row = result.rows[0];
    const word = {
      id: row.id,
      polishWord: row.polish_word,
      translationEn: row.translation_en,
      translationRu: row.translation_ru,
      partOfSpeech: row.part_of_speech,
      gender: row.gender,
      level: row.level,
      frequencyRank: row.frequency_rank,
      pronunciationIpa: row.pronunciation_ipa,
      exampleSentencePl: row.example_sentence_pl,
      exampleSentenceEn: row.example_sentence_en,
      exampleSentenceRu: row.example_sentence_ru,
      mnemonicEn: row.mnemonic_en,
      mnemonicRu: row.mnemonic_ru,
      imageUrl: row.image_url,
      audioUrl: row.audio_url,
      audioSlowUrl: row.audio_slow_url,
      userProgress: row.proficiency_level !== null ? {
        proficiencyLevel: row.proficiency_level,
        easinessFactor: parseFloat(row.easiness_factor),
        intervalDays: row.interval_days,
        nextReviewDate: row.next_review_date,
        timesReviewed: row.times_reviewed,
        timesCorrect: row.times_correct,
        timesIncorrect: row.times_incorrect,
        currentStreak: row.current_streak,
        status: row.status,
      } : undefined,
    };

    res.json({
      success: true,
      data: { word },
    });
  } catch (error) {
    logger.error('Error getting vocabulary', { error });
    throw error;
  }
}
