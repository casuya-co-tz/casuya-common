/**
 * Application-wide constants
 * Generic values used across the Casuya ecosystem
 */

export const APP = {
  NAME: 'casuya',
  VERSION: '1.0.0',
  DESCRIPTION: 'Educational platform infrastructure',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

export const LIMITS = {
  PAGE_SIZE_DEFAULT: 20,
  PAGE_SIZE_MAX: 100,
  STRING_MAX_LENGTH: 10000,
  ARRAY_MAX_LENGTH: 10000,
  FILE_NAME_MAX_LENGTH: 255,
  ID_MAX_LENGTH: 64,
} as const;

export const MIME_TYPES = {
  JSON: 'application/json',
  FormData: 'multipart/form-data',
  TEXT: 'text/plain',
  HTML: 'text/html',
  XML: 'application/xml',
  PDF: 'application/pdf',
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  WEBP: 'image/webp',
  SVG: 'image/svg+xml',
  MP4: 'video/mp4',
  WEBM: 'video/webm',
  MP3: 'audio/mpeg',
  WAV: 'audio/wav',
} as const;
