/**
 * Tests for validators
 */

import { describe, it, expect } from 'vitest';
import {
  isDefined,
  isString,
  isNumber,
  isBoolean,
  isEmail,
  isUrl,
  isUuid,
  isDateString,
  isNotEmpty,
  isLength,
  isInRange,
  isOneOf,
  validateRequired,
  validateString,
  validateEmail,
  validateNumber,
  validateEnum,
  validateArray,
  valid,
  invalid,
} from '../src/validators';

describe('Type guards', () => {
  it('checks isDefined', () => {
    expect(isDefined(1)).toBe(true);
    expect(isDefined('string')).toBe(true);
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });

  it('checks isString', () => {
    expect(isString('hello')).toBe(true);
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  it('checks isNumber', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(123.45)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber('123')).toBe(false);
  });

  it('checks isBoolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(0)).toBe(false);
  });
});

describe('Format validators', () => {
  it('validates email', () => {
    expect(isEmail('test@example.com')).toBe(true);
    expect(isEmail('user.name@domain.co')).toBe(true);
    expect(isEmail('invalid')).toBe(false);
    expect(isEmail('@example.com')).toBe(false);
  });

  it('validates URL', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('http://test.org/path')).toBe(true);
    expect(isUrl('invalid')).toBe(false);
  });

  it('validates UUID', () => {
    expect(isUuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
    expect(isUuid('invalid')).toBe(false);
  });

  it('validates date string', () => {
    expect(isDateString('2024-01-15')).toBe(true);
    expect(isDateString('2024-01-15T10:30:00Z')).toBe(true);
    expect(isDateString('invalid')).toBe(false);
  });
});

describe('String validators', () => {
  it('checks isNotEmpty', () => {
    expect(isNotEmpty('hello')).toBe(true);
    expect(isNotEmpty('')).toBe(false);
    expect(isNotEmpty('   ')).toBe(false);
  });

  it('checks isLength', () => {
    expect(isLength('hello', 3)).toBe(true);
    expect(isLength('hello', 3, 5)).toBe(true);
    expect(isLength('hello', 10)).toBe(false);
    expect(isLength('hello', 1, 3)).toBe(false);
  });
});

describe('Number validators', () => {
  it('checks isInRange', () => {
    expect(isInRange(5, 0, 10)).toBe(true);
    expect(isInRange(0, 0, 10)).toBe(true);
    expect(isInRange(10, 0, 10)).toBe(true);
    expect(isInRange(-1, 0, 10)).toBe(false);
  });
});

describe('Enum validators', () => {
  it('checks isOneOf', () => {
    expect(isOneOf('a', ['a', 'b', 'c'])).toBe(true);
    expect(isOneOf('d', ['a', 'b', 'c'])).toBe(false);
  });
});

describe('Validation functions', () => {
  it('validates required', () => {
    expect(validateRequired('value', 'field')).toEqual(valid());
    expect(validateRequired(null, 'field').valid).toBe(false);
  });

  it('validates string', () => {
    expect(validateString('hello', 'field')).toEqual(valid());
    expect(validateString(123, 'field').valid).toBe(false);
    expect(validateString('ab', 'field', { min: 3 }).valid).toBe(false);
    expect(validateString('abc', 'field', { min: 3 })).toEqual(valid());
  });

  it('validates email', () => {
    expect(validateEmail('test@example.com')).toEqual(valid());
    expect(validateEmail('invalid').valid).toBe(false);
  });

  it('validates number', () => {
    expect(validateNumber(5, 'field')).toEqual(valid());
    expect(validateNumber('5', 'field').valid).toBe(false);
    expect(validateNumber(5.5, 'field', { integer: true }).valid).toBe(false);
    expect(validateNumber(5, 'field', { min: 0, max: 10 })).toEqual(valid());
  });

  it('validates enum', () => {
    expect(validateEnum('a', ['a', 'b'], 'field')).toEqual(valid());
    expect(validateEnum('c', ['a', 'b'], 'field').valid).toBe(false);
  });

  it('validates array', () => {
    expect(validateArray([1, 2, 3], 'field')).toEqual(valid());
    expect(validateArray('not array', 'field').valid).toBe(false);
    expect(validateArray([], 'field', undefined, { min: 1 }).valid).toBe(false);
  });
});

describe('Validation result helpers', () => {
  it('creates valid result', () => {
    expect(valid()).toEqual({ valid: true });
  });

  it('creates invalid result', () => {
    expect(invalid('error message')).toEqual({
      valid: false,
      error: 'error message',
    });
  });
});
