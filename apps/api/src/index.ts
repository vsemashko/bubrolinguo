import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { authenticateToken, optionalAuth } from './middleware/auth.middleware';
import { apiLimiter, authLimiter } from './middleware/rateLimiter';
import { testConnection, closePool } from './db/connection';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import lessonsRoutes from './routes/lessons.routes';
import vocabularyRoutes from './routes/vocabulary.routes';
import progressRoutes from './routes/progress.routes';
import examsRoutes from './routes/exams.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiting to all routes
app.use(apiLimiter);

// Request logging
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  });
});

// API Routes
app.use('/api/v1/auth', authLimiter, authRoutes); // Auth routes with strict rate limiting
app.use('/api/v1/users', authenticateToken, usersRoutes); // Protected routes
app.use('/api/v1/lessons', optionalAuth, lessonsRoutes); // Optional auth (shows user progress if logged in)
app.use('/api/v1/vocabulary', authenticateToken, vocabularyRoutes); // Protected routes
app.use('/api/v1/progress', authenticateToken, progressRoutes); // Protected routes
app.use('/api/v1/exams', authenticateToken, examsRoutes); // Protected exam routes

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found',
    },
  });
});

// Error handler
app.use(errorHandler);

// Start server
async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      logger.error('Failed to connect to database. Server will start but database operations will fail.');
      logger.error('Please check your database configuration in .env');
    }

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🦫 Bubrolinguo API server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      if (dbConnected) {
        logger.info('✓ Database connection established');
      }
    });
  } catch (error) {
    logger.error('Failed to start server', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  await closePool();
  process.exit(0);
});

startServer();

export default app;
