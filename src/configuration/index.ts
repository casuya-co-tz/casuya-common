/**
 * Configuration helpers
 * Configuration parsing and validation utilities
 */
// Environment helpers are available from @casuya/common/environments

import { isString, isNumber, isBoolean } from '../validators';
import {
  getRequiredEnv,
  getOptionalEnv,
  getEnvString,
  getEnvNumber,
  getEnvFloat,
  getEnvBoolean,
  getEnvArray,
  type Environment,
  getEnvironment,
  isDevelopment,
  isTest,
  isStaging,
  isProduction,
  isDebug,
} from '../environments';

export {
  getRequiredEnv,
  getOptionalEnv,
  getEnvString,
  getEnvNumber,
  getEnvFloat,
  getEnvBoolean,
  getEnvArray,
  type Environment,
  getEnvironment,
  isDevelopment,
  isTest,
  isStaging,
  isProduction,
  isDebug,
};

/**
 * Configuration schema type
 */
export type ConfigSchema = Record<string, ConfigValue>;

export interface ConfigValue {
  type: 'string' | 'number' | 'boolean' | 'array';
  required?: boolean;
  default?: unknown;
  min?: number;
  max?: number;
  values?: unknown[];
  description?: string;
}

/**
 * Parse configuration from environment using schema
 */
export function parseConfig<T extends ConfigSchema>(schema: T): Record<keyof T, unknown> {
  const config: Record<string, unknown> = {};

  for (const [key, spec] of Object.entries(schema)) {
    const value = getOptionalEnv(key);

    if (value === undefined || value === '') {
      if (spec.required) {
        throw new Error(`Missing required configuration: ${key}`);
      }
      config[key] = spec.default;
      continue;
    }

    switch (spec.type) {
      case 'string':
        if (spec.values && !spec.values.includes(value)) {
          throw new Error(
            `Invalid value for ${key}: ${value}. Must be one of: ${spec.values.join(', ')}`
          );
        }
        config[key] = value;
        break;
      case 'number': {
        const num = parseFloat(value);
        if (isNaN(num)) {
          throw new Error(`Invalid number for ${key}: ${value}`);
        }
        if (spec.min !== undefined && num < spec.min) {
          throw new Error(`${key} must be at least ${spec.min}`);
        }
        if (spec.max !== undefined && num > spec.max) {
          throw new Error(`${key} must be at most ${spec.max}`);
        }
        config[key] = num;
        break;
      }
      case 'boolean': {
        const lower = value.toLowerCase();
        config[key] = lower === 'true' || lower === '1' || lower === 'yes';
        break;
      }
      case 'array': {
        const arr = value.split(',').map((s) => s.trim()).filter(Boolean);
        if (spec.min !== undefined && arr.length < spec.min) {
          throw new Error(`${key} must have at least ${spec.min} items`);
        }
        if (spec.max !== undefined && arr.length > spec.max) {
          throw new Error(`${key} must have at most ${spec.max} items`);
        }
        config[key] = arr;
        break;
      }
    }
  }

  return config as Record<keyof T, unknown>;
}

/**
 * Validate configuration against schema
 */
export function validateConfig<T extends ConfigSchema>(
  config: Record<string, unknown>,
  schema: T
): void {
  for (const [key, spec] of Object.entries(schema)) {
    const value = config[key];

    if (value === undefined || value === null) {
      if (spec.required) {
        throw new Error(`Missing required configuration: ${key}`);
      }
      continue;
    }

    switch (spec.type) {
      case 'string':
        if (!isString(value)) {
          throw new Error(`${key} must be a string`);
        }
        if (spec.values && !spec.values.includes(value)) {
          throw new Error(
            `Invalid value for ${key}: ${value}. Must be one of: ${spec.values.join(', ')}`
          );
        }
        break;
      case 'number':
        if (!isNumber(value)) {
          throw new Error(`${key} must be a number`);
        }
        if (spec.min !== undefined && value < spec.min) {
          throw new Error(`${key} must be at least ${spec.min}`);
        }
        if (spec.max !== undefined && value > spec.max) {
          throw new Error(`${key} must be at most ${spec.max}`);
        }
        break;
      case 'boolean':
        if (!isBoolean(value)) {
          throw new Error(`${key} must be a boolean`);
        }
        break;
      case 'array':
        if (!Array.isArray(value)) {
          throw new Error(`${key} must be an array`);
        }
        break;
    }
  }
}

/**
 * Deep freeze configuration object
 */
export function freezeConfig<T extends Record<string, unknown>>(config: T): Readonly<T> {
  Object.freeze(config);
  for (const key of Object.keys(config)) {
    const value = config[key];
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      freezeConfig(value as Record<string, unknown>);
    }
  }
  return config;
}
