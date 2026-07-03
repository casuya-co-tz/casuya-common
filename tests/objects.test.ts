/**
 * Tests for object utilities
 */

import { describe, it, expect } from 'vitest';
import {
  isObject,
  isPlainObject,
  isEmpty,
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  has,
  flatten,
  unflatten,
  mapValues,
  filter,
  compact,
  toSnakeCaseKeys,
  toCamelCaseKeys,
} from '../src/objects';

describe('Object validation', () => {
  it('checks isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(null)).toBe(false);
    expect(isObject([])).toBe(false);
    expect(isObject('string')).toBe(false);
  });

  it('checks isPlainObject', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject(new Date())).toBe(false);
  });

  it('checks isEmpty', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
  });
});

describe('Object transformation', () => {
  it('deep clones objects', () => {
    const original = { a: { b: { c: 1 } } };
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.a).not.toBe(original.a);
  });

  it('deep clones arrays', () => {
    const original = [1, [2, [3]]];
    const cloned = deepClone(original);
    expect(cloned).toEqual(original);
    expect(cloned[1]).not.toBe(original[1]);
  });

  it('deep merges objects', () => {
    const target = { a: 1, b: { c: 2, d: 3 } };
    const source = { b: { c: 10 }, e: 5 };
    const merged = deepMerge({ ...target }, source);
    expect(merged).toEqual({ a: 1, b: { c: 10, d: 3 }, e: 5 });
  });
});

describe('Object picking/omitting', () => {
  it('picks specific keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('omits specific keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });
});

describe('Path utilities', () => {
  it('gets nested values', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get(obj, 'a.b.c')).toBe(42);
    expect(get(obj, 'a.b.d', 'default')).toBe('default');
  });

  it('sets nested values', () => {
    const obj: Record<string, unknown> = {};
    set(obj, 'a.b.c', 42);
    expect(obj.a).toEqual({ b: { c: 42 } });
  });

  it('checks if path exists', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(has(obj, 'a.b.c')).toBe(true);
    expect(has(obj, 'a.b.d')).toBe(false);
  });
});

describe('Flatten/unflatten', () => {
  it('flattens object', () => {
    const obj = { a: { b: { c: 1 } }, d: 2 };
    expect(flatten(obj)).toEqual({
      'a.b.c': 1,
      'd': 2,
    });
  });

  it('unflattens object', () => {
    const flat = { 'a.b.c': 1, 'd': 2 };
    expect(unflatten(flat)).toEqual({
      a: { b: { c: 1 } },
      d: 2,
    });
  });
});

describe('Object mapping', () => {
  it('maps values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const mapped = mapValues(obj, (v) => v * 2);
    expect(mapped).toEqual({ a: 2, b: 4, c: 6 });
  });

  it('filters by predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const filtered = filter(obj, (_, v) => v > 1);
    expect(filtered).toEqual({ b: 2, c: 3 });
  });

  it('removes null/undefined values', () => {
    const obj = { a: 1, b: null, c: undefined, d: 4 };
    expect(compact(obj)).toEqual({ a: 1, d: 4 });
  });
});

describe('Key transformation', () => {
  it('converts to snake_case keys', () => {
    const obj = { firstName: 'John', lastName: 'Doe' };
    expect(toSnakeCaseKeys(obj)).toEqual({
      first_name: 'John',
      last_name: 'Doe',
    });
  });

  it('converts to camelCase keys', () => {
    const obj = { first_name: 'John', last_name: 'Doe' };
    expect(toCamelCaseKeys(obj)).toEqual({
      firstName: 'John',
      lastName: 'Doe',
    });
  });
});
