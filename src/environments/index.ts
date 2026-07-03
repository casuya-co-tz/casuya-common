/**
 * Environment utilities
 * Standalone helpers for detecting runtime environment
 */

export type Environment = 'development' | 'test' | 'staging' | 'production';

function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
}

export function getEnvironment(): Environment {
  const env = getEnv('NODE_ENV') || getEnv('ENVIRONMENT') || 'development';
  if (env === 'test') return 'test';
  if (env === 'staging') return 'staging';
  if (env === 'production') return 'production';
  return 'development';
}

export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

export function isTest(): boolean {
  return getEnvironment() === 'test';
}

export function isStaging(): boolean {
  return getEnvironment() === 'staging';
}

export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

export function isDebug(): boolean {
  const value = getEnv('DEBUG');
  if (value === undefined || value === '') return false;
  const lower = value.toLowerCase();
  return lower === 'true' || lower === '1' || lower === 'yes';
}

export function getRequiredEnv(key: string): string {
  const value = getEnv(key);
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function getOptionalEnv(key: string, defaultValue?: string): string | undefined {
  const value = getEnv(key);
  return value ?? defaultValue;
}

export function getEnvString(key: string, defaultValue: string): string {
  return getOptionalEnv(key) ?? defaultValue;
}

export function getEnvNumber(key: string, defaultValue: number): number {
  const value = getEnv(key);
  if (value === undefined || value === '') return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function getEnvFloat(key: string, defaultValue: number): number {
  const value = getEnv(key);
  if (value === undefined || value === '') return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function getEnvBoolean(key: string, defaultValue: boolean): boolean {
  const value = getEnv(key);
  if (value === undefined || value === '') return defaultValue;
  const lower = value.toLowerCase();
  return lower === 'true' || lower === '1' || lower === 'yes';
}

export function getEnvArray(key: string, defaultValue: string[] = []): string[] {
  const value = getEnv(key);
  if (value === undefined || value === '') return defaultValue;
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}
