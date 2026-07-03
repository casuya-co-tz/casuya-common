/**
 * Errors module entry point
 */

export { AppError, type ErrorDetails } from './base';
export { ValidationError, type ValidationErrorItem } from './validation';
export {
  NotFoundError,
  AlreadyExistsError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
  RateLimitError,
  TimeoutError,
  ConnectionError,
  ServiceUnavailableError,
} from './http';
export {
  DatabaseError,
  RecordNotFoundError,
  DuplicateEntryError,
  ForeignKeyViolationError,
} from './database';
export {
  FileTooLargeError,
  InvalidFileTypeError,
  FileNotFoundError,
} from './file';
