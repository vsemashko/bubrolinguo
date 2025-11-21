import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import { logger } from '../utils/logger';

interface JwtPayload {
  userId: string;
  email: string;
}

/**
 * Authentication middleware
 * Verifies JWT token and attaches userId to request
 */
export function authenticateToken(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new AppError('No authentication token provided', 401, 'UNAUTHORIZED');
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      logger.error('JWT_SECRET is not configured');
      throw new AppError('Server configuration error', 500, 'SERVER_ERROR');
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Attach user info to request
    (req as any).userId = decoded.userId;
    (req as any).userEmail = decoded.email;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      logger.warn('Invalid JWT token', { error: error.message });
      throw new AppError('Invalid authentication token', 401, 'INVALID_TOKEN');
    } else if (error instanceof jwt.TokenExpiredError) {
      logger.warn('Expired JWT token', { error: error.message });
      throw new AppError('Authentication token expired', 401, 'TOKEN_EXPIRED');
    } else {
      throw error;
    }
  }
}

/**
 * Optional authentication middleware
 * Attaches userId if token is present, but doesn't throw if missing
 */
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return next();
    }

    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    (req as any).userId = decoded.userId;
    (req as any).userEmail = decoded.email;

    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just skip
    next();
  }
}
