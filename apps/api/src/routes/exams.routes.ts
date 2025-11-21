import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import * as examsController from '../controllers/exams.controller';

const router = Router();

// All exam routes require authentication
router.use(authenticateToken);

/**
 * @route   GET /api/v1/exams
 * @desc    Get all available mock exams
 * @access  Private
 * @query   level (optional): A1, A2, B1, B2, C1, C2
 * @query   exam_type (optional): full, practice
 */
router.get('/', examsController.getMockExams);

/**
 * @route   GET /api/v1/exams/:id
 * @desc    Get exam by ID with all sections and questions
 * @access  Private
 */
router.get('/:id', examsController.getExamById);

/**
 * @route   POST /api/v1/exams/:id/start
 * @desc    Start a new exam attempt
 * @access  Private
 */
router.post('/:id/start', examsController.startExamAttempt);

/**
 * @route   POST /api/v1/exams/attempts/:attemptId/sections/:sectionId/submit
 * @desc    Submit answers for a section
 * @access  Private
 * @body    answers: Array of {question_id, answer_data, time_spent_seconds}
 */
router.post('/attempts/:attemptId/sections/:sectionId/submit', examsController.submitSectionAnswers);

/**
 * @route   POST /api/v1/exams/attempts/:attemptId/complete
 * @desc    Complete exam attempt and calculate final scores
 * @access  Private
 */
router.post('/attempts/:attemptId/complete', examsController.completeExamAttempt);

/**
 * @route   GET /api/v1/exams/attempts/:attemptId/results
 * @desc    Get detailed exam results
 * @access  Private
 */
router.get('/attempts/:attemptId/results', examsController.getExamResults);

/**
 * @route   GET /api/v1/exams/study-resources
 * @desc    Get study resources for exam preparation
 * @access  Private
 * @query   level (optional)
 * @query   section_type (optional): reading, listening, writing, speaking, general
 * @query   resource_type (optional): strategy, tip, common_mistake, time_management
 */
router.get('/study-resources', examsController.getStudyResources);

export default router;
