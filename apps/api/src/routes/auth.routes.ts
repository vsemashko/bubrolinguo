import { Router } from 'express';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).max(50),
  interfaceLanguage: z.enum(['ru', 'en']).default('en'),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

/**
 * POST /api/v1/auth/register
 * Register a new user
 */
router.post('/register', async (req, res, next) => {
  try {
    // Validate request body
    const data = registerSchema.parse(req.body);
    req.body = data; // Replace with validated data
    await authController.register(req, res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid request data', 400, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
});

/**
 * POST /api/v1/auth/login
 * Login user
 */
router.post('/login', async (req, res, next) => {
  try {
    // Validate request body
    const data = loginSchema.parse(req.body);
    req.body = data; // Replace with validated data
    await authController.login(req, res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid request data', 400, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
});

/**
 * POST /api/v1/auth/refresh
 * Refresh access token
 */
router.post('/refresh', async (req, res, next) => {
  try {
    // Validate request body
    const data = refreshSchema.parse(req.body);
    req.body = data;
    await authController.refreshToken(req, res);
  } catch (error) {
    if (error instanceof z.ZodError) {
      next(new AppError('Invalid request data', 400, 'VALIDATION_ERROR'));
    } else {
      next(error);
    }
  }
});

/**
 * POST /api/v1/auth/logout
 * Logout user
 */
router.post('/logout', async (req, res, next) => {
  try {
    await authController.logout(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
