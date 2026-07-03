import { describe, it, expect } from 'vitest';
import { getEnvironment, isDevelopment, isTest, isProduction } from '../src/environments';

describe('environments', () => {
  it('should detect environment', () => {
    expect(typeof getEnvironment()).toBe('string');
  });

  it('should detect test environment', () => {
    expect(isDevelopment() || isTest() || isProduction()).toBe(true);
  });
});
