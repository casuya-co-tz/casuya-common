/**
 * File-related errors
 */

import { ERROR_CODES, HTTP_STATUS } from '../constants';
import { AppError } from './base';

/**
 * File too large
 */
export class FileTooLargeError extends AppError {
  constructor(maxSize: number | string, actualSize?: number | string) {
    const message = actualSize
      ? `File size ${actualSize} exceeds maximum ${maxSize}`
      : `File exceeds maximum size of ${maxSize}`;
    super(
      ERROR_CODES.FILE_TOO_LARGE,
      message,
      HTTP_STATUS.BAD_REQUEST,
      { maxSize, actualSize }
    );
  }
}

/**
 * Invalid file type
 */
export class InvalidFileTypeError extends AppError {
  constructor(
    allowedTypes: string[],
    actualType?: string,
    filename?: string
  ) {
    const message = filename
      ? `Invalid file type for '${filename}'`
      : 'Invalid file type';
    super(
      ERROR_CODES.INVALID_FILE_TYPE,
      message,
      HTTP_STATUS.BAD_REQUEST,
      { allowedTypes, actualType, filename }
    );
  }
}

/**
 * File not found
 */
export class FileNotFoundError extends AppError {
  constructor(filename?: string, path?: string) {
    const message = filename
      ? `File '${filename}' not found`
      : 'File not found';
    super(
      ERROR_CODES.FILE_NOT_FOUND,
      message,
      HTTP_STATUS.NOT_FOUND,
      { filename, path }
    );
  }
}
