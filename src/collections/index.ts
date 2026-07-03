/**
 * Collection utilities
 * Map and Set helpers
 */

export function mapToObject<V>(map: Map<string, V>): Record<string, V> {
  const obj: Record<string, V> = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

export function objectToMap<V>(obj: Record<string, V>): Map<string, V> {
  const map = new Map<string, V>();
  for (const key of Object.keys(obj)) {
    map.set(key, obj[key]!);
  }
  return map;
}

export function mapFilter<K, V>(
  map: Map<K, V>,
  predicate: (value: V, key: K) => boolean
): Map<K, V> {
  const result = new Map<K, V>();
  for (const [key, value] of map) {
    if (predicate(value, key)) {
      result.set(key, value);
    }
  }
  return result;
}

export function mapMap<K, V, U>(
  map: Map<K, V>,
  fn: (value: V, key: K) => U
): Map<K, U> {
  const result = new Map<K, U>();
  for (const [key, value] of map) {
    result.set(key, fn(value, key));
  }
  return result;
}

export function mapMerge<K, V>(...maps: Map<K, V>[]): Map<K, V> {
  const result = new Map<K, V>();
  for (const map of maps) {
    for (const [key, value] of map) {
      result.set(key, value);
    }
  }
  return result;
}

export function setUnion<T>(...sets: Set<T>[]): Set<T> {
  const result = new Set<T>();
  for (const set of sets) {
    for (const item of set) {
      result.add(item);
    }
  }
  return result;
}

export function setIntersection<T>(...sets: Set<T>[]): Set<T> {
  if (sets.length === 0) return new Set<T>();
  const [first, ...rest] = sets;
  const result = new Set<T>();
  for (const item of first ?? []) {
    if (rest.every((set) => set.has(item))) {
      result.add(item);
    }
  }
  return result;
}

export function setDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of a) {
    if (!b.has(item)) {
      result.add(item);
    }
  }
  return result;
}

export function setSymmetricDifference<T>(a: Set<T>, b: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of a) {
    if (!b.has(item)) result.add(item);
  }
  for (const item of b) {
    if (!a.has(item)) result.add(item);
  }
  return result;
}

export function setEquals<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}

export function setIsSubset<T>(a: Set<T>, b: Set<T>): boolean {
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}

export function setMap<T, U>(set: Set<T>, fn: (item: T) => U): Set<U> {
  const result = new Set<U>();
  for (const item of set) {
    result.add(fn(item));
  }
  return result;
}

export function setFilter<T>(set: Set<T>, predicate: (item: T) => boolean): Set<T> {
  const result = new Set<T>();
  for (const item of set) {
    if (predicate(item)) {
      result.add(item);
    }
  }
  return result;
}

export function setFromArray<T>(arr: T[]): Set<T> {
  return new Set(arr);
}

export function setToArray<T>(set: Set<T>): T[] {
  return [...set];
}

export function setFind<T>(set: Set<T>, predicate: (item: T) => boolean): T | undefined {
  for (const item of set) {
    if (predicate(item)) return item;
  }
  return undefined;
}

export function setGroupBy<T, K>(
  items: T[],
  keyFn: (item: T) => K
): Map<K, Set<T>> {
  const map = new Map<K, Set<T>>();
  for (const item of items) {
    const key = keyFn(item);
    const set = map.get(key);
    if (set) {
      set.add(item);
    } else {
      map.set(key, new Set([item]));
    }
  }
  return map;
}
