/**
 * Tests for schema utilities
 */

import { describe, it, expect } from 'vitest';
import {
  ok,
  err,
  some,
  none,
  isOk,
  isErr,
  isSome,
  isNone,
  mapResult,
  andThen,
  unwrapOr,
  apiSuccess,
  apiError,
  paginated,
  hasProperty,
  isArrayOf,
} from '../src/schemas';

describe('Result type', () => {
  it('creates ok result', () => {
    const result = ok(42);
    expect(result).toEqual({ ok: true, value: 42 });
  });

  it('creates err result', () => {
    const result = err(new Error('failed'));
    expect(result.ok).toBe(false);
  });

  it('checks isOk', () => {
    expect(isOk(ok(42))).toBe(true);
    expect(isOk(err(new Error()))).toBe(false);
  });

  it('checks isErr', () => {
    expect(isErr(err(new Error()))).toBe(true);
    expect(isErr(ok(42))).toBe(false);
  });

  it('maps over result', () => {
    const result = ok(42);
    const mapped = mapResult(result, (x) => x * 2);
    expect(mapped).toEqual({ ok: true, value: 84 });
  });

  it('chains results', () => {
    const result = ok(42);
    const chained = andThen(result, (x) => (x > 50 ? ok(x) : err(new Error('too small'))));
    expect(chained.ok).toBe(false);
  });

  it('unwraps with default', () => {
    expect(unwrapOr(ok(42), 0)).toBe(42);
    expect(unwrapOr(err(new Error()), 0)).toBe(0);
  });
});

describe('Option type', () => {
  it('creates some', () => {
    expect(some(42)).toEqual({ isSome: true, value: 42 });
  });

  it('creates none', () => {
    expect(none()).toEqual({ isSome: false });
  });

  it('checks isSome', () => {
    expect(isSome(some(42))).toBe(true);
    expect(isSome(none())).toBe(false);
  });

  it('checks isNone', () => {
    expect(isNone(none())).toBe(true);
    expect(isNone(some(42))).toBe(false);
  });
});

describe('API response helpers', () => {
  it('creates success response', () => {
    const response = apiSuccess({ id: 1, name: 'test' });
    expect(response).toEqual({
      success: true,
      data: { id: 1, name: 'test' },
    });
  });

  it('creates error response', () => {
    const response = apiError('VALIDATION_ERROR', 'Invalid input', { field: 'email' });
    expect(response).toEqual({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid input',
        details: { field: 'email' },
      },
    });
  });

  it('creates paginated result', () => {
    const result = paginated(
      [{ id: 1 }, { id: 2 }],
      { page: 1, pageSize: 10 },
      25
    );
    expect(result.data).toHaveLength(2);
    expect(result.pagination.totalItems).toBe(25);
    expect(result.pagination.totalPages).toBe(3);
    expect(result.pagination.hasNext).toBe(true);
  });
});

describe('Type guards', () => {
  it('checks hasProperty', () => {
    expect(hasProperty({ name: 'test' }, 'name')).toBe(true);
    expect(hasProperty({ name: 'test' }, 'age')).toBe(false);
  });

  it('checks isArrayOf', () => {
    const isStringArray = isArrayOf(
      ['a', 'b', 'c'],
      (v): v is string => typeof v === 'string'
    );
    expect(isStringArray).toBe(true);
  });
});
