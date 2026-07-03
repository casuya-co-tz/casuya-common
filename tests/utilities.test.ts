/**
 * Tests for utility functions
 */

import { describe, it, expect, vi } from 'vitest';
import {
  uuid,
  memoize,
  debounce,
  throttle,
  sleep,
  retry,
  withTimeout,
  pipe,
  compose,
  range,
  identity,
  constant,
  deepEqual,
  isPromise,
} from '../src/utilities';

describe('uuid', () => {
  it('generates valid UUID v4', () => {
    const id = uuid();
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('generates unique UUIDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => uuid()));
    expect(ids.size).toBe(100);
  });
});

describe('memoize', () => {
  it('caches function results', () => {
    const fn = vi.fn((x: number) => x * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized(10)).toBe(20);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('uses custom key function', () => {
    const fn = vi.fn((x: number, y: number) => x + y);
    const memoized = memoize(fn, (x, y) => `${x}-${y}`);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('debounce', () => {
  it('debounces function calls', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

describe('throttle', () => {
  it('throttles function calls', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('a');
    throttled('b');
    throttled('c');

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('a');

    vi.advanceTimersByTime(100);
    throttled('d');

    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});

describe('sleep', () => {
  it('pauses execution', async () => {
    const start = Date.now();
    await sleep(10);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(8);
  });
});

describe('retry', () => {
  it('retries failed operations', async () => {
    let attempts = 0;
    const fn = async () => {
      attempts++;
      if (attempts < 3) throw new Error('Not ready');
      return 'success';
    };

    const result = await retry(fn, { delay: 10 });
    expect(result).toBe('success');
    expect(attempts).toBe(3);
  });

  it('throws after max attempts', async () => {
    const fn = async () => {
      throw new Error('Always fails');
    };

    await expect(retry(fn, { maxAttempts: 2, delay: 10 })).rejects.toThrow('Always fails');
  });
});

describe('withTimeout', () => {
  it('resolves if promise completes in time', async () => {
    const result = await withTimeout(Promise.resolve(42), 1000);
    expect(result).toBe(42);
  });

  it('rejects if promise times out', async () => {
    const slowPromise = new Promise((resolve) => setTimeout(resolve, 500));
    await expect(withTimeout(slowPromise, 10, 'Timeout')).rejects.toThrow('Timeout');
  });
});

describe('pipe', () => {
  it('pipes value through functions', () => {
    const result = pipe(
      5,
      (x) => x * 2,
      (x) => x + 1,
      (x) => String(x)
    );
    expect(result).toBe('11');
  });
});

describe('compose', () => {
  it('composes functions right to left', () => {
    const f = compose(
      (x: number) => x * 2,
      (x: number) => x + 1
    );
    expect(f(5)).toBe(12);
  });
});

describe('range', () => {
  it('creates range of numbers', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 6, 2)).toEqual([1, 3, 5]);
  });
});

describe('identity', () => {
  it('returns value unchanged', () => {
    expect(identity(42)).toBe(42);
    expect(identity({ a: 1 })).toEqual({ a: 1 });
  });
});

describe('constant', () => {
  it('returns constant value', () => {
    const getAnswer = constant(42);
    expect(getAnswer()).toBe(42);
    expect(getAnswer()).toBe(42);
  });
});

describe('deepEqual', () => {
  it('compares primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);
    expect(deepEqual(1, 2)).toBe(false);
  });

  it('compares objects', () => {
    expect(deepEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
  });

  it('compares arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });
});

describe('isPromise', () => {
  it('identifies promises', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({})).toBe(false);
    expect(isPromise(null)).toBe(false);
  });
});
