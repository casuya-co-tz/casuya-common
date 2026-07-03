/**
 * Base application error
 * All custom errors extend this class for consistent error handling
 */

import { ERROR_CODES, ERROR_MESSAGES, type ErrorCode, HTTP_STATUS } from '../constants';

export interface ErrorDetails {
  field?: string;
  value?: unknown;
  constraint?: string;
  [key: string]: unknown;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details: ErrorDetails | undefined;
  public readonly isOperational: boolean;
  public readonly timestamp: Date;
  public readonly cause: Error | undefined;

  constructor(
    code: ErrorCode = ERROR_CODES.UNKNOWN,
    message?: string,
    statusCode?: number,
    details?: ErrorDetails,
    cause?: Error
  ) {
    super(message || ERROR_MESSAGES[code] || 'An error occurred');
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
    this.details = details ?? undefined;
    this.isOperational = true;
    this.timestamp = new Date();
    this.cause = cause ?? undefined;

    Error.captureStackTrace?.(this, this.constructor);
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
    };
  }

  withDetails(details: ErrorDetails): this {
    Object.assign(this, { details: { ...this.details, ...details } });
    return this;
  }

  static fromUnknown(error: unknown): AppError {
    if (error instanceof AppError) return error;
    if (error instanceof Error) {
      return new AppError(ERROR_CODES.UNKNOWN, error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR, undefined, error);
    }
    return new AppError(ERROR_CODES.UNKNOWN, String(error));
  }
}
