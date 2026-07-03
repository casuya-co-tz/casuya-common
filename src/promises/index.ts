/**
 * Promise utilities
 * Async helpers for common asynchronous patterns
 */

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function delay<T>(ms: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value as T), ms));
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message = 'Operation timed out'
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), ms);
  });

  return Promise.race([promise, timeout]).finally(() => {
    clearTimeout(timeoutId);
  });
}

export async function retry<T>(
  fn: () => Promise<T>,
  options?: {
    maxAttempts?: number;
    delay?: number;
    backoff?: number;
    shouldRetry?: (error: Error) => boolean;
  }
): Promise<T> {
  const maxAttempts = options?.maxAttempts ?? 3;
  const baseDelay = options?.delay ?? 1000;
  const backoff = options?.backoff ?? 2;
  const shouldRetry = options?.shouldRetry ?? (() => true);

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxAttempts || !shouldRetry(lastError)) {
        throw lastError;
      }

      const wait = baseDelay * Math.pow(backoff, attempt - 1);
      await sleep(wait);
    }
  }

  throw lastError ?? new Error('Retry failed');
}

export async function parallel<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const results: T[] = [];
  const iterator = tasks[Symbol.iterator]();

  async function worker(): Promise<void> {
    for (const task of iterator) {
      results.push(await task());
    }
  }

  const workers = Array(Math.min(concurrency, tasks.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);
  return results;
}

export async function mapSeries<T, U>(
  items: T[],
  fn: (item: T, index: number) => Promise<U>
): Promise<U[]> {
  const results: U[] = [];
  for (let i = 0; i < items.length; i++) {
    results.push(await fn(items[i]!, i));
  }
  return results;
}

export async function waterfall<T>(
  fns: ((...args: unknown[]) => Promise<unknown>)[]
): Promise<T> {
  let result: unknown;
  for (const fn of fns) {
    result = await fn(result);
  }
  return result as T;
}

export async function forever<T>(
  fn: () => Promise<T>,
  options?: {
    delay?: number;
    onError?: (error: Error) => void | Promise<void>;
  }
): Promise<never> {
  const wait = options?.delay ?? 0;

  while (true) {
    try {
      await fn();
    } catch (error) {
      if (options?.onError) {
        await options.onError(error instanceof Error ? error : new Error(String(error)));
      }
    }
    if (wait > 0) {
      await sleep(wait);
    }
  }
}

export async function times<T>(
  count: number,
  fn: (index: number) => Promise<T>
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < count; i++) {
    results.push(await fn(i));
  }
  return results;
}

export async function attempt<T>(
  fn: () => Promise<T>,
  defaultValue: T
): Promise<T> {
  try {
    return await fn();
  } catch {
    return defaultValue;
  }
}

export async function always<T>(
  fn: () => Promise<T>
): Promise<{ success: true; value: T } | { success: false; error: Error }> {
  try {
    const value = await fn();
    return { success: true, value };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
  }
}

export function defer<T>(): {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
} {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
