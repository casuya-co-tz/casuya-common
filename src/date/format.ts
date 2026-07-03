/**
 * Date utilities
 * Common date manipulation and formatting functions
 */

import { TIME } from '../constants';

/**
 * Create a date from various inputs
 */
export function toDate(input: Date | string | number): Date {
  if (input instanceof Date) return new Date(input);
  if (typeof input === 'number') return new Date(input);
  return new Date(input);
}

/**
 * Check if a date is valid
 */
export function isValidDate(date: Date | string | number): boolean {
  const d = toDate(date);
  return !isNaN(d.getTime());
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 */
export function formatDate(date: Date | string | number): string {
  return toDate(date).toISOString().split('T')[0] ?? '';
}

/**
 * Format date to ISO datetime string
 */
export function formatDateTime(date: Date | string | number): string {
  return toDate(date).toISOString();
}

/**
 * Format date to locale string
 */
export function formatLocale(
  date: Date | string | number,
  locale = 'en-US',
  options?: Intl.DateTimeFormatOptions
): string {
  return toDate(date).toLocaleDateString(locale, options);
}

/**
 * Format date to time string
 */
export function formatTime(
  date: Date | string | number,
  locale = 'en-US'
): string {
  return toDate(date).toLocaleTimeString(locale);
}

/**
 * Get the start of a day
 */
export function startOfDay(date: Date | string | number): Date {
  const d = toDate(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get the end of a day
 */
export function endOfDay(date: Date | string | number): Date {
  const d = toDate(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Get the start of a week
 */
export function startOfWeek(date: Date | string | number, startDay = 0): Date {
  const d = toDate(date);
  const day = d.getDay();
  const diff = (day - startDay + 7) % 7;
  d.setDate(d.getDate() - diff);
  return startOfDay(d);
}

/**
 * Get the end of a week
 */
export function endOfWeek(date: Date | string | number, startDay = 0): Date {
  const d = startOfWeek(date, startDay);
  d.setDate(d.getDate() + 6);
  return endOfDay(d);
}

/**
 * Get the start of a month
 */
export function startOfMonth(date: Date | string | number): Date {
  const d = toDate(date);
  d.setDate(1);
  return startOfDay(d);
}

/**
 * Get the end of a month
 */
export function endOfMonth(date: Date | string | number): Date {
  const d = toDate(date);
  d.setMonth(d.getMonth() + 1, 0);
  return endOfDay(d);
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string | number, days: number): Date {
  const d = toDate(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Add months to a date
 */
export function addMonths(date: Date | string | number, months: number): Date {
  const d = toDate(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

/**
 * Add years to a date
 */
export function addYears(date: Date | string | number, years: number): Date {
  const d = toDate(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

/**
 * Calculate difference in days between two dates
 */
export function diffInDays(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = startOfDay(date1);
  const d2 = startOfDay(date2);
  return Math.round((d1.getTime() - d2.getTime()) / TIME.DAY);
}

/**
 * Calculate difference in milliseconds
 */
export function diffInMs(date1: Date | string | number, date2: Date | string | number): number {
  return toDate(date1).getTime() - toDate(date2).getTime();
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  return toDate(date).getTime() < Date.now();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  return toDate(date).getTime() > Date.now();
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string | number): boolean {
  return formatDate(date) === formatDate(new Date());
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function relativeTime(
  date: Date | string | number,
  locale = 'en'
): string {
  const d = toDate(date);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const diff = d.getTime() - Date.now();
  const absDiff = Math.abs(diff);

  if (absDiff < TIME.MINUTE) {
    return rtf.format(Math.round(diff / TIME.SECOND), 'seconds');
  }
  if (absDiff < TIME.HOUR) {
    return rtf.format(Math.round(diff / TIME.MINUTE), 'minutes');
  }
  if (absDiff < TIME.DAY) {
    return rtf.format(Math.round(diff / TIME.HOUR), 'hours');
  }
  if (absDiff < TIME.WEEK) {
    return rtf.format(Math.round(diff / TIME.DAY), 'days');
  }
  if (absDiff < TIME.MONTH) {
    return rtf.format(Math.round(diff / TIME.WEEK), 'weeks');
  }
  if (absDiff < TIME.YEAR) {
    return rtf.format(Math.round(diff / TIME.MONTH), 'months');
  }
  return rtf.format(Math.round(diff / TIME.YEAR), 'years');
}

/**
 * Check if date is on a weekend
 */
export function isWeekend(date: Date | string | number): boolean {
  const d = toDate(date);
  const day = d.getDay();
  return day === 0 || day === 6;
}

/**
 * Check if a year is a leap year
 */
export function isLeapYear(date: Date | string | number): boolean {
  const year = toDate(date).getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get number of days in a month
 */
export function daysInMonth(date: Date | string | number): number {
  const d = toDate(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/**
 * Format a date as a relative concise string (e.g., "today", "yesterday", "3d ago")
 */
export function formatRelative(date: Date | string | number): string {
  const d = toDate(date);
  const now = new Date();
  const diff = startOfDay(now).getTime() - startOfDay(d).getTime();
  const days = Math.round(diff / TIME.DAY);

  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/**
 * Count business days between two dates (excluding weekends)
 */
export function businessDays(
  start: Date | string | number,
  end: Date | string | number
): number {
  const d1 = startOfDay(start);
  const d2 = startOfDay(end);
  let count = 0;
  const current = new Date(d1);

  while (current <= d2) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }

  return count;
}

/**
 * Get the ordinal suffix for a day (e.g., "st", "nd", "rd", "th")
 */
export function dayOrdinal(date: Date | string | number): string {
  const day = toDate(date).getDate();
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/**
 * Get the quarter of the year (1-4)
 */
export function quarter(date: Date | string | number): number {
  return Math.floor(toDate(date).getMonth() / 3) + 1;
}

/**
 * Get the ISO week number
 */
export function weekNumber(date: Date | string | number): number {
  const d = toDate(date);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const diff = d.getTime() - startOfYear.getTime();
  return Math.ceil((diff / TIME.DAY + startOfYear.getDay() + 1) / 7);
}
