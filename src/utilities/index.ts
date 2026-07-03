/**
 * Additional utility functions
 * Unique utilities not covered by other modules
 */

export { uuid, ulid } from '../crypto';

export {
  memoize,
  debounce,
  throttle,
  pipe,
  compose,
  curry,
  identity,
  constant,
  noop,
} from '../functions';

export {
  sleep,
  retry,
  withTimeout,
  parallel,
} from '../promises';

export { range } from '../arrays';

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;
  if (typeof a !== 'object') return a === b;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
      return false;
    }
  }

  return true;
}

export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as Promise<T>).then === 'function'
  );
}
