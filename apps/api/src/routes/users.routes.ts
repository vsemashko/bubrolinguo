import { Router } from 'express';
import {
  getCurrentUser,
  updateUserProfile,
  updateUserSettings,
  getUserStats,
} from '../controllers/users.controller';

const router = Router();

// All routes require authentication (middleware should be added in main app)
router.get('/me', getCurrentUser);
router.put('/me', updateUserProfile);
router.put('/me/settings', updateUserSettings);
router.get('/me/stats', getUserStats);

export default router;
