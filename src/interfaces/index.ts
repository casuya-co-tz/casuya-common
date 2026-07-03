/**
 * Interfaces module
 * Common interfaces used across the ecosystem
 */

import type { PaginatedResult, PaginationParams, SortParams } from '../types';

/**
 * Repository interface for data access
 */
export interface IRepository<T, TId = string> {
  findById(id: TId): Promise<T | null>;
  findByIds(ids: TId[]): Promise<T[]>;
  findOne(filter: Record<string, unknown>): Promise<T | null>;
  findMany(filter?: Record<string, unknown>): Promise<T[]>;
  findPaginated(
    params: PaginationParams,
    filter?: Record<string, unknown>,
    sort?: SortParams
  ): Promise<PaginatedResult<T>>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: TId, data: Partial<T>): Promise<T>;
  delete(id: TId): Promise<boolean>;
  exists(id: TId): Promise<boolean>;
  count(filter?: Record<string, unknown>): Promise<number>;
}

/**
 * Service interface
 */
export interface IService {
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  isReady(): boolean;
}

/**
 * Cache interface
 */
export interface ICache<T = unknown> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  has(key: string): Promise<boolean>;
  clear(): Promise<void>;
}

/**
 * Queue interface
 */
export interface IQueue<T = unknown> {
  enqueue(item: T): Promise<void>;
  dequeue(): Promise<T | null>;
  peek(): Promise<T | null>;
  size(): Promise<number>;
  isEmpty(): Promise<boolean>;
  clear(): Promise<void>;
}

/**
 * Event emitter interface
 */
export interface IEventEmitter<EventMap extends Record<string, unknown>> {
  on<K extends keyof EventMap>(
    event: K,
    handler: (data: EventMap[K]) => void | Promise<void>
  ): () => void;
  once<K extends keyof EventMap>(
    event: K,
    handler: (data: EventMap[K]) => void | Promise<void>
  ): () => void;
  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): Promise<void>;
  removeAllListeners(event?: keyof EventMap): void;
}

/**
 * Pub/Sub interface
 */
export interface IPubSub<T = unknown> {
  subscribe(topic: string, handler: (message: T) => void | Promise<void>): () => void;
  unsubscribe(topic: string, handler: (message: T) => void | Promise<void>): void;
  publish(topic: string, message: T): Promise<void>;
}

/**
 * Lock interface for distributed locking
 */
export interface ILock {
  acquire(key: string, ttl?: number): Promise<string | null>;
  release(key: string, token: string): Promise<boolean>;
  extend(key: string, token: string, ttl: number): Promise<boolean>;
  isLocked(key: string): Promise<boolean>;
}

/**
 * Rate limiter interface
 */
export interface IRateLimiter {
  isAllowed(key: string, limit: number, window: number): Promise<boolean>;
  getRemaining(key: string, limit: number, window: number): Promise<number>;
  reset(key: string): Promise<void>;
}

/**
 * Health check result
 */
export interface HealthCheckResult {
  name: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  message?: string;
  timestamp: Date;
  details?: Record<string, unknown>;
}

/**
 * Health check interface
 */
export interface IHealthCheck {
  check(): Promise<HealthCheckResult>;
  getName(): string;
}

/**
 * Metrics collector interface
 */
export interface IMetrics {
  increment(name: string, value?: number, tags?: Record<string, string>): void;
  decrement(name: string, value?: number, tags?: Record<string, string>): void;
  gauge(name: string, value: number, tags?: Record<string, string>): void;
  timing(name: string, value: number, tags?: Record<string, string>): void;
  histogram(name: string, value: number, tags?: Record<string, string>): void;
}

/**
 * Tracer interface
 */
export interface ITracer {
  startSpan(name: string, options?: Record<string, unknown>): ISpan;
  getCurrentSpan(): ISpan | null;
}

export interface ISpan {
  spanId: string;
  traceId: string;
  setName(name: string): void;
  setTag(key: string, value: unknown): void;
  setError(error: Error): void;
  finish(): void;
}

/**
 * Serializer interface
 */
export interface ISerializer<T = unknown> {
  serialize(data: T): string;
  deserialize(data: string): T;
}

/**
 * Parser interface
 */
export interface IParser<T = unknown> {
  parse(input: string): T;
  stringify(data: T): string;
}

/**
 * Validator interface
 */
export interface IValidator<T = unknown> {
  validate(data: unknown): data is T;
  validateOrThrow(data: unknown): T;
  getErrors(data: unknown): string[];
}

/**
 * Transformer interface
 */
export interface ITransformer<TInput, TOutput> {
  transform(input: TInput): TOutput;
}

/**
 * Middleware interface
 */
export interface IMiddleware<TContext> {
  (context: TContext, next: () => Promise<void>): Promise<void>;
}

/**
 * Pipeline interface
 */
export interface IPipeline<TContext> {
  use(middleware: IMiddleware<TContext>): this;
  execute(context: TContext): Promise<void>;
}

/**
 * Factory interface
 */
export interface IFactory<T> {
  create(...args: unknown[]): T | Promise<T>;
}

/**
 * Builder interface
 */
export interface IBuilder<T> {
  build(): T;
  reset(): this;
}
