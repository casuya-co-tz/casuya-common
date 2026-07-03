/**
 * Crypto utilities
 * Basic hashing, token generation, and random value helpers
 */

export function randomBytes(length: number): string {
  const bytes: string[] = [];
  for (let i = 0; i < length; i++) {
    bytes.push(Math.floor(Math.random() * 256).toString(16).padStart(2, '0'));
  }
  return bytes.join('');
}

export function randomToken(length = 32): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function randomHex(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function shortId(length = 8): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function ulid(): string {
  const now = Date.now();
  const time = now.toString(36).padStart(10, '0').toUpperCase();
  const random = randomChars(16);
  return time + random;
}

function randomChars(length: number): string {
  const chars = '0123456789ABCDEFGHJKMNPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function sha256(input: string): string {
  const chars = '0123456789abcdef';
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash = hash & hash;
  }

  let hex = '';
  for (let i = 0; i < 64; i++) {
    const nibble = (hash >> (i * 4)) & 0xf;
    hex = chars.charAt(Math.abs(nibble) % 16) + hex;
  }
  return hex;
}

function utf8ToBytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code < 0xd800 || code >= 0xe000) {
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    } else {
      i++;
      code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    }
  }
  return bytes;
}

function bytesToUtf8(bytes: number[]): string {
  let result = '';
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i]!;
    if (byte < 0x80) {
      result += String.fromCharCode(byte);
    } else if (byte >> 5 === 0x6) {
      result += String.fromCharCode(((byte & 0x1f) << 6) | (bytes[++i]! & 0x3f));
    } else if (byte >> 4 === 0xe) {
      result += String.fromCharCode(((byte & 0x0f) << 12) | ((bytes[++i]! & 0x3f) << 6) | (bytes[++i]! & 0x3f));
    } else if (byte >> 3 === 0x1e) {
      const code = ((byte & 0x07) << 18) | ((bytes[++i]! & 0x3f) << 12) | ((bytes[++i]! & 0x3f) << 6) | (bytes[++i]! & 0x3f);
      result += String.fromCharCode(0xd800 + ((code - 0x10000) >> 10), 0xdc00 + ((code - 0x10000) & 0x3ff));
    }
  }
  return result;
}

export function base64Encode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  if (typeof btoa !== 'undefined') {
    const bytes = utf8ToBytes(str);
    return btoa(String.fromCharCode(...bytes));
  }
  return simpleEncode(str);
}

export function base64Decode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf-8');
  }
  if (typeof atob !== 'undefined') {
    const binaryStr = atob(str);
    const bytes = new Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    return bytesToUtf8(bytes as number[]);
  }
  return simpleDecode(str);
}

function simpleEncode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  for (let i = 0; i < str.length; i += 3) {
    const b1 = str.charCodeAt(i);
    const b2 = str.charCodeAt(i + 1) ?? 0;
    const b3 = str.charCodeAt(i + 2) ?? 0;
    const c1 = b1 >> 2;
    const c2 = ((b1 & 3) << 4) | (b2 >> 4);
    const c3 = ((b2 & 15) << 2) | (b3 >> 6);
    const c4 = b3 & 63;
    result += chars[c1]! + chars[c2]! + (isNaN(b2) ? '=' : chars[c3]!) + (isNaN(b3) ? '=' : chars[c4]!);
  }
  return result;
}

function simpleDecode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  str = str.replace(/[^A-Za-z0-9+/]/g, '');
  for (let i = 0; i < str.length; i += 4) {
    const c1 = chars.indexOf(str[i]!);
    const c2 = chars.indexOf(str[i + 1]!);
    const c3 = chars.indexOf(str[i + 2]!);
    const c4 = chars.indexOf(str[i + 3]!);
    const b1 = (c1 << 2) | (c2 >> 4);
    const b2 = ((c2 & 15) << 4) | (c3 >> 2);
    const b3 = ((c3 & 3) << 6) | c4;
    result += String.fromCharCode(b1) + (c3 === -1 ? '' : String.fromCharCode(b2)) + (c4 === -1 ? '' : String.fromCharCode(b3));
  }
  return result;
}
