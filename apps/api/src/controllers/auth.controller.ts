import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { query } from '../db/connection';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const JWT_REFRESH_EXPIRES_IN: string = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

interface UserData {
  email: string;
  password: string;
  displayName: string;
  interfaceLanguage: 'en' | 'ru';
}

interface LoginData {
  email: string;
  password: string;
}

/**
 * Generate JWT token for user
 */
function generateToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions);
}

/**
 * Generate refresh token for user
 */
function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN } as SignOptions);
}

/**
 * Register a new user
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, displayName, interfaceLanguage }: UserData = req.body;

    logger.info('Registration attempt', { email });

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new AppError('Email already registered', 400, 'EMAIL_EXISTS');
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await query(
      `INSERT INTO users (
        email, password_hash, display_name, interface_language,
        current_level, total_xp, streak_count, daily_goal
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, email, display_name, interface_language, current_level, total_xp, streak_count`,
      [email, passwordHash, displayName, interfaceLanguage, 'A1', 0, 0, 50]
    );

    const user = result.rows[0];

    // Generate tokens
    const token = generateToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token in database
    await query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '30 days')`,
      [user.id, refreshToken]
    );

    logger.info('User registered successfully', { userId: user.id, email: user.email });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          displayName: user.display_name,
          interfaceLanguage: user.interface_language,
          currentLevel: user.current_level,
          totalXp: user.total_xp,
          streakCount: user.streak_count,
        },
        token,
        refreshToken,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Registration failed', { error });
    throw error;
  }
}

/**
 * Login user
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: LoginData = req.body;

    logger.info('Login attempt', { email });

    // Find user by email
    const result = await query(
      `SELECT id, email, password_hash, display_name, interface_language,
              current_level, total_xp, streak_count, last_activity_date
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    // Update last login
    await query(
      'UPDATE users SET last_login_at = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate tokens
    const token = generateToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);

    // Store refresh token
    await query(
      `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '30 days')`,
      [user.id, refreshToken]
    );

    logger.info('User logged in successfully', { userId: user.id, email: user.email });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          displayName: user.display_name,
          interfaceLanguage: user.interface_language,
          currentLevel: user.current_level,
          totalXp: user.total_xp,
          streakCount: user.streak_count,
          lastActivityDate: user.last_activity_date,
        },
        token,
        refreshToken,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Login failed', { error });
    throw error;
  }
}

/**
 * Refresh access token
 */
export async function refreshToken(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token is required', 400, 'MISSING_TOKEN');
    }

    // Verify refresh token
    try {
      jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      throw new AppError('Invalid refresh token', 401, 'INVALID_TOKEN');
    }

    // Check if refresh token exists in database and is not expired
    const result = await query(
      `SELECT user_id FROM refresh_tokens
       WHERE token = $1 AND expires_at > NOW()`,
      [refreshToken]
    );

    if (result.rows.length === 0) {
      throw new AppError('Refresh token expired or invalid', 401, 'INVALID_TOKEN');
    }

    const userId = result.rows[0].user_id;

    // Get user email for new token
    const userResult = await query(
      'SELECT email FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const email = userResult.rows[0].email;

    // Generate new access token
    const newToken = generateToken(userId, email);

    logger.info('Token refreshed successfully', { userId });

    res.json({
      success: true,
      data: {
        token: newToken,
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Token refresh failed', { error });
    throw error;
  }
}

/**
 * Logout user (invalidate refresh token)
 */
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Delete refresh token from database
      await query(
        'DELETE FROM refresh_tokens WHERE token = $1',
        [refreshToken]
      );

      logger.info('User logged out successfully');
    }

    res.json({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Logout failed', { error });
    throw error;
  }
}
