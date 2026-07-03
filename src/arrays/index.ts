/**
 * Array utilities
 * Common array manipulation functions
 */

/**
 * Check if array is empty
 */
export function isEmpty<T>(arr: T[] | readonly T[]): boolean {
  return arr.length === 0;
}

/**
 * Check if array is not empty
 */
export function isNotEmpty<T>(arr: T[] | readonly T[]): boolean {
  return arr.length > 0;
}

/**
 * Check if value is an array
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Get first element
 */
export function first<T>(arr: T[] | readonly T[]): T | undefined {
  return arr[0];
}

/**
 * Get last element
 */
export function last<T>(arr: T[] | readonly T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * Get element at index (supports negative indices)
 */
export function at<T>(arr: T[] | readonly T[], index: number): T | undefined {
  if (index < 0) {
    index = arr.length + index;
  }
  return arr[index];
}

/**
 * Get unique elements
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Get unique elements by key
 */
export function uniqueBy<T, K>(arr: T[], keyFn: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Remove duplicates and sort
 */
export function uniqueSorted<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  return unique(arr).sort(compareFn);
}

/**
 * Flatten nested arrays
 */
export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.flat() as T[];
}

/**
 * Flatten deeply nested arrays
 */
export function flattenDeep<T>(arr: unknown[]): T[] {
  return arr.flat(Infinity) as T[];
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Split array into two based on predicate
 */
export function partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (const item of arr) {
    (predicate(item) ? pass : fail).push(item);
  }
  return [pass, fail];
}

/**
 * Group array by key
 */
export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce(
    (acc, item) => {
      const key = keyFn(item);
      (acc[key] ??= []).push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
}

/**
 * Sort array by key
 */
export function sortBy<T>(arr: T[], keyFn: (item: T) => number | string): T[] {
  return [...arr].sort((a, b) => {
    const keyA = keyFn(a);
    const keyB = keyFn(b);
    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });
}

/**
 * Reverse array
 */
export function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

/**
 * Take first n elements
 */
export function take<T>(arr: T[] | readonly T[], n: number): T[] {
  return arr.slice(0, n);
}

/**
 * Take last n elements
 */
export function takeLast<T>(arr: T[] | readonly T[], n: number): T[] {
  return arr.slice(-n);
}

/**
 * Drop first n elements
 */
export function drop<T>(arr: T[] | readonly T[], n: number): T[] {
  return arr.slice(n);
}

/**
 * Drop last n elements
 */
export function dropLast<T>(arr: T[] | readonly T[], n: number): T[] {
  return arr.slice(0, -n);
}

/**
 * Find difference between arrays
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => !set2.has(item));
}

/**
 * Find intersection of arrays
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter((item) => set2.has(item));
}

/**
 * Find union of arrays
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(arrays.flat());
}

/**
 * Check if arrays have same elements
 */
export function equals<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sorted1.every((item, i) => item === sorted2[i]);
}

/**
 * Shuffle array
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j]!, result[i]!];
  }
  return result;
}

/**
 * Get random element
 */
export function sample<T>(arr: T[] | readonly T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Get n random elements
 */
export function sampleSize<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/**
 * Zip arrays together
 */
export function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i]!, arr2[i]!]);
  }
  return result;
}

/**
 * Count occurrences
 */
export function countBy<T>(arr: T[], keyFn: (item: T) => string | number): Record<string, number> {
  return arr.reduce(
    (acc, item) => {
      const key = String(keyFn(item));
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}

/**
 * Find min value
 */
export function min<T>(arr: T[], keyFn: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((min, item) => (keyFn(item) < keyFn(min) ? item : min));
}

/**
 * Find max value
 */
export function max<T>(arr: T[], keyFn: (item: T) => number): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((max, item) => (keyFn(item) > keyFn(max) ? item : max));
}

/**
 * Move element to new position
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const result = [...arr];
  const [item] = result.splice(from, 1);
  if (item !== undefined) {
    result.splice(to, 0, item);
  }
  return result;
}

/**
 * Insert at index
 */
export function insertAt<T>(arr: T[], index: number, item: T): T[] {
  const result = [...arr];
  result.splice(index, 0, item);
  return result;
}

/**
 * Remove at index
 */
export function removeAt<T>(arr: T[], index: number): T[] {
  const result = [...arr];
  result.splice(index, 1);
  return result;
}

/**
 * Create an array of numbers in a range
 */
export function range(start: number, end: number, step = 1): number[] {
  const result: number[] = [];
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Fill an array with a value
 */
export function fill<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

/**
 * Rotate array elements by offset (positive = right, negative = left)
 */
export function rotate<T>(arr: T[], offset: number): T[] {
  if (arr.length === 0) return [];
  const normalized = offset % arr.length;
  if (normalized === 0) return [...arr];
  const split = normalized > 0 ? arr.length - normalized : Math.abs(normalized);
  return [...arr.slice(split), ...arr.slice(0, split)];
}

/**
 * Sample weighted random element based on weights
 */
export function sampleWeighted<T>(items: T[], weights: number[]): T | undefined {
  if (items.length === 0) return undefined;
  if (items.length !== weights.length) return undefined;

  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  if (totalWeight <= 0) return undefined;

  let random = Math.random() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    random -= weights[i]!;
    if (random <= 0) return items[i];
  }

  return items[items.length - 1];
}

/**
 * Check if array includes any of the values
 */
export function includesAny<T>(arr: T[] | readonly T[], values: T[]): boolean {
  return values.some((v) => arr.includes(v));
}

/**
 * Check if array includes all of the values
 */
export function includesAll<T>(arr: T[] | readonly T[], values: T[]): boolean {
  return values.every((v) => arr.includes(v));
}

/**
 * Find the most frequent element
 */
export function mostFrequent<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const freq = new Map<T, number>();
  let maxCount = 0;
  let maxItem: T | undefined;

  for (const item of arr) {
    const count = (freq.get(item) ?? 0) + 1;
    freq.set(item, count);
    if (count > maxCount) {
      maxCount = count;
      maxItem = item;
    }
  }

  return maxItem;
}

/**
 * Split array into two at index
 */
export function splitAt<T>(arr: T[] | readonly T[], index: number): [T[], T[]] {
  return [arr.slice(0, index), arr.slice(index)];
}

/**
 * Get all elements except the last n
 */
export function initial<T>(arr: T[] | readonly T[], n = 1): T[] {
  return arr.slice(0, arr.length - n);
}

/**
 * Get the tail (all elements except the first)
 */
export function tail<T>(arr: T[] | readonly T[]): T[] {
  return arr.slice(1);
}

/**
 * Compact array (remove falsy values)
 */
export function compact<T>(arr: (T | null | undefined | false | '' | 0)[]): T[] {
  return arr.filter(Boolean) as T[];
}

/**
 * Replace element at index
 */
export function replaceAt<T>(arr: T[], index: number, value: T): T[] {
  const result = [...arr];
  if (index >= 0 && index < result.length) {
    result[index] = value;
  }
  return result;
}

/**
 * Update element at index using a function
 */
export function updateAt<T>(arr: T[], index: number, fn: (item: T) => T): T[] {
  return replaceAt(arr, index, fn(arr[index]!));
}

/**
 * Toggle element in array (add if not present, remove if present)
 */
export function toggle<T>(arr: T[], item: T): T[] {
  return arr.includes(item)
    ? arr.filter((i) => i !== item)
    : [...arr, item];
}

/**
 * Swap two elements by index
 */
export function swap<T>(arr: T[], i: number, j: number): T[] {
  const result = [...arr];
  const temp = result[i];
  result[i] = result[j]!;
  result[j] = temp!;
  return result;
}

/**
 * Create an array with n copies of the same value
 */
export function times<T>(n: number, fn: (index: number) => T): T[] {
  return Array.from({ length: n }, (_, i) => fn(i));
}

/**
 * Find the difference between two arrays by a key function
 */
export function differenceBy<T, K>(
  arr1: T[],
  arr2: T[],
  keyFn: (item: T) => K
): T[] {
  const keys2 = new Set(arr2.map(keyFn));
  return arr1.filter((item) => !keys2.has(keyFn(item)));
}

/**
 * Find the intersection between two arrays by a key function
 */
export function intersectionBy<T, K>(
  arr1: T[],
  arr2: T[],
  keyFn: (item: T) => K
): T[] {
  const keys2 = new Set(arr2.map(keyFn));
  return arr1.filter((item) => keys2.has(keyFn(item)));
}

/**
 * Find the union between two arrays by a key function
 */
export function unionBy<T, K>(
  arr1: T[],
  arr2: T[],
  keyFn: (item: T) => K
): T[] {
  const seen = new Set<K>();
  return [...arr1, ...arr2].filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
