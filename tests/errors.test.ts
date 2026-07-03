/**
 * Tests for error classes
 */

import { describe, it, expect } from 'vitest';
import {
  AppError,
  ValidationError,
  NotFoundError,
  AlreadyExistsError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
  RateLimitError,
  DatabaseError,
  RecordNotFoundError,
  DuplicateEntryError,
} from '../src/errors';
import { ERROR_CODES } from '../src/constants';

describe('AppError', () => {
  it('creates error with default values', () => {
    const error = new AppError(ERROR_CODES.UNKNOWN);
    expect(error.code).toBe(ERROR_CODES.UNKNOWN);
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
    expect(error.timestamp).toBeInstanceOf(Date);
  });

  it('creates error with custom message', () => {
    const error = new AppError(ERROR_CODES.NOT_FOUND, 'User not found');
    expect(error.message).toBe('User not found');
  });

  it('creates error with details', () => {
    const error = new AppError(ERROR_CODES.VALIDATION_FAILED, 'Invalid input', 400, {
      field: 'email',
    });
    expect(error.details).toEqual({ field: 'email' });
    expect(error.statusCode).toBe(400);
  });

  it('converts to JSON', () => {
    const error = new AppError(ERROR_CODES.NOT_FOUND, 'Not found', 404);
    const json = error.toJSON();
    expect(json.code).toBe(ERROR_CODES.NOT_FOUND);
    expect(json.message).toBe('Not found');
    expect(json.statusCode).toBe(404);
  });

  it('creates from unknown error', () => {
    const error = AppError.fromUnknown(new Error('Test error'));
    expect(error.message).toBe('Test error');
    expect(error.cause).toBeInstanceOf(Error);
  });
});

describe('ValidationError', () => {
  it('creates validation error with single field', () => {
    const error = ValidationError.required('email');
    expect(error.validationErrors).toHaveLength(1);
    expect(error.validationErrors[0]?.field).toBe('email');
    expect(error.validationErrors[0]?.constraint).toBe('required');
  });

  it('creates validation error with multiple fields', () => {
    const error = new ValidationError([
      { field: 'email', message: 'Invalid email' },
      { field: 'password', message: 'Too short' },
    ]);
    expect(error.validationErrors).toHaveLength(2);
  });

  it('creates invalid format error', () => {
    const error = ValidationError.invalidFormat('phone', 'E.164');
    expect(error.validationErrors[0]?.constraint).toBe('format');
  });

  it('creates out of range error', () => {
    const error = ValidationError.outOfRange('age', 0, 120, 150);
    expect(error.validationErrors[0]?.value).toBe(150);
  });
});

describe('HTTP Errors', () => {
  it('creates NotFoundError', () => {
    const error = new NotFoundError('User', '123');
    expect(error.code).toBe(ERROR_CODES.NOT_FOUND);
    expect(error.message).toContain('User');
    expect(error.message).toContain('123');
    expect(error.statusCode).toBe(404);
  });

  it('creates AlreadyExistsError', () => {
    const error = new AlreadyExistsError('User', 'john@example.com');
    expect(error.code).toBe(ERROR_CODES.ALREADY_EXISTS);
    expect(error.statusCode).toBe(409);
  });

  it('creates UnauthorizedError', () => {
    const error = new UnauthorizedError();
    expect(error.code).toBe(ERROR_CODES.UNAUTHORIZED);
    expect(error.statusCode).toBe(401);
  });

  it('creates ForbiddenError', () => {
    const error = new ForbiddenError('Access denied', 'admin-panel');
    expect(error.code).toBe(ERROR_CODES.FORBIDDEN);
    expect(error.statusCode).toBe(403);
  });

  it('creates BadRequestError', () => {
    const error = new BadRequestError('Invalid input');
    expect(error.code).toBe(ERROR_CODES.INVALID_INPUT);
    expect(error.statusCode).toBe(400);
  });

  it('creates RateLimitError with retry after', () => {
    const error = new RateLimitError(60);
    expect(error.code).toBe(ERROR_CODES.RATE_LIMITED);
    expect(error.details?.retryAfter).toBe(60);
  });
});

describe('Database Errors', () => {
  it('creates DatabaseError', () => {
    const error = new DatabaseError('Query failed');
    expect(error.code).toBe(ERROR_CODES.DATABASE_ERROR);
    expect(error.statusCode).toBe(500);
  });

  it('creates RecordNotFoundError', () => {
    const error = new RecordNotFoundError('users', '123');
    expect(error.code).toBe(ERROR_CODES.RECORD_NOT_FOUND);
    expect(error.details?.table).toBe('users');
  });

  it('creates DuplicateEntryError', () => {
    const error = new DuplicateEntryError('users', 'email', 'test@example.com');
    expect(error.code).toBe(ERROR_CODES.DUPLICATE_ENTRY);
    expect(error.details?.field).toBe('email');
  });
});
