/**
 * Function utilities
 * Helpers for function composition and manipulation
 */

type AnyFn = (...args: unknown[]) => unknown;

export function pipe<T>(value: T, ...fns: ((value: T) => T)[]): T {
  return fns.reduce((v, fn) => fn(v), value);
}

export function compose<T>(...fns: ((value: T) => T)[]): (value: T) => T {
  return (value: T) => fns.reduceRight((v, fn) => fn(v), value);
}

export function curry<T extends AnyFn>(
  fn: T,
  arity = fn.length
): (...args: unknown[]) => unknown {
  return function curried(...args: unknown[]): unknown {
    if (args.length >= arity) {
      return fn(...args);
    }
    return (...moreArgs: unknown[]) => curried(...args, ...moreArgs);
  };
}

export function once<T extends AnyFn>(fn: T): T {
  let called = false;

  return ((...args: unknown[]) => {
    if (called) return undefined;
    called = true;
    return fn(...args);
  }) as T;
}

export function tap<T>(fn: (value: T) => void): (value: T) => T {
  return (value: T) => {
    fn(value);
    return value;
  };
}

export function negate<T extends unknown[]>(
  predicate: (...args: T) => boolean
): (...args: T) => boolean {
  return (...args: T) => !predicate(...args);
}

export function memoize<T extends AnyFn>(
  fn: T,
  keyFn?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = keyFn ? keyFn(...args) : JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as T;
}

export function throttle<T extends AnyFn>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export function debounce<T extends AnyFn>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

export function partial<T extends AnyFn>(
  fn: T,
  ...presetArgs: unknown[]
): (...args: unknown[]) => unknown {
  return (...laterArgs: unknown[]) => fn(...presetArgs, ...laterArgs);
}

export function partialRight<T extends AnyFn>(
  fn: T,
  ...presetArgs: unknown[]
): (...args: unknown[]) => unknown {
  return (...laterArgs: unknown[]) => fn(...laterArgs, ...presetArgs);
}

export function identity<T>(value: T): T {
  return value;
}

export function constant<T>(value: T): () => T {
  return () => value;
}

export function noop(): void {}

export function apply<T, U>(fn: (arg: T) => U, arg: T): U {
  return fn(arg);
}

export function unary<T, U>(fn: (arg: T, ...rest: unknown[]) => U): (arg: T) => U {
  return (arg: T) => fn(arg);
}

export function ary<T extends AnyFn>(fn: T, n: number): (...args: unknown[]) => unknown {
  return (...args: unknown[]) => fn(...args.slice(0, n));
}

export function spread<T extends unknown[], U>(
  fn: (...args: T) => U
): (args: T) => U {
  return (args: T) => fn(...args);
}

export function flip<T extends AnyFn>(fn: T): (...args: unknown[]) => unknown {
  return (...args: unknown[]) => fn(...args.reverse());
}
