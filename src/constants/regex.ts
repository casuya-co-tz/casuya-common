/**
 * Regular expression patterns
 * Common validation patterns used throughout the ecosystem
 */

export const PATTERNS = {
  // Identity patterns
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  ULID: /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/,

  // Contact patterns
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_INTERNATIONAL: /^\+[1-9]\d{1,14}$/,
  PHONE_SIMPLE: /^\+?[\d\s-()]{7,20}$/,

  // Web patterns
  URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
  URL_STRICT: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  DOMAIN: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,

  // String patterns
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHABETIC: /^[a-zA-Z]+$/,
  NUMERIC: /^[0-9]+$/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
  PASSWORD_STRENGTH: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,

  // Date patterns
  ISO_DATE: /^\d{4}-\d{2}-\d{2}$/,
  ISO_DATETIME: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?$/,
  TIME_24H: /^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/,
  YEAR: /^\d{4}$/,

  // Code patterns
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  SEMANTIC_VERSION: /^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/,
  SEMVER_RANGE: /^[\^~]?\d+(\.\d+)?(\.\d+)?(-[a-zA-Z0-9.-]+)?$/,

  // File patterns
  FILE_EXTENSION: /\.[0-9a-z]+$/i,
  IMAGE_EXTENSION: /\.(jpe?g|png|gif|webp|svg|bmp|ico)$/i,
  VIDEO_EXTENSION: /\.(mp4|webm|mov|avi|mkv)$/i,
  AUDIO_EXTENSION: /\.(mp3|wav|ogg|aac|flac)$/i,
  DOCUMENT_EXTENSION: /\.(pdf|docx?|xlsx?|pptx?|txt|rtf)$/i,

  // Whitespace patterns
  WHITESPACE: /\s+/,
  TRIM_WHITESPACE: /^\s+|\s+$/g,
  MULTI_NEWLINE: /\n{2,}/g,

  // Special patterns
  HTML_TAG: /<[^>]+>/g,
  HTML_ENTITY: /&[^;]+;/g,
  CAMEL_CASE: /^[a-z][a-zA-Z0-9]*$/,
  PASCAL_CASE: /^[A-Z][a-zA-Z0-9]*$/,
  SNAKE_CASE: /^[a-z][a-z0-9_]*$/,
  KEBAB_CASE: /^[a-z][a-z0-9-]*$/,
} as const;

export const LOCALE_PATTERNS = {
  LOCALE: /^[a-z]{2}(-[A-Z]{2})?$/,
  LANGUAGE_CODE: /^[a-z]{2}$/,
  COUNTRY_CODE: /^[A-Z]{2}$/,
  CURRENCY: /^[A-Z]{3}$/,
} as const;
