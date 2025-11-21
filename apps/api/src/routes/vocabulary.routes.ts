import { Router } from 'express';
import {
  getReviewQueue,
  submitReviewResults,
  getVocabularyStats,
  getVocabularyById,
} from '../controllers/vocabulary.controller';

const router = Router();

/**
 * GET /api/v1/vocabulary/review
 * Get words due for review (spaced repetition)
 */
router.get('/review', getReviewQueue);

/**
 * POST /api/v1/vocabulary/review/submit
 * Submit vocabulary review results (batch)
 */
router.post('/review/submit', submitReviewResults);

/**
 * GET /api/v1/vocabulary/stats
 * Get vocabulary statistics
 */
router.get('/stats', getVocabularyStats);

/**
 * GET /api/v1/vocabulary/:id
 * Get word details
 */
router.get('/:id', getVocabularyById);

export default router;
