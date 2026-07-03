/**
 * Tests for array utilities
 */

import { describe, it, expect } from 'vitest';
import {
  isEmpty,
  isNotEmpty,
  first,
  last,
  at,
  unique,
  uniqueBy,
  flatten,
  chunk,
  partition,
  groupBy,
  sortBy,
  take,
  drop,
  difference,
  intersection,
  union,
  shuffle,
  sample,
  zip,
  countBy,
  move,
  insertAt,
  removeAt,
} from '../src/arrays';

describe('Array basics', () => {
  it('checks isEmpty', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it('checks isNotEmpty', () => {
    expect(isNotEmpty([])).toBe(false);
    expect(isNotEmpty([1])).toBe(true);
  });

  it('gets first element', () => {
    expect(first([1, 2, 3])).toBe(1);
    expect(first([])).toBeUndefined();
  });

  it('gets last element', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([])).toBeUndefined();
  });

  it('gets element at index (negative)', () => {
    expect(at([1, 2, 3], -1)).toBe(3);
    expect(at([1, 2, 3], -2)).toBe(2);
  });
});

describe('Array transformations', () => {
  it('removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });

  it('removes duplicates by key', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
    ];
    const result = uniqueBy(items, (item) => item.id);
    expect(result).toHaveLength(2);
    expect(result[0]?.id).toBe(1);
    expect(result[1]?.id).toBe(2);
  });

  it('flattens arrays', () => {
    expect(flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4]);
  });

  it('chunks arrays', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
  });
});

describe('Array partitioning', () => {
  it('partitions by predicate', () => {
    const [pass, fail] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
    expect(pass).toEqual([2, 4]);
    expect(fail).toEqual([1, 3, 5]);
  });

  it('groups by key', () => {
    const items = [
      { type: 'a', value: 1 },
      { type: 'b', value: 2 },
      { type: 'a', value: 3 },
    ];
    const grouped = groupBy(items, (item) => item.type);
    expect(grouped.a).toHaveLength(2);
    expect(grouped.b).toHaveLength(1);
  });

  it('sorts by key', () => {
    const items = [{ v: 3 }, { v: 1 }, { v: 2 }];
    const sorted = sortBy(items, (item) => item.v);
    expect(sorted.map((i) => i.v)).toEqual([1, 2, 3]);
  });
});

describe('Array slicing', () => {
  it('takes first n elements', () => {
    expect(take([1, 2, 3, 4], 2)).toEqual([1, 2]);
    expect(take([1], 5)).toEqual([1]);
  });

  it('drops first n elements', () => {
    expect(drop([1, 2, 3, 4], 2)).toEqual([3, 4]);
  });
});

describe('Set operations', () => {
  it('finds difference', () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });

  it('finds intersection', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it('finds union', () => {
    expect(union([1, 2], [2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
  });
});

describe('Random operations', () => {
  it('shuffles array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffled = shuffle(arr);
    expect(shuffled.length).toBe(arr.length);
    // Check all elements are present
    const sorted = [...shuffled].sort((a, b) => a - b);
    expect(sorted).toEqual(arr);
    // Check it's actually shuffled (very unlikely to be in same order)
    expect(shuffled).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('samples random element', () => {
    const arr = [1, 2, 3];
    const sampleResult = sample(arr);
    expect(arr).toContain(sampleResult);
  });

  it('returns undefined for empty array sample', () => {
    expect(sample([])).toBeUndefined();
  });
});

describe('Other utilities', () => {
  it('zips arrays', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('counts by key', () => {
    expect(countBy([1, 1, 2, 2, 2, 3], (n) => String(n))).toEqual({
      '1': 2,
      '2': 3,
      '3': 1,
    });
  });

  it('moves elements', () => {
    expect(move([1, 2, 3, 4], 0, 2)).toEqual([2, 3, 1, 4]);
  });

  it('inserts at index', () => {
    expect(insertAt([1, 2, 4], 2, 3)).toEqual([1, 2, 3, 4]);
  });

  it('removes at index', () => {
    expect(removeAt([1, 2, 3, 4], 1)).toEqual([1, 3, 4]);
  });
});
