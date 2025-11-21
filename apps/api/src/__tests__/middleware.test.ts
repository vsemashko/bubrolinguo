// Example tests for middleware - demonstrates 85% coverage target
import { Request, Response, NextFunction } from 'express';
import { errorHandler, AppError } from '../middleware/errorHandler';

// Mock logger to avoid console output during tests
jest.mock('../utils/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('Error Handler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  test('should handle AppError with custom status code', () => {
    const error = new AppError('Test error', 400, 'TEST_ERROR');

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.objectContaining({
          code: 'TEST_ERROR',
          message: 'Test error',
        }),
      })
    );
  });

  test('should default to 500 status code for generic errors', () => {
    const error = new Error('Generic error');

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.objectContaining({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Generic error',
        }),
      })
    );
  });

  test('should include request ID in meta when available', () => {
    mockRequest.headers = {
      'x-request-id': 'test-request-id-123',
    };

    const error = new AppError('Test error', 400);

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          request_id: 'test-request-id-123',
        }),
      })
    );
  });

  test('should handle error without message', () => {
    const error = new Error();

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.objectContaining({
          message: 'An unexpected error occurred',
        }),
      })
    );
  });
});

describe('AppError Class', () => {
  test('should create error with all parameters', () => {
    const error = new AppError('Custom error', 404, 'NOT_FOUND');

    expect(error.message).toBe('Custom error');
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.name).toBe('AppError');
  });

  test('should use default values when not provided', () => {
    const error = new AppError('Simple error');

    expect(error.message).toBe('Simple error');
    expect(error.statusCode).toBe(500);
    expect(error.code).toBe('APP_ERROR');
  });

  test('should capture stack trace', () => {
    const error = new AppError('Test error');

    expect(error.stack).toBeDefined();
    expect(error.stack).toContain('AppError');
  });
});
