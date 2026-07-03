/**
 * Logging interface
 * Abstract logging with pluggable transports
 */

/**
 * Log level
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
} as const;

/**
 * Log entry structure
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context: string | undefined;
  data: Record<string, unknown> | undefined;
  error: Error | undefined;
  [key: string]: unknown;
}

/**
 * Logger interface
 */
export interface Logger {
  debug(message: string, data?: Record<string, unknown>): void;
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, error?: Error | Record<string, unknown>): void;
  fatal(message: string, error?: Error | Record<string, unknown>): void;
  withContext(context: string): Logger;
  child(options?: { context?: string }): Logger;
}

/**
 * Transport interface for log output
 */
export interface LogTransport {
  log(entry: LogEntry): void | Promise<void>;
}

/**
 * Formatter interface
 */
export type LogFormatter = (entry: LogEntry) => string;

/**
 * Console transport
 */
export class ConsoleTransport implements LogTransport {
  constructor(
    private readonly formatter: LogFormatter = defaultFormatter
  ) {}

  log(entry: LogEntry): void {
    const output = this.formatter(entry);
    switch (entry.level) {
      case 'debug':
        console.debug(output);
        break;
      case 'info':
        console.info(output);
        break;
      case 'warn':
        console.warn(output);
        break;
      case 'error':
      case 'fatal':
        console.error(output);
        break;
    }
  }
}

/**
 * JSON transport for structured logging
 */
export class JsonTransport implements LogTransport {
  log(entry: LogEntry): void {
    const output = JSON.stringify({
      ...entry,
      timestamp: entry.timestamp.toISOString(),
      error: entry.error
        ? {
            name: entry.error.name,
            message: entry.error.message,
            stack: entry.error.stack,
          }
        : undefined,
    });
    console.log(output);
  }
}

/**
 * Default text formatter
 */
export function defaultFormatter(entry: LogEntry): string {
  const timestamp = entry.timestamp.toISOString();
  const level = entry.level.toUpperCase().padEnd(5);
  const context = entry.context ? `[${entry.context}]` : '';
  let message = `${timestamp} ${level} ${context} ${entry.message}`;

  if (entry.data && Object.keys(entry.data).length > 0) {
    message += ` ${JSON.stringify(entry.data)}`;
  }

  if (entry.error) {
    message += `\n  Error: ${entry.error.message}`;
    if (entry.error.stack) {
      message += `\n  ${entry.error.stack}`;
    }
  }

  return message;
}

/**
 * Base logger implementation
 */
export class BaseLogger implements Logger {
  private readonly transports: LogTransport[];
  private readonly minLevel: LogLevel;
  private readonly contextStack: string[];

  constructor(
    transports: LogTransport[] = [new ConsoleTransport()],
    minLevel: LogLevel = 'info',
    context: string[] = []
  ) {
    this.transports = transports;
    this.minLevel = minLevel;
    this.contextStack = context;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.minLevel];
  }

  private createContext(): string | undefined {
    return this.contextStack.length > 0
      ? this.contextStack.join(':')
      : undefined;
  }

  private createEntry(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context: this.createContext(),
      data: data ?? undefined,
      error: error ?? undefined,
    };
    return entry;
  }

  private async log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    error?: Error
  ): Promise<void> {
    if (!this.shouldLog(level)) return;

    const entry = this.createEntry(level, message, data, error);

    for (const transport of this.transports) {
      try {
        await transport.log(entry);
      } catch {
        // Ignore transport errors to prevent logging loops
      }
    }
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error | Record<string, unknown>): void {
    if (error instanceof Error) {
      this.log('error', message, undefined, error);
    } else {
      this.log('error', message, error);
    }
  }

  fatal(message: string, error?: Error | Record<string, unknown>): void {
    if (error instanceof Error) {
      this.log('fatal', message, undefined, error);
    } else {
      this.log('fatal', message, error);
    }
  }

  withContext(context: string): Logger {
    return new BaseLogger(
      this.transports,
      this.minLevel,
      [...this.contextStack, context]
    );
  }

  child(options?: { context?: string }): Logger {
    const newContext = options?.context
      ? [...this.contextStack, options.context]
      : this.contextStack;
    return new BaseLogger(this.transports, this.minLevel, newContext);
  }
}

/**
 * No-op logger for testing or disabling logs
 */
export class NoOpLogger implements Logger {
  debug(): void {}
  info(): void {}
  warn(): void {}
  error(): void {}
  fatal(): void {}
  withContext(): Logger {
    return this;
  }
  child(): Logger {
    return this;
  }
}

/**
 * Default logger instance
 */
let defaultLogger: Logger = new BaseLogger();

/**
 * Get the default logger
 */
export function getLogger(): Logger {
  return defaultLogger;
}

/**
 * Set the default logger
 */
export function setLogger(logger: Logger): void {
  defaultLogger = logger;
}

/**
 * Create a logger with custom configuration
 */
export function createLogger(options?: {
  transports?: LogTransport[];
  level?: LogLevel;
  context?: string;
}): Logger {
  const transports = options?.transports ?? [new ConsoleTransport()];
  const level = options?.level ?? 'info';
  const context = options?.context ? [options.context] : [];
  return new BaseLogger(transports, level, context);
}

/**
 * Create a logger from environment variables
 */
export function createLoggerFromEnv(): Logger {
  const level = (getEnv('LOG_LEVEL') as LogLevel) ?? 'info';
  const format = getEnv('LOG_FORMAT') ?? 'text';

  const transports: LogTransport[] = [
    format === 'json' ? new JsonTransport() : new ConsoleTransport(),
  ];

  return createLogger({ transports, level });
}

// Helper for env access
function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
}
