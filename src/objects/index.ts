/**
 * Object utilities
 * Common object manipulation functions
 */

/**
 * Check if value is an object (not null, not array)
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Check if value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Get object keys
 */
export function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Get object values
 */
export function values<T extends Record<string, unknown>>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

/**
 * Get object entries
 */
export function entries<T extends Record<string, unknown>>(
  obj: T
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Create object from entries
 */
export function fromEntries<K extends string | number | symbol, V>(
  entries: [K, V][]
): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone) as T;
  if (obj instanceof Date) return new Date(obj) as T;
  if (obj instanceof Map) return new Map([...obj]) as T;
  if (obj instanceof Set) return new Set([...obj]) as T;

  const cloned: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
  }
  return cloned as T;
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (sources.length === 0) return target;

  const result = { ...target } as Record<string, unknown>;
  const source = sources.shift();
  if (!source) return target;

  for (const key of Object.keys(source)) {
    const targetValue = result[key];
    const sourceValue = source[key];

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      result[key] = deepMerge(
        { ...targetValue } as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      );
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue;
    }
  }

  return deepMerge(result as T, ...sources);
}

/**
 * Shallow merge objects
 */
export function merge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  return Object.assign({}, target, ...sources);
}

/**
 * Pick specific keys from object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result: Partial<T> = {};
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result as Pick<T, K>;
}

/**
 * Omit specific keys from object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result: Partial<T> = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Get nested value by path
 */
export function get<T = unknown>(
  obj: Record<string, unknown>,
  path: string,
  defaultValue?: T
): T | undefined {
  const value = path
    .split('.')
    .reduce<unknown>(
      (acc, key) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined),
      obj
    );
  return (value ?? defaultValue) as T | undefined;
}

/**
 * Set nested value by path
 */
export function set<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown
): T {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!;
    if (!(key in current) || !isPlainObject(current[key])) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }

  current[keys[keys.length - 1]!] = value;
  return obj;
}

/**
 * Check if object has nested path
 */
export function has(obj: Record<string, unknown>, path: string): boolean {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (!isObject(current)) return false;
    if (!(key in current)) return false;
    current = current[key];
  }

  return true;
}

/**
 * Flatten object to dot-notation paths
 */
export function flatten(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : String(key);

    if (isPlainObject(value)) {
      Object.assign(result, flatten(value as Record<string, unknown>, path));
    } else {
      result[path] = value;
    }
  }

  return result;
}

/**
 * Unflatten dot-notation paths to object
 */
export function unflatten(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of entries(obj)) {
    set(result, key, value);
  }

  return result;
}

/**
 * Map over object values
 */
export function mapValues<T extends object, V>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => V
): Record<keyof T, V> {
  const result = {} as Record<keyof T, V>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[key] = fn(obj[key], key);
  }
  return result;
}

/**
 * Map over object keys
 */
export function mapKeys<T extends object>(
  obj: T,
  fn: (key: keyof T) => string
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[fn(key)] = obj[key];
  }
  return result;
}

/**
 * Filter object by predicate
 */
export function filter<T extends object>(
  obj: T,
  predicate: (key: keyof T, value: T[keyof T]) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Remove undefined/null values
 */
export function compact<T extends object>(obj: T): Partial<T> {
  return filter(obj, (_, value) => value !== undefined && value !== null);
}

/**
 * Transform object keys to snake_case
 */
export function toSnakeCaseKeys<T extends object>(obj: T): Record<string, unknown> {
  const toSnake = (str: string) =>
    str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const newKey = toSnake(key);
    const value = (obj as Record<string, unknown>)[key];
    result[newKey] = isPlainObject(value)
      ? toSnakeCaseKeys(value)
      : value;
  }
  return result;
}

/**
 * Transform object keys to camelCase
 */
export function toCamelCaseKeys<T extends object>(obj: T): Record<string, unknown> {
  const toCamel = (str: string) =>
    str.toLowerCase().replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const newKey = toCamel(key);
    const value = (obj as Record<string, unknown>)[key];
    result[newKey] = isPlainObject(value)
      ? toCamelCaseKeys(value)
      : value;
  }
  return result;
}

/**
 * Freeze object deeply
 */
export function deepFreeze<T extends object>(obj: T): T {
  Object.freeze(obj);
  for (const key of Object.keys(obj)) {
    const value = (obj as Record<string, unknown>)[key];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value as object);
    }
  }
  return obj;
}

/**
 * Invert object keys and values
 */
export function invert<T extends Record<string, string | number | symbol>>(
  obj: T
): { [K in keyof T as T[K] extends string | number | symbol ? T[K] : never]: K } {
  const result = {} as Record<string | number | symbol, keyof T>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const value = obj[key];
    if (value !== undefined && (typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol')) {
      result[value as string | number | symbol] = key;
    }
  }
  return result as any;
}

/**
 * Rename object keys
 */
export function renameKeys<T extends object>(
  obj: T,
  keyMap: Record<string, string>
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const newKey = keyMap[String(key)] ?? String(key);
    result[newKey] = obj[key];
  }
  return result;
}

/**
 * Apply defaults to an object (only fills undefined values)
 */
export function defaults<T extends object>(obj: T, ...defaults: Partial<T>[]): T {
  return Object.assign({}, ...defaults, obj);
}

/**
 * Deep diff between two objects (returns the differences)
 */
export function deepDiff<T extends object>(
  base: T,
  compare: T
): Partial<T> {
  const diff: Partial<T> = {} as Partial<T>;

  for (const key of Object.keys(compare) as (keyof T)[]) {
    const baseVal = base[key];
    const compareVal = compare[key];

    if (baseVal === compareVal) continue;

    if (isPlainObject(baseVal) && isPlainObject(compareVal)) {
      const nestedDiff = deepDiff(
        baseVal as Record<string, unknown>,
        compareVal as Record<string, unknown>
      ) as T[keyof T];
      if (Object.keys(nestedDiff as object).length > 0) {
        diff[key] = nestedDiff;
      }
    } else {
      diff[key] = compareVal;
    }
  }

  return diff;
}

/**
 * Deep omit - omit nested keys using dot notation
 */
export function deepOmit<T extends object>(
  obj: T,
  paths: string[]
): Partial<T> {
  const result = deepClone(obj) as Record<string, unknown>;

  for (const path of paths) {
    const keys = path.split('.');
    let current: Record<string, unknown> = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]!;
      if (!isObject(current[key])) break;
      current = current[key] as Record<string, unknown>;
    }

    delete current[keys[keys.length - 1]!];
  }

  return result as Partial<T>;
}

/**
 * Deep pick - pick nested keys using dot notation
 */
export function deepPick<T extends object>(
  obj: T,
  paths: string[]
): Partial<T> {
  const result: Record<string, unknown> = {};

  for (const path of paths) {
    const keys = path.split('.');
    let source: unknown = obj;
    let target: Record<string, unknown> = result;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]!;
      if (source === undefined || source === null) break;
      if (!isObject(source)) break;

      source = (source as Record<string, unknown>)[key];

      if (i === keys.length - 1) {
        target[key] = source;
      } else {
        target[key] = target[key] ?? {};
        target = target[key] as Record<string, unknown>;
      }
    }
  }

  return result as Partial<T>;
}
