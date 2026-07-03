/**
 * Schema validation utilities
 * Runtime type checking helpers
 */

import type {
  ApiResponse,
  PaginatedResult,
  PaginationParams,
  Result,
  Option,
  Some,
  None,
} from '../types';

/**
 * Create a success result
 */
export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

/**
 * Create a failure result
 */
export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

/**
 * Create a Some option
 */
export function some<T>(value: T): Some<T> {
  return { isSome: true, value };
}

/**
 * Create a None option
 */
export function none(): None {
  return { isSome: false };
}

/**
 * Check if result is success
 */
export function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
  return result.ok === true;
}

/**
 * Check if result is failure
 */
export function isErr<T, E>(result: Result<T, E>): result is { ok: false; error: E } {
  return result.ok === false;
}

/**
 * Check if option is Some
 */
export function isSome<T>(option: Option<T>): option is Some<T> {
  return option.isSome === true;
}

/**
 * Check if option is None
 */
export function isNone<T>(option: Option<T>): option is None {
  return option.isSome === false;
}

/**
 * Map over a result
 */
export function mapResult<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  return result.ok ? ok(fn(result.value)) : result;
}

/**
 * Map over an error
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  return result.ok ? result : err(fn(result.error));
}

/**
 * Chain results
 */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  return result.ok ? fn(result.value) : result;
}

/**
 * Unwrap a result or provide default
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return result.ok ? result.value : defaultValue;
}

/**
 * Unwrap a result or throw
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) return result.value;
  throw result.error instanceof Error
    ? result.error
    : new Error(String(result.error));
}

/**
 * Create successful API response
 */
export function apiSuccess<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: meta ?? undefined,
  };
  return response;
}

/**
 * Create error API response
 */
export function apiError(
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiResponse<never> {
  const response: ApiResponse<never> = {
    success: false,
    error: { code, message, details: details ?? undefined },
    meta: undefined,
  };
  return response;
}

/**
 * Create paginated result
 */
export function paginated<T>(
  data: T[],
  params: PaginationParams,
  totalItems: number
): PaginatedResult<T> {
  const totalPages = Math.ceil(totalItems / params.pageSize);
  return {
    data,
    pagination: {
      page: params.page,
      pageSize: params.pageSize,
      totalItems,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}

/**
 * Type guard for checking if value has a property
 */
export function hasProperty<K extends string>(
  value: unknown,
  key: K
): value is Record<K, unknown> {
  return typeof value === 'object' && value !== null && key in value;
}

/**
 * Type guard for checking if value is an array of a specific type
 */
export function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

/**
 * Assert never for exhaustive checking
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

/**
 * Exhaustive check for union types
 */
export function exhaustive(_: never): void {
  // This function ensures all cases are handled
}
