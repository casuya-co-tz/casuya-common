/**
 * Validation error
 * Used for input validation failures with detailed field information
 */

import { ERROR_CODES, HTTP_STATUS } from '../constants';
import { AppError } from './base';

export interface ValidationErrorItem {
  field: string;
  message: string;
  value: unknown | undefined;
  constraint: string | undefined;
}

export class ValidationError extends AppError {
  public readonly validationErrors: ValidationErrorItem[];

  constructor(
    errors: ValidationErrorItem[] | ValidationErrorItem,
    message?: string
  ) {
    const errorArray = Array.isArray(errors) ? errors : [errors];
    super(
      ERROR_CODES.VALIDATION_FAILED,
      message || 'Validation failed',
      HTTP_STATUS.BAD_REQUEST,
      { validationErrors: errorArray }
    );
    this.validationErrors = errorArray;
  }

  static field(
    field: string,
    message: string,
    value?: unknown,
    constraint?: string
  ): ValidationError {
    return new ValidationError({ field, message, value: value ?? undefined, constraint: constraint ?? undefined });
  }

  static required(field: string): ValidationError {
    return ValidationError.field(field, 'This field is required', undefined, 'required');
  }

  static invalidFormat(field: string, expected: string, value?: unknown): ValidationError {
    return ValidationError.field(field, `Invalid format, expected ${expected}`, value, 'format');
  }

  static outOfRange(
    field: string,
    min: number | string,
    max: number | string,
    value?: unknown
  ): ValidationError {
    return ValidationError.field(
      field,
      `Value must be between ${min} and ${max}`,
      value,
      'range'
    );
  }

  static tooShort(field: string, minLength: number, value?: unknown): ValidationError {
    return ValidationError.field(
      field,
      `Must be at least ${minLength} characters`,
      value,
      'minLength'
    );
  }

  static tooLong(field: string, maxLength: number, value?: unknown): ValidationError {
    return ValidationError.field(
      field,
      `Must be at most ${maxLength} characters`,
      value,
      'maxLength'
    );
  }
}
