/**
 * Database errors
 * Errors related to database operations
 */

import { ERROR_CODES, HTTP_STATUS } from '../constants';
import { AppError } from './base';

/**
 * General database error
 */
export class DatabaseError extends AppError {
  constructor(message?: string, cause?: Error) {
    super(
      ERROR_CODES.DATABASE_ERROR,
      message || 'Database operation failed',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      undefined,
      cause
    );
  }
}

/**
 * Record not found in database
 */
export class RecordNotFoundError extends AppError {
  constructor(table?: string, identifier?: string | number) {
    const message = table
      ? `Record${identifier ? ` with id '${identifier}'` : ''} not found in ${table}`
      : 'Record not found';
    super(ERROR_CODES.RECORD_NOT_FOUND, message, HTTP_STATUS.NOT_FOUND, { table, identifier });
  }
}

/**
 * Duplicate entry in database
 */
export class DuplicateEntryError extends AppError {
  constructor(table?: string, field?: string, value?: unknown) {
    const message = table
      ? `Duplicate entry${field ? ` for ${field}` : ''} in ${table}`
      : 'Duplicate entry detected';
    const details: Record<string, unknown> = {};
    if (table !== undefined) details.table = table;
    if (field !== undefined) details.field = field;
    if (value !== undefined) details.value = value;
    super(ERROR_CODES.DUPLICATE_ENTRY, message, HTTP_STATUS.CONFLICT, details);
  }
}

/**
 * Foreign key constraint violation
 */
export class ForeignKeyViolationError extends AppError {
  constructor(
    table?: string,
    field?: string,
    referencedTable?: string,
    referencedId?: string | number
  ) {
    const message = table
      ? `Referenced ${referencedTable || 'record'}${referencedId ? ` with id '${referencedId}'` : ''} not found for ${field || 'field'} in ${table}`
      : 'Referenced record not found';
    const details: Record<string, unknown> = {};
    if (table !== undefined) details.table = table;
    if (field !== undefined) details.field = field;
    if (referencedTable !== undefined) details.referencedTable = referencedTable;
    if (referencedId !== undefined) details.referencedId = referencedId;
    super(
      ERROR_CODES.FOREIGN_KEY_VIOLATION,
      message,
      HTTP_STATUS.BAD_REQUEST,
      details
    );
  }
}
