import { describe, it, expect } from 'vitest';
import { uuid, ulid, randomToken, randomHex, shortId, simpleHash, base64Encode, base64Decode } from '../src/crypto';

describe('crypto', () => {
  describe('uuid', () => {
    it('should generate a valid UUID v4', () => {
      const id = uuid();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    it('should generate unique values', () => {
      const ids = new Set(Array.from({ length: 100 }, () => uuid()));
      expect(ids.size).toBe(100);
    });
  });

  describe('ulid', () => {
    it('should generate a valid ULID', () => {
      const id = ulid();
      expect(id).toMatch(/^[0-9A-Z]{26}$/);
    });

    it('should produce monotonically non-decreasing IDs', () => {
      const ids = Array.from({ length: 10 }, () => ulid());
      for (const id of ids) {
        expect(id).toMatch(/^[0-9A-Z]{26}$/);
      }
      const timeParts = ids.map(id => id.substring(0, 10));
      for (let i = 1; i < timeParts.length; i++) {
        expect(timeParts[i]! >= timeParts[i - 1]!).toBe(true);
      }
    });
  });

  describe('randomToken', () => {
    it('should generate token of specified length', () => {
      expect(randomToken(32)).toHaveLength(32);
      expect(randomToken(16)).toHaveLength(16);
    });

    it('should use default length of 32', () => {
      expect(randomToken()).toHaveLength(32);
    });

    it('should only contain alphanumeric characters', () => {
      const token = randomToken(100);
      expect(token).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });

  describe('randomHex', () => {
    it('should generate hex string of specified length', () => {
      expect(randomHex(16)).toHaveLength(16);
      expect(randomHex(8)).toMatch(/^[0-9a-f]+$/);
    });
  });

  describe('shortId', () => {
    it('should generate id of specified length', () => {
      expect(shortId(8)).toHaveLength(8);
      expect(shortId()).toHaveLength(8);
    });

    it('should only contain alphanumeric characters', () => {
      const id = shortId(50);
      expect(id).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });

  describe('simpleHash', () => {
    it('should return consistent results', () => {
      expect(simpleHash('hello')).toBe(simpleHash('hello'));
    });

    it('should return different results for different inputs', () => {
      expect(simpleHash('hello')).not.toBe(simpleHash('world'));
    });

    it('should return a positive number', () => {
      expect(simpleHash('test')).toBeGreaterThanOrEqual(0);
    });
  });

  describe('base64Encode/Decode', () => {
    it('should encode and decode strings', () => {
      const original = 'hello world';
      const encoded = base64Encode(original);
      const decoded = base64Decode(encoded);
      expect(decoded).toBe(original);
    });

    it('should handle unicode strings', () => {
      const original = 'héllo wörld 🎉';
      const encoded = base64Encode(original);
      const decoded = base64Decode(encoded);
      expect(decoded).toBe(original);
    });

    it('should round-trip empty string', () => {
      const original = '';
      const encoded = base64Encode(original);
      const decoded = base64Decode(encoded);
      expect(decoded).toBe(original);
    });
  });
});
