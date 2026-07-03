import { describe, it, expect } from 'vitest';
import { pipe, compose, curry, once, tap, negate, memoize, identity, constant, noop, partial, partialRight, flip } from '../src/functions';

describe('functions', () => {
  describe('pipe', () => {
    it('should pipe value through functions', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      expect(pipe(5, add1, double)).toBe(12);
    });
  });

  describe('compose', () => {
    it('should compose functions right to left', () => {
      const add1 = (x: number) => x + 1;
      const double = (x: number) => x * 2;
      const fn = compose(add1, double);
      expect(fn(5)).toBe(11); // double(5) = 10, add1(10) = 11
    });
  });

  describe('curry', () => {
    it('should curry a function', () => {
      const sum = (a: number, b: number, c: number) => a + b + c;
      const curried = curry(sum);
      expect(curried(1, 2, 3)).toBe(6);
      expect((curried(1) as Function)(2, 3)).toBe(6);
      expect((curried(1) as Function)(2)(3)).toBe(6);
    });
  });

  describe('once', () => {
    it('should only call function once', () => {
      let count = 0;
      const fn = once(() => { count++; return count; });
      fn();
      fn();
      fn();
      expect(count).toBe(1);
    });
  });

  describe('tap', () => {
    it('should call interceptor and return value', () => {
      const log: number[] = [];
      const result = pipe(5, tap((x) => log.push(x)), (x) => x + 1);
      expect(result).toBe(6);
      expect(log).toEqual([5]);
    });
  });

  describe('negate', () => {
    it('should negate a predicate', () => {
      const isEven = (x: number) => x % 2 === 0;
      const isOdd = negate(isEven);
      expect(isEven(2)).toBe(true);
      expect(isOdd(2)).toBe(false);
      expect(isOdd(3)).toBe(true);
    });
  });

  describe('memoize', () => {
    it('should cache results', () => {
      let callCount = 0;
      const fn = memoize((x: number) => { callCount++; return x * 2; });
      expect(fn(5)).toBe(10);
      expect(fn(5)).toBe(10);
      expect(callCount).toBe(1);
      expect(fn(6)).toBe(12);
      expect(callCount).toBe(2);
    });
  });

  describe('identity', () => {
    it('should return the same value', () => {
      expect(identity(42)).toBe(42);
      expect(identity('hello')).toBe('hello');
    });
  });

  describe('constant', () => {
    it('should return a constant function', () => {
      const fn = constant(42);
      expect(fn()).toBe(42);
      expect(fn('anything')).toBe(42);
    });
  });

  describe('noop', () => {
    it('should return undefined', () => {
      expect(noop()).toBeUndefined();
    });
  });

  describe('partial', () => {
    it('should partially apply arguments', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const add5 = partial(add, 2, 3) as (...args: unknown[]) => number;
      expect(add5(4)).toBe(9);
    });
  });

  describe('partialRight', () => {
    it('should partially apply arguments from right', () => {
      const greet = (greeting: string, name: string) => `${greeting}, ${name}`;
      const sayHello = partialRight(greet, 'World') as (...args: unknown[]) => string;
      expect(sayHello('Hello')).toBe('Hello, World');
      const sayHi = partialRight(greet, 'there') as (...args: unknown[]) => string;
      expect(sayHi('Hi')).toBe('Hi, there');
    });
  });

  describe('flip', () => {
    it('should flip argument order', () => {
      const divide = (a: number, b: number) => a / b;
      const flipped = flip(divide) as (...args: unknown[]) => number;
      expect(flipped(2, 10)).toBe(5); // 10 / 2 = 5
    });
  });
});
