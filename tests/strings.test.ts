/**
 * Tests for string utilities
 */

import { describe, it, expect } from 'vitest';
import {
  capitalize,
  uncapitalize,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toTitleCase,
  truncate,
  isEmpty,
  removePrefix,
  removeSuffix,
  randomString,
  slugify,
  escapeHtml,
  unescapeHtml,
  template,
  chunk,
} from '../src/strings';

describe('String case transformations', () => {
  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('WORLD');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('uncapitalize', () => {
    it('lowercases first letter', () => {
      expect(uncapitalize('Hello')).toBe('hello');
      expect(uncapitalize('WORLD')).toBe('wORLD');
    });
  });

  describe('toCamelCase', () => {
    it('converts kebab-case to camelCase', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
      expect(toCamelCase('user-first-name')).toBe('userFirstName');
    });

    it('converts snake_case to camelCase', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
    });

    it('handles spaces', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
    });
  });

  describe('toPascalCase', () => {
    it('converts to PascalCase', () => {
      expect(toPascalCase('hello-world')).toBe('HelloWorld');
      expect(toPascalCase('user_first_name')).toBe('UserFirstName');
    });
  });

  describe('toSnakeCase', () => {
    it('converts camelCase to snake_case', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('userFirstName')).toBe('user_first_name');
    });

    it('converts kebab-case to snake_case', () => {
      expect(toSnakeCase('hello-world')).toBe('hello_world');
    });
  });

  describe('toKebabCase', () => {
    it('converts camelCase to kebab-case', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('userFirstName')).toBe('user-first-name');
    });
  });

  describe('toTitleCase', () => {
    it('converts to Title Case', () => {
      expect(toTitleCase('hello-world')).toBe('Hello World');
      expect(toTitleCase('user_first_name')).toBe('User First Name');
    });
  });
});

describe('String manipulation', () => {
  describe('truncate', () => {
    it('truncates long strings', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
      expect(truncate('Hello World', 5, '...')).toBe('He...');
    });

    it('returns original if shorter than max', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });
  });

  describe('isEmpty', () => {
    it('returns true for empty or whitespace strings', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
      expect(isEmpty('\t\n')).toBe(true);
    });

    it('returns false for non-empty strings', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty('  hello  ')).toBe(false);
    });
  });

  describe('removePrefix', () => {
    it('removes prefix if present', () => {
      expect(removePrefix('https://example.com', 'https://')).toBe('example.com');
      expect(removePrefix('prefix-value', 'prefix-')).toBe('value');
    });

    it('returns original if prefix not present', () => {
      expect(removePrefix('hello', 'world')).toBe('hello');
    });
  });

  describe('removeSuffix', () => {
    it('removes suffix if present', () => {
      expect(removeSuffix('file.txt', '.txt')).toBe('file');
      expect(removeSuffix('value-end', '-end')).toBe('value');
    });

    it('returns original if suffix not present', () => {
      expect(removeSuffix('hello', 'world')).toBe('hello');
    });
  });
});

describe('Slug generation', () => {
  it('creates slugs from strings', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('User First Name')).toBe('user-first-name');
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('handles special characters', () => {
    expect(slugify('Hello @World!')).toBe('hello-world');
    expect(slugify('User\'s Name')).toBe('users-name');
  });
});

describe('HTML utilities', () => {
  describe('escapeHtml', () => {
    it('escapes HTML characters', () => {
      expect(escapeHtml('<div>"Hello" & \'World\'</div>')).toBe(
        '&lt;div&gt;&quot;Hello&quot; &amp; &#39;World&#39;&lt;/div&gt;'
      );
    });
  });

  describe('unescapeHtml', () => {
    it('unescapes HTML entities', () => {
      expect(unescapeHtml('&lt;div&gt;Hello&lt;/div&gt;')).toBe('<div>Hello</div>');
    });
  });
});

describe('template', () => {
  it('replaces template variables', () => {
    expect(template('Hello {{name}}!', { name: 'World' })).toBe('Hello World!');
    expect(template('{{greeting}} {{name}}', { greeting: 'Hi', name: 'User' })).toBe('Hi User');
  });
});

describe('randomString', () => {
  it('generates random string of specified length', () => {
    expect(randomString(10).length).toBe(10);
    expect(randomString(20).length).toBe(20);
  });

  it('generates different strings', () => {
    const str1 = randomString(16);
    const str2 = randomString(16);
    expect(str1).not.toBe(str2);
  });
});

describe('chunk', () => {
  it('splits string into chunks', () => {
    expect(chunk('abcdefgh', 3)).toEqual(['abc', 'def', 'gh']);
    expect(chunk('hello', 2)).toEqual(['he', 'll', 'o']);
  });
});
