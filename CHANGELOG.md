# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-07-03

### Added
- **Environments**: Standalone module for runtime environment detection and env var access
- **Promises**: Async helpers (retry, parallel, mapSeries, waterfall, timeout, delay, defer)
- **Functions**: Function composition utilities (compose, pipe, curry, once, tap, negate, memoize, throttle, debounce, partial, flip)
- **Collections**: Map helpers (merge, filter, map, toObject) and Set helpers (union, intersection, difference, subset, equals)
- **Crypto**: Basic crypto utilities (uuid, ulid, randomToken, shortId, simpleHash, base64, randomHex)
- **Date**: isWeekend, isLeapYear, daysInMonth, formatRelative, businessDays, dayOrdinal, quarter, weekNumber
- **Numbers**: variance, stdDeviation, mode, gcd, lcm, factorial, binomial, isPrime, mean, geometricMean, toRadians, toDegrees
- **Objects**: invert, renameKeys, defaults, deepDiff, deepOmit, deepPick
- **Strings**: countOccurrences, mask, reverseWords, isPalindrome, isAscii, toBoolean, reverse, toConstantCase, toDotCase, toPathCase, isValidJson, stripHtml, truncateWords
- **Arrays**: range, fill, rotate, sampleWeighted, includesAny, includesAll, mostFrequent, splitAt, initial, tail, compact, toggle, swap, times, differenceBy, intersectionBy, unionBy

### Changed
- Extracted environment helpers from `configuration` into standalone `environments` module
- Moved function utilities (memoize, debounce, throttle, pipe, compose, curry) to `functions` module
- Moved async utilities (sleep, retry, withTimeout, parallel) to `promises` module
- Moved uuid/ulid to `crypto` module
- Backward compatibility maintained via re-exports in `utilities` module

## [0.1.0] - 2026-07-03

### Added
- Initial release
- **Constants**: App constants, error codes, regex patterns
- **Errors**: AppError, ValidationError, NotFoundError, DatabaseError, FileError, HttpError
- **Utilities**: Date formatting, string case conversion, array/object helpers
- **Validators**: Email, URL, UUID, required field validation
- **Types**: Common TypeScript types and generics
- **Schemas**: Result/Option types, API response helpers
- **Configuration**: Environment and config utilities
- **Logging**: Flexible logging interface
- **Interfaces**: Repository, Cache, Queue, Storage interfaces

### Installation
Available via GitHub installation:
```bash
npm install casuya/casuya-common#v0.1.0
```
