/**
 * Common type definitions
 * Shared types used across the Casuya ecosystem
 */

/**
 * Make specified keys optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specified keys required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Make specified keys readonly
 */
export type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

/**
 * Make specified keys mutable
 */
export type MutableBy<T, K extends keyof T> = Omit<T, K> & {
  -readonly [P in K]: T[P];
};

/**
 * Make all properties writable
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/**
 * Deep partial type
 */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/**
 * Deep required type
 */
export type DeepRequired<T> = T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T;

/**
 * Deep readonly type
 */
export type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

/**
 * Non-nullable type
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Value of an object type
 */
export type ValueOf<T> = T[keyof T];

/**
 * Element type of array
 */
export type ElementOf<T> = T extends readonly (infer E)[] ? E : never;

/**
 * Function return type
 */
export type ReturnTypeOf<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: unknown[]
) => infer R
  ? R
  : never;

/**
 * Extract the type of a promise
 */
export type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

/**
 * Union to intersection
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * Last element of union
 */
export type LastOf<T> = UnionToIntersection<
  T extends unknown ? () => T : never
> extends () => infer R
  ? R
  : never;

/**
 * Tuple of specified length
 */
export type Tuple<T, N extends number, R extends T[] = []> = R['length'] extends N
  ? R
  : Tuple<T, N, [...R, T]>;

/**
 * Brand a type for nominal typing
 */
export type Brand<T, B> = T & { readonly __brand: B };

/**
 * Opaque type
 */
export type Opaque<Type, Token> = Type & { readonly __opaque__: Token };

/**
 * ID types
 */
export type UUID = Brand<string, 'UUID'>;
export type ULID = Brand<string, 'ULID'>;
export type Slug = Brand<string, 'Slug'>;

/**
 * Timestamp type
 */
export type Timestamp = Brand<number, 'Timestamp'>;

/**
 * Result type for error handling
 */
export type Result<T, E = Error> = Success<T> | Failure<E>;

export interface Success<T> {
  ok: true;
  value: T;
}

export interface Failure<E> {
  ok: false;
  error: E;
}

/**
 * Option type
 */
export type Option<T> = Some<T> | None;

export interface Some<T> {
  isSome: true;
  value: T;
}

export interface None {
  isSome: false;
}

/**
 * Maybe type (nullable)
 */
export type Maybe<T> = T | null | undefined;

/**
 * Async result
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Callback types
 */
export type Callback<T = void> = (value: T) => void;
export type AsyncCallback<T = void> = (value: T) => Promise<void>;

/**
 * Event handler
 */
export type EventHandler<E = unknown> = (event: E) => void | Promise<void>;

/**
 * Predicate type
 */
export type Predicate<T = unknown> = (value: T) => boolean;

/**
 * Mapper type
 */
export type Mapper<T, U> = (value: T) => U;

/**
 * Reducer type
 */
export type Reducer<T, U> = (acc: U, value: T, index: number) => U;

/**
 * Compare function
 */
export type CompareFn<T> = (a: T, b: T) => number;

/**
 * Entity with ID
 */
export interface Entity<TId = UUID> {
  id: TId;
}

/**
 * Timestamped entity
 */
export interface Timestamped {
  createdAt: Date | string;
  updatedAt: Date | string;
}

/**
 * Soft deletable entity
 */
export interface SoftDeletable {
  deletedAt: Date | string | null;
}

/**
 * Auditable entity
 */
export interface Auditable {
  createdBy: UUID | null;
  updatedBy: UUID | null;
}

/**
 * Full entity with all audit fields
 */
export interface FullEntity<TId = UUID>
  extends Entity<TId>,
    Timestamped,
    SoftDeletable,
    Auditable {}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * Paginated result
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Sort parameters
 */
export interface SortParams<T = string> {
  field: T;
  direction: 'asc' | 'desc';
}

/**
 * Filter operator
 */
export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'notin'
  | 'contains'
  | 'startswith'
  | 'endswith'
  | 'null'
  | 'notnull';

/**
 * Filter condition
 */
export interface FilterCondition<T = string> {
  field: T;
  operator: FilterOperator;
  value?: unknown;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details: Record<string, unknown> | undefined;
  };
  meta: Record<string, unknown> | undefined;
}

/**
 * HTTP method
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

/**
 * Request headers
 */
export type Headers = Record<string, string>;

/**
 * JSON primitive types
 */
export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };
export type Json = JsonPrimitive | JsonArray | JsonObject;
