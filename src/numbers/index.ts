/**
 * Number utilities
 * Common number manipulation functions
 */

import { isFinite as isFiniteNumber } from './validation';

/**
 * Clamp a number within a range
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if number is within range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Check if number is an integer
 */
export function isInteger(value: number): boolean {
  return Number.isInteger(value);
}

/**
 * Check if number is a float (not integer)
 */
export function isFloat(value: number): boolean {
  return isFiniteNumber(value) && !Number.isInteger(value);
}

/**
 * Check if number is even
 */
export function isEven(value: number): boolean {
  return value % 2 === 0;
}

/**
 * Check if number is odd
 */
export function isOdd(value: number): boolean {
  return Math.abs(value % 2) === 1;
}

/**
 * Check if number is positive
 */
export function isPositive(value: number): boolean {
  return value > 0;
}

/**
 * Check if number is negative
 */
export function isNegative(value: number): boolean {
  return value < 0;
}

/**
 * Check if number is zero
 */
export function isZero(value: number): boolean {
  return value === 0;
}

/**
 * Get the sign of a number (-1, 0, or 1)
 */
export function sign(value: number): -1 | 0 | 1 {
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}

/**
 * Round to specified decimal places
 */
export function round(value: number, decimals = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Round up to specified decimal places
 */
export function ceil(value: number, decimals = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.ceil(value * factor) / factor;
}

/**
 * Round down to specified decimal places
 */
export function floor(value: number, decimals = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
}

/**
 * Format number with thousands separator
 */
export function formatNumber(value: number, locale = 'en-US'): string {
  return value.toLocaleString(locale);
}

/**
 * Format as currency
 */
export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}

/**
 * Format as percentage
 */
export function formatPercent(value: number, decimals = 0, locale = 'en-US'): string {
  return (value / 100).toLocaleString(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${round(value, decimals)} ${units[unitIndex]}`;
}

/**
 * Calculate percentage
 */
export function percentage(value: number, total: number, decimals = 2): number {
  if (total === 0) return 0;
  return round((value / total) * 100, decimals);
}

/**
 * Calculate average
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Calculate sum
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

/**
 * Calculate median
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid] ?? 0
    : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
}

/**
 * Get random integer in range (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random float in range
 */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * Constrain value to step increments
 */
export function snapToStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

/**
 * Calculate the variance of a set of numbers
 */
export function variance(numbers: number[], sample = false): number {
  if (numbers.length < 2) return 0;
  const avg = average(numbers);
  const squaredDiffs = numbers.map((n) => Math.pow(n - avg, 2));
  const divisor = sample ? numbers.length - 1 : numbers.length;
  return sum(squaredDiffs) / divisor;
}

/**
 * Calculate the standard deviation
 */
export function stdDeviation(numbers: number[], sample = false): number {
  return Math.sqrt(variance(numbers, sample));
}

/**
 * Find the mode (most frequent value)
 */
export function mode(numbers: number[]): number[] {
  if (numbers.length === 0) return [];
  const freq = new Map<number, number>();
  for (const n of numbers) {
    freq.set(n, (freq.get(n) ?? 0) + 1);
  }
  const maxFreq = Math.max(...freq.values());
  return [...freq.entries()]
    .filter(([_, count]) => count === maxFreq)
    .map(([num]) => num);
}

/**
 * Greatest common divisor using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Least common multiple
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/**
 * Calculate factorial
 */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Calculate n choose k (binomial coefficient)
 */
export function binomial(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= k; i++) {
    result = (result * (n - k + i)) / i;
  }
  return result;
}

/**
 * Check if a number is prime
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Calculate the mean (alias for average)
 */
export function mean(numbers: number[]): number {
  return average(numbers);
}

/**
 * Calculate geometric mean
 */
export function geometricMean(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.some((n) => n <= 0)) return 0;
  const product = numbers.reduce((acc, n) => acc * n, 1);
  return Math.pow(product, 1 / numbers.length);
}

/**
 * Convert degrees to radians
 */
export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert radians to degrees
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}
