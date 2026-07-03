/**
 * Error codes and messages
 * Standardized error identifiers used across the ecosystem
 */

export const ERROR_CODES = {
  // General errors
  UNKNOWN: 'UNKNOWN_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',

  // Validation errors
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_PHONE: 'INVALID_PHONE',
  INVALID_URL: 'INVALID_URL',
  INVALID_DATE: 'INVALID_DATE',
  INVALID_UUID: 'INVALID_UUID',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  OUT_OF_RANGE: 'OUT_OF_RANGE',
  INVALID_FORMAT: 'INVALID_FORMAT',

  // Database errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  RECORD_NOT_FOUND: 'RECORD_NOT_FOUND',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  FOREIGN_KEY_VIOLATION: 'FOREIGN_KEY_VIOLATION',

  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  CONNECTION_FAILED: 'CONNECTION_FAILED',
  RATE_LIMITED: 'RATE_LIMITED',

  // File errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',

  // Business constraint errors
  OPERATION_FAILED: 'OPERATION_FAILED',
  PRECONDITION_FAILED: 'PRECONDITION_FAILED',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.UNKNOWN]: 'An unexpected error occurred',
  [ERROR_CODES.INVALID_INPUT]: 'Invalid input provided',
  [ERROR_CODES.NOT_FOUND]: 'Resource not found',
  [ERROR_CODES.ALREADY_EXISTS]: 'Resource already exists',
  [ERROR_CODES.UNAUTHORIZED]: 'Authentication required',
  [ERROR_CODES.FORBIDDEN]: 'Access denied',
  [ERROR_CODES.CONFLICT]: 'Resource conflict',
  [ERROR_CODES.VALIDATION_FAILED]: 'Validation failed',
  [ERROR_CODES.INVALID_EMAIL]: 'Invalid email format',
  [ERROR_CODES.INVALID_PASSWORD]: 'Invalid password format',
  [ERROR_CODES.INVALID_PHONE]: 'Invalid phone number format',
  [ERROR_CODES.INVALID_URL]: 'Invalid URL format',
  [ERROR_CODES.INVALID_DATE]: 'Invalid date format',
  [ERROR_CODES.INVALID_UUID]: 'Invalid UUID format',
  [ERROR_CODES.REQUIRED_FIELD]: 'This field is required',
  [ERROR_CODES.OUT_OF_RANGE]: 'Value is out of allowed range',
  [ERROR_CODES.INVALID_FORMAT]: 'Invalid format',
  [ERROR_CODES.DATABASE_ERROR]: 'Database operation failed',
  [ERROR_CODES.RECORD_NOT_FOUND]: 'Record not found',
  [ERROR_CODES.DUPLICATE_ENTRY]: 'Duplicate entry detected',
  [ERROR_CODES.FOREIGN_KEY_VIOLATION]: 'Referenced record not found',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error occurred',
  [ERROR_CODES.TIMEOUT]: 'Operation timed out',
  [ERROR_CODES.CONNECTION_FAILED]: 'Connection failed',
  [ERROR_CODES.RATE_LIMITED]: 'Rate limit exceeded',
  [ERROR_CODES.FILE_TOO_LARGE]: 'File too large',
  [ERROR_CODES.INVALID_FILE_TYPE]: 'Invalid file type',
  [ERROR_CODES.FILE_NOT_FOUND]: 'File not found',
  [ERROR_CODES.OPERATION_FAILED]: 'Operation failed',
  [ERROR_CODES.PRECONDITION_FAILED]: 'Precondition failed',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service unavailable',
};

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
