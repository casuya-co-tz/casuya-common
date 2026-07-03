/**
 * String utilities
 * Common string manipulation functions
 */

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Lowercase first letter
 */
export function uncapitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Convert to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char: string) => char.toUpperCase());
}

/**
 * Convert to PascalCase
 */
export function toPascalCase(str: string): string {
  return capitalize(toCamelCase(str));
}

/**
 * Convert to snake_case
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_|_$/g, '');
}

/**
 * Convert to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase()
    .replace(/^-|-$/g, '');
}

/**
 * Convert to Title Case
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char: string) => ' ' + char.toUpperCase())
    .replace(/^./, (char: string) => char.toUpperCase());
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number, ellipsis = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Remove leading/trailing whitespace
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Remove extra whitespace
 */
export function normalizeWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Check if string is empty or whitespace only
 */
export function isEmpty(str: string): boolean {
  return str.trim().length === 0;
}

/**
 * Check if string starts with a prefix
 */
export function startsWith(str: string, prefix: string): boolean {
  return str.startsWith(prefix);
}

/**
 * Check if string ends with a suffix
 */
export function endsWith(str: string, suffix: string): boolean {
  return str.endsWith(suffix);
}

/**
 * Remove prefix from string
 */
export function removePrefix(str: string, prefix: string): string {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}

/**
 * Remove suffix from string
 */
export function removeSuffix(str: string, suffix: string): string {
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
}

/**
 * Pad string to length
 */
export function padLeft(str: string, length: number, char = ' '): string {
  return str.padStart(length, char);
}

/**
 * Pad string to length on right
 */
export function padRight(str: string, length: number, char = ' '): string {
  return str.padEnd(length, char);
}

/**
 * Generate a random string
 */
export function randomString(length = 16, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Generate a slug from a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Escape HTML entities
 */
export function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char] ?? char);
}

/**
 * Unescape HTML entities
 */
export function unescapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x27;': "'",
    '&#x2F;': '/',
  };
  return str.replace(/&[^;]+;/g, (entity) => htmlEntities[entity] ?? entity);
}

/**
 * Template string replacement
 */
export function template(str: string, values: Record<string, string | number>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(values[key] ?? `{{${key}}}`));
}

/**
 * Split string into chunks of specified size
 */
export function chunk(str: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

/**
 * Count occurrences of a substring
 */
export function countOccurrences(str: string, substr: string): number {
  if (substr.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substr, pos)) !== -1) {
    count++;
    pos += substr.length;
  }
  return count;
}

/**
 * Mask a portion of a string (e.g., credit card, email)
 */
export function mask(
  str: string,
  options?: { visibleStart?: number; visibleEnd?: number; char?: string }
): string {
  const visibleStart = options?.visibleStart ?? 4;
  const visibleEnd = options?.visibleEnd ?? 0;
  const char = options?.char ?? '*';

  if (str.length <= visibleStart + visibleEnd) {
    return str;
  }

  const start = str.slice(0, visibleStart);
  const end = visibleEnd > 0 ? str.slice(-visibleEnd) : '';
  const masked = char.repeat(str.length - visibleStart - visibleEnd);

  return start + masked + end;
}

/**
 * Reverse the words in a string
 */
export function reverseWords(str: string): string {
  return str.split(/\s+/).reverse().join(' ');
}

/**
 * Check if a string is a palindrome
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Check if string contains only ASCII characters
 */
export function isAscii(str: string): boolean {
  return /^[\x00-\x7F]*$/.test(str);
}

/**
 * Convert string to boolean
 */
export function toBoolean(str: string): boolean {
  const lower = str.toLowerCase().trim();
  return lower === 'true' || lower === '1' || lower === 'yes';
}

/**
 * Reverse a string
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Convert to constant case (UPPER_SNAKE_CASE)
 */
export function toConstantCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toUpperCase()
    .replace(/^_|_$/g, '');
}

/**
 * Convert to dot.case
 */
export function toDotCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .replace(/[^a-zA-Z0-9]+/g, '.')
    .toLowerCase()
    .replace(/^\.|\.$/g, '');
}

/**
 * Convert to path/case
 */
export function toPathCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1/$2')
    .replace(/[^a-zA-Z0-9]+/g, '/')
    .toLowerCase()
    .replace(/^\/|\/$/g, '');
}

/**
 * Check if string is a valid JSON
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Repeat a string n times
 */
export function repeat(str: string, times: number): string {
  return str.repeat(times);
}

/**
 * Strip all HTML tags from string
 */
export function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Truncate string at word boundary
 */
export function truncateWords(str: string, maxWords: number, ellipsis = '...'): string {
  const words = str.split(/\s+/);
  if (words.length <= maxWords) return str;
  return words.slice(0, maxWords).join(' ') + ellipsis;
}
