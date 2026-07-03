/**
 * Input validators
 * Reusable validation functions
 */

import { PATTERNS } from '../constants';

/**
 * Validation result type
 */
export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string };

/**
 * Create a valid result
 */
export function valid(): ValidationResult {
  return { valid: true };
}

/**
 * Create an invalid result
 */
export function invalid(error: string): ValidationResult {
  return { valid: false, error };
}

/**
 * Check if value is defined (not null or undefined)
 */
export function isDefined(value: unknown): value is NonNullable<unknown> {
  return value !== null && value !== undefined;
}

/**
 * Check if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Check if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Check if value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Check if value is a function
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * Check if value is a Date
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Check if value is an email
 */
export function isEmail(value: string): boolean {
  return PATTERNS.EMAIL.test(value);
}

/**
 * Check if value is a URL
 */
export function isUrl(value: string): boolean {
  return PATTERNS.URL.test(value);
}

/**
 * Check if value is a UUID
 */
export function isUuid(value: string): boolean {
  return PATTERNS.UUID.test(value);
}

/**
 * Check if value is a ULID
 */
export function isUlid(value: string): boolean {
  return PATTERNS.ULID.test(value);
}

/**
 * Check if value is a phone number
 */
export function isPhone(value: string): boolean {
  return PATTERNS.PHONE_INTERNATIONAL.test(value) || PATTERNS.PHONE_SIMPLE.test(value);
}

/**
 * Check if value is a slug
 */
export function isSlug(value: string): boolean {
  return PATTERNS.SLUG.test(value);
}

/**
 * Check if value is a valid date string (ISO format)
 */
export function isDateString(value: string): boolean {
  return PATTERNS.ISO_DATE.test(value) || PATTERNS.ISO_DATETIME.test(value);
}

/**
 * Check if value is a hex color
 */
export function isHexColor(value: string): boolean {
  return PATTERNS.HEX_COLOR.test(value);
}

/**
 * Check if value is a semantic version
 */
export function isSemVer(value: string): boolean {
  return PATTERNS.SEMANTIC_VERSION.test(value);
}

/**
 * Check if string is not empty
 */
export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Check if string length is within range
 */
export function isLength(value: string, min: number, max?: number): boolean {
  const len = value.length;
  if (max === undefined) return len >= min;
  return len >= min && len <= max;
}

/**
 * Check if number is within range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Check if string matches a pattern
 */
export function matches(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

/**
 * Check if value is one of allowed values
 */
export function isOneOf<T extends string | number>(
  value: unknown,
  allowed: readonly T[]
): value is T {
  return (allowed as readonly unknown[]).includes(value);
}

/**
 * Validate required field
 */
export function validateRequired(value: unknown, fieldName: string): ValidationResult {
  if (!isDefined(value)) {
    return invalid(`${fieldName} is required`);
  }
  return valid();
}

/**
 * Validate string field
 */
export function validateString(
  value: unknown,
  fieldName: string,
  options?: { min?: number; max?: number; pattern?: RegExp }
): ValidationResult {
  if (!isString(value)) {
    return invalid(`${fieldName} must be a string`);
  }
  if (options?.min !== undefined && value.length < options.min) {
    return invalid(`${fieldName} must be at least ${options.min} characters`);
  }
  if (options?.max !== undefined && value.length > options.max) {
    return invalid(`${fieldName} must be at most ${options.max} characters`);
  }
  if (options?.pattern && !options.pattern.test(value)) {
    return invalid(`${fieldName} has invalid format`);
  }
  return valid();
}

/**
 * Validate email field
 */
export function validateEmail(value: string, fieldName = 'email'): ValidationResult {
  if (!isEmail(value)) {
    return invalid(`${fieldName} must be a valid email address`);
  }
  return valid();
}

/**
 * Validate URL field
 */
export function validateUrl(value: string, fieldName = 'url'): ValidationResult {
  if (!isUrl(value)) {
    return invalid(`${fieldName} must be a valid URL`);
  }
  return valid();
}

/**
 * Validate UUID field
 */
export function validateUuid(value: string, fieldName = 'id'): ValidationResult {
  if (!isUuid(value)) {
    return invalid(`${fieldName} must be a valid UUID`);
  }
  return valid();
}

/**
 * Validate number field
 */
export function validateNumber(
  value: unknown,
  fieldName: string,
  options?: { min?: number; max?: number; integer?: boolean }
): ValidationResult {
  if (!isNumber(value)) {
    return invalid(`${fieldName} must be a number`);
  }
  if (options?.integer && !Number.isInteger(value)) {
    return invalid(`${fieldName} must be an integer`);
  }
  if (options?.min !== undefined && value < options.min) {
    return invalid(`${fieldName} must be at least ${options.min}`);
  }
  if (options?.max !== undefined && value > options.max) {
    return invalid(`${fieldName} must be at most ${options.max}`);
  }
  return valid();
}

/**
 * Validate enum field
 */
export function validateEnum<T extends string | number>(
  value: unknown,
  allowed: readonly T[],
  fieldName: string
): ValidationResult {
  if (!isOneOf(value, allowed)) {
    return invalid(`${fieldName} must be one of: ${allowed.join(', ')}`);
  }
  return valid();
}

/**
 * Validate date field
 */
export function validateDate(
  value: unknown,
  fieldName: string,
  options?: { min?: Date; max?: Date }
): ValidationResult {
  let date: Date;

  if (isString(value)) {
    if (!isDateString(value)) {
      return invalid(`${fieldName} must be a valid date string`);
    }
    date = new Date(value);
  } else if (isDate(value)) {
    date = value;
  } else {
    return invalid(`${fieldName} must be a valid date`);
  }

  if (options?.min && date < options.min) {
    return invalid(`${fieldName} must be after ${options.min.toISOString()}`);
  }
  if (options?.max && date > options.max) {
    return invalid(`${fieldName} must be before ${options.max.toISOString()}`);
  }

  return valid();
}

/**
 * Validate array field
 */
export function validateArray(
  value: unknown,
  fieldName: string,
  itemValidator?: (item: unknown, index: number) => ValidationResult,
  options?: { min?: number; max?: number }
): ValidationResult {
  if (!Array.isArray(value)) {
    return invalid(`${fieldName} must be an array`);
  }
  if (options?.min !== undefined && value.length < options.min) {
    return invalid(`${fieldName} must have at least ${options.min} items`);
  }
  if (options?.max !== undefined && value.length > options.max) {
    return invalid(`${fieldName} must have at most ${options.max} items`);
  }
  if (itemValidator) {
    for (let i = 0; i < value.length; i++) {
      const result = itemValidator(value[i], i);
      if (!result.valid) {
        return invalid(`${fieldName}[${i}]: ${result.error}`);
      }
    }
  }
  return valid();
}

/**
 * Run multiple validators and return all errors
 */
export function validateAll(
  ...validators: (() => ValidationResult)[]
): ValidationResult {
  const errors: string[] = [];

  for (const validator of validators) {
    const result = validator();
    if (!result.valid) {
      errors.push(result.error);
    }
  }

  return errors.length === 0 ? valid() : invalid(errors.join('; '));
}

/**
 * Create a validator function from a predicate
 */
export function createValidator(
  predicate: (value: unknown) => boolean,
  errorMessage: string
): (value: unknown) => ValidationResult {
  return (value: unknown) => (predicate(value) ? valid() : invalid(errorMessage));
}
