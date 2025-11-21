import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  getLessons,
  getLessonById,
  submitLessonResult,
  getNextLesson,
} from '../controllers/lessons.controller';

const router = Router();

// Public routes (optionalAuth applied at app level shows user progress if logged in)
router.get('/', getLessons);
router.get('/next', getNextLesson);
router.get('/:id', getLessonById);

// Protected routes (require authentication)
router.post('/:id/submit', authenticateToken, submitLessonResult);

export default router;
