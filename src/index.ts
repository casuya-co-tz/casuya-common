/**
 * Casuya Common
 * Shared utilities, types, and helpers for the Casuya ecosystem
 */

// Constants
export * from './constants';

// Errors
export * from './errors';

// Utilities
export * from './utilities';
export * from './date';
export {
  capitalize,
  uncapitalize,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toTitleCase,
  truncate,
  trim,
  normalizeWhitespace,
  isEmpty as isStringEmpty,
  startsWith,
  endsWith,
  removePrefix,
  removeSuffix,
  padLeft,
  padRight,
  randomString,
  slugify,
  escapeHtml,
  unescapeHtml,
  template,
} from './strings';
export * from './numbers';
export {
  isEmpty as isArrayEmpty,
  isNotEmpty as isArrayNotEmpty,
  isArray,
  first,
  last,
  at,
  unique,
  uniqueBy,
  uniqueSorted,
  flatten as flattenArray,
  flattenDeep,
  chunk as chunkArray,
  partition,
  groupBy,
  sortBy,
  reverse,
  take,
  takeLast,
  drop,
  dropLast,
  difference,
  intersection,
  union,
  equals,
  shuffle,
  sample,
  sampleSize,
  zip,
  countBy,
  min,
  max,
  move,
  insertAt,
  removeAt,
} from './arrays';
export {
  isObject,
  isPlainObject,
  isEmpty as isObjectEmpty,
  keys,
  values,
  entries,
  fromEntries,
  deepClone,
  deepMerge,
  merge,
  pick,
  omit,
  get,
  set,
  has as hasPath,
  flatten as flattenObject,
  unflatten,
  mapValues,
  mapKeys,
  filter as filterObject,
  compact,
  toSnakeCaseKeys,
  toCamelCaseKeys,
  deepFreeze,
} from './objects';

// Validators
export * from './validators';

// Types
export * from './types';

// Schemas
export * from './schemas';

// Configuration
export * from './configuration';

// Logging
export * from './logging';

// Interfaces
export * from './interfaces';

// Environments
export * from './environments';

// Promises
export * from './promises';

// Functions
export * from './functions';

// Collections
export * from './collections';

// Crypto
export * from './crypto';

// Ecosystem shared types
export * from './ecosystem';
