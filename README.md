# @casuya/common

Shared utilities, types, and helpers for the Casuya ecosystem.

## Installation

### From GitHub (Recommended for Development)

```bash
# Latest from main branch
npm install casuya/casuya-common

# Specific tag/version
npm install casuya/casuya-common#v0.1.0

# Specific branch
npm install casuya/casuya-common#develop
```

### From npm (When Published)

```bash
npm install @casuya/common
```

## Features

- **Constants**: Application-wide constants, error codes, regex patterns
- **Errors**: Standardized error classes with detailed context
- **Utilities**: Date, string, number, array, and object helpers
- **Validators**: Input validation functions
- **Types**: Common TypeScript types and generics
- **Schemas**: Result/Option types and API response helpers
- **Configuration**: Config parsing and schema validation
- **Environments**: Environment variable access and runtime detection
- **Logging**: Flexible logging interface with transports
- **Interfaces**: Common interfaces (Repository, Cache, Queue, etc.)
- **Promises**: Async utilities (retry, parallel, waterfall, timeout)
- **Functions**: Function composition (pipe, compose, curry, memoize, debounce)
- **Collections**: Map and Set helpers (union, intersection, merge)
- **Crypto**: Basic crypto helpers (uuid, randomToken, hash, base64)

## Quick Start

```typescript
import { AppError, ValidationError, NotFoundError } from '@casuya/common/errors';
import { formatDate, relativeTime } from '@casuya/common/date';
import { capitalize, slugify } from '@casuya/common/strings';
import { unique, groupBy, chunk } from '@casuya/common/arrays';
import { deepClone, pick } from '@casuya/common/objects';
import { ok, err, apiSuccess } from '@casuya/common/schemas';
import { getEnvironment, isProduction } from '@casuya/common/environments';
import { retry, withTimeout, parallel } from '@casuya/common/promises';
import { compose, pipe, memoize } from '@casuya/common/functions';
import { setUnion, setIntersection, mapToObject } from '@casuya/common/collections';
import { uuid, randomToken, shortId } from '@casuya/common/crypto';
```

## Environments

```typescript
import { getEnvironment, isProduction, getEnvNumber } from '@casuya/common/environments';

const env = getEnvironment();
const port = getEnvNumber('PORT', 3000);
```

## Promises

```typescript
import { retry, withTimeout, parallel, mapSeries } from '@casuya/common/promises';

const result = await retry(() => fetchData(), { maxAttempts: 3 });
const data = await parallel(tasks, 5);
```

## Functions

```typescript
import { compose, pipe, memoize, once } from '@casuya/common/functions';

const process = compose(validate, transform, format);
const cached = memoize(expensiveOperation);
```

## Collections

```typescript
import { setUnion, setIntersection, mapToObject } from '@casuya/common/collections';

const combined = setUnion(setA, setB);
const obj = mapToObject(myMap);
```

## Crypto

```typescript
import { uuid, randomToken, shortId, simpleHash } from '@casuya/common/crypto';

const id = uuid();
const token = randomToken(32);
```

## Error Handling

```typescript
import { AppError, NotFoundError, ValidationError, ERROR_CODES } from '@casuya/common/errors';

// Custom error with details
const error = new AppError(
  ERROR_CODES.VALIDATION_FAILED,
  'Invalid input',
  400,
  { field: 'email' }
);

// Validation errors
const validationError = ValidationError.required('email');

// Not found
const notFound = new NotFoundError('User', '123');
```

## Result Type

```typescript
import { ok, err, isOk, mapResult } from '@casuya/common/schemas';

function divide(a: number, b: number): Result<number, Error> {
  if (b === 0) return err(new Error('Division by zero'));
  return ok(a / b);
}

const result = divide(10, 2);
if (isOk(result)) {
  console.log(result.value); // 5
}
```

## Validation

```typescript
import { validateRequired, validateEmail, validateString } from '@casuya/common/validators';

const nameResult = validateRequired(input.name, 'name');
const emailResult = validateEmail(input.email);
```

## Objects & Arrays

```typescript
import { pick, omit, deepMerge } from '@casuya/common/objects';
import { unique, groupBy, sortBy, chunk } from '@casuya/common/arrays';

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const safe = omit(user, ['password']);

const items = [1, 2, 2, 3, 3, 3];
const uniqueItems = unique(items); // [1, 2, 3]
```

## License

MIT
