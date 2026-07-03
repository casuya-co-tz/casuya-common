import { describe, it, expect } from 'vitest';
import { sleep, delay, withTimeout, retry, parallel, mapSeries, waterfall, attempt, always, defer } from '../src/promises';

describe('promises', () => {
  describe('sleep', () => {
    it('should resolve after specified time', async () => {
      const start = Date.now();
      await sleep(10);
      expect(Date.now() - start).toBeGreaterThanOrEqual(5);
    });
  });

  describe('delay', () => {
    it('should resolve with value', async () => {
      const result = await delay(10, 'test');
      expect(result).toBe('test');
    });
  });

  describe('withTimeout', () => {
    it('should resolve if promise completes in time', async () => {
      const result = await withTimeout(Promise.resolve('ok'), 100);
      expect(result).toBe('ok');
    });

    it('should reject if promise times out', async () => {
      await expect(withTimeout(sleep(200), 10)).rejects.toThrow('Operation timed out');
    });
  });

  describe('retry', () => {
    it('should succeed on first attempt', async () => {
      const result = await retry(() => Promise.resolve('ok'), { maxAttempts: 3 });
      expect(result).toBe('ok');
    });

    it('should retry on failure', async () => {
      let attempts = 0;
      const result = await retry(() => {
        attempts++;
        if (attempts < 3) return Promise.reject(new Error('fail'));
        return Promise.resolve('ok');
      }, { maxAttempts: 3, delay: 1 });
      expect(result).toBe('ok');
      expect(attempts).toBe(3);
    });

    it('should throw after max attempts', async () => {
      await expect(retry(() => Promise.reject(new Error('fail')), { maxAttempts: 2, delay: 1 })).rejects.toThrow('fail');
    });
  });

  describe('parallel', () => {
    it('should run tasks with concurrency limit', async () => {
      const results = await parallel(
        [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)],
        2
      );
      expect(results).toEqual([1, 2, 3]);
    });
  });

  describe('mapSeries', () => {
    it('should map items sequentially', async () => {
      const result = await mapSeries([1, 2, 3], async (n) => n * 2);
      expect(result).toEqual([2, 4, 6]);
    });
  });

  describe('waterfall', () => {
    it('should pass results through functions', async () => {
      const result = await waterfall<number>([
        async () => 1,
        async (n) => (n as number) + 1,
        async (n) => (n as number) + 1,
      ]);
      expect(result).toBe(3);
    });
  });

  describe('attempt', () => {
    it('should return value on success', async () => {
      const result = await attempt(() => Promise.resolve('ok'), 'default');
      expect(result).toBe('ok');
    });

    it('should return default on failure', async () => {
      const result = await attempt(() => Promise.reject(new Error('fail')), 'default');
      expect(result).toBe('default');
    });
  });

  describe('always', () => {
    it('should return success result', async () => {
      const result = await always(() => Promise.resolve('ok'));
      expect(result.success).toBe(true);
      if (result.success) expect(result.value).toBe('ok');
    });

    it('should return error result', async () => {
      const result = await always(() => Promise.reject(new Error('fail')));
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.message).toBe('fail');
    });
  });

  describe('defer', () => {
    it('should create a deferred promise', async () => {
      const d = defer<number>();
      d.resolve(42);
      const result = await d.promise;
      expect(result).toBe(42);
    });

    it('should reject deferred promise', async () => {
      const d = defer<number>();
      d.reject(new Error('fail'));
      await expect(d.promise).rejects.toThrow('fail');
    });
  });
});
