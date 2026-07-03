/**
 * Tests for number utilities
 */

import { describe, it, expect } from 'vitest';
import {
  clamp,
  inRange,
  isInteger,
  isEven,
  isOdd,
  isPositive,
  isNegative,
  isZero,
  round,
  ceil,
  floor,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatFileSize,
  percentage,
  average,
  sum,
  median,
  randomInt,
  lerp,
  mapRange,
} from '../src/numbers';

describe('Number validation', () => {
  describe('clamp', () => {
    it('clamps values within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('inRange', () => {
    it('checks if value is within range', () => {
      expect(inRange(5, 0, 10)).toBe(true);
      expect(inRange(0, 0, 10)).toBe(true);
      expect(inRange(10, 0, 10)).toBe(true);
      expect(inRange(-1, 0, 10)).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('identifies integers', () => {
      expect(isInteger(5)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(-10)).toBe(true);
      expect(isInteger(5.5)).toBe(false);
    });
  });

  describe('isEven/isOdd', () => {
    it('checks even numbers', () => {
      expect(isEven(4)).toBe(true);
      expect(isEven(5)).toBe(false);
      expect(isEven(0)).toBe(true);
    });

    it('checks odd numbers', () => {
      expect(isOdd(5)).toBe(true);
      expect(isOdd(4)).toBe(false);
      expect(isOdd(1)).toBe(true);
    });
  });
});

describe('Number properties', () => {
  it('checks positive', () => {
    expect(isPositive(5)).toBe(true);
    expect(isPositive(-5)).toBe(false);
    expect(isPositive(0)).toBe(false);
  });

  it('checks negative', () => {
    expect(isNegative(-5)).toBe(true);
    expect(isNegative(5)).toBe(false);
    expect(isNegative(0)).toBe(false);
  });

  it('checks zero', () => {
    expect(isZero(0)).toBe(true);
    expect(isZero(5)).toBe(false);
  });
});

describe('Rounding', () => {
  it('rounds to decimal places', () => {
    expect(round(3.14159, 2)).toBe(3.14);
    expect(round(3.14159, 4)).toBe(3.1416);
    expect(round(3.5, 0)).toBe(4);
  });

  it('rounds up', () => {
    expect(ceil(3.14159, 2)).toBe(3.15);
    expect(ceil(3.001, 2)).toBe(3.01);
  });

  it('rounds down', () => {
    expect(floor(3.14159, 2)).toBe(3.14);
    expect(floor(3.999, 2)).toBe(3.99);
  });
});

describe('Formatting', () => {
  it('formats numbers with locale', () => {
    expect(formatNumber(1000)).toBe('1,000');
    expect(formatNumber(1234567.89)).toContain('1');
  });

  it('formats currency', () => {
    const usd = formatCurrency(100);
    expect(usd).toContain('100');
    expect(usd).toContain('$');
  });

  it('formats percentages', () => {
    expect(formatPercent(50)).toBe('50%');
    expect(formatPercent(33.333, 2)).toBe('33.33%');
  });

  it('formats file sizes', () => {
    expect(formatFileSize(512)).toBe('512 B');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
    expect(formatFileSize(1073741824)).toBe('1 GB');
  });
});

describe('Statistics', () => {
  it('calculates percentage', () => {
    expect(percentage(25, 100)).toBe(25);
    expect(percentage(1, 3, 2)).toBe(33.33);
  });

  it('calculates sum', () => {
    expect(sum([1, 2, 3, 4, 5])).toBe(15);
    expect(sum([])).toBe(0);
  });

  it('calculates average', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
    expect(average([])).toBe(0);
  });

  it('calculates median', () => {
    expect(median([1, 2, 3, 4, 5])).toBe(3);
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBe(0);
  });
});

describe('Random', () => {
  it('generates random integers in range', () => {
    for (let i = 0; i < 100; i++) {
      const num = randomInt(1, 10);
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(10);
      expect(Number.isInteger(num)).toBe(true);
    }
  });
});

describe('Interpolation', () => {
  it('interpolates values', () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
    expect(lerp(0, 10, 0.25)).toBe(2.5);
  });

  it('clamp interpolation factor', () => {
    expect(lerp(0, 10, 2)).toBe(10);
    expect(lerp(0, 10, -1)).toBe(0);
  });

  it('maps between ranges', () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, 0, 10, 0, 100)).toBe(0);
    expect(mapRange(10, 0, 10, 0, 100)).toBe(100);
  });
});
