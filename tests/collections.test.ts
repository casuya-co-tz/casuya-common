import { describe, it, expect } from 'vitest';
import {
  mapToObject,
  objectToMap,
  mapFilter,
  mapMap,
  mapMerge,
  setUnion,
  setIntersection,
  setDifference,
  setSymmetricDifference,
  setEquals,
  setIsSubset,
  setMap,
  setFilter,
  setFromArray,
  setToArray,
  setFind,
  setGroupBy,
} from '../src/collections';

describe('collections', () => {
  describe('Map helpers', () => {
    const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

    it('mapToObject', () => {
      const obj = mapToObject(map);
      expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('objectToMap', () => {
      const m = objectToMap({ a: 1, b: 2 });
      expect(m.get('a')).toBe(1);
      expect(m.get('b')).toBe(2);
    });

    it('mapFilter', () => {
      const filtered = mapFilter(map, (v) => v > 1);
      expect([...filtered.entries()]).toEqual([['b', 2], ['c', 3]]);
    });

    it('mapMap', () => {
      const mapped = mapMap(map, (v) => v * 2);
      expect(mapped.get('a')).toBe(2);
      expect(mapped.get('b')).toBe(4);
    });

    it('mapMerge', () => {
      const m1 = new Map([['a', 1]]);
      const m2 = new Map([['b', 2]]);
      const merged = mapMerge(m1, m2);
      expect(merged.get('a')).toBe(1);
      expect(merged.get('b')).toBe(2);
    });
  });

  describe('Set helpers', () => {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([3, 4, 5]);

    it('setUnion', () => {
      expect([...setUnion(setA, setB)].sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it('setIntersection', () => {
      expect([...setIntersection(setA, setB)]).toEqual([3]);
    });

    it('setDifference', () => {
      expect([...setDifference(setA, setB)].sort()).toEqual([1, 2]);
    });

    it('setSymmetricDifference', () => {
      expect([...setSymmetricDifference(setA, setB)].sort()).toEqual([1, 2, 4, 5]);
    });

    it('setEquals', () => {
      expect(setEquals(new Set([1, 2]), new Set([2, 1]))).toBe(true);
      expect(setEquals(new Set([1, 2]), new Set([1, 3]))).toBe(false);
    });

    it('setIsSubset', () => {
      expect(setIsSubset(new Set([1, 2]), new Set([1, 2, 3]))).toBe(true);
      expect(setIsSubset(new Set([1, 2, 4]), new Set([1, 2, 3]))).toBe(false);
    });

    it('setMap', () => {
      const result = setMap(setA, (x) => x * 2);
      expect([...result].sort()).toEqual([2, 4, 6]);
    });

    it('setFilter', () => {
      const result = setFilter(setA, (x) => x > 1);
      expect([...result].sort()).toEqual([2, 3]);
    });

    it('setFromArray and setToArray', () => {
      const s = setFromArray([1, 2, 2, 3]);
      expect([...setToArray(s)].sort()).toEqual([1, 2, 3]);
    });

    it('setFind', () => {
      expect(setFind(setA, (x) => x > 2)).toBe(3);
      expect(setFind(setA, (x) => x > 10)).toBeUndefined();
    });

    it('setGroupBy', () => {
      const items = [1, 2, 3, 4, 5, 6];
      const grouped = setGroupBy(items, (x) => x % 2 === 0 ? 'even' : 'odd');
      expect([...grouped.get('even')!].sort()).toEqual([2, 4, 6]);
      expect([...grouped.get('odd')!].sort()).toEqual([1, 3, 5]);
    });
  });
});
