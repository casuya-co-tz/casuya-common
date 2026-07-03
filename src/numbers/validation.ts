/**
 * Number validation utilities
 */

/**
 * Check if value is a finite number
 */
export function isFinite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Check if value is a safe integer
 */
export function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value);
}
