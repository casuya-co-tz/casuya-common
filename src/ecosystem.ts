/**
 * Shared ecosystem types — imported by casuya-api, casuya-auth, casuya-ai,
 * casuya-analytics, casuya-payments, casuya-content, casuya-search, etc.
 */

// ---------- User & Auth ----------

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  mfaEnabled: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export interface AuthContext {
  userId: string;
  email: string;
  role: UserRole;
  permissions: string[];
  sessionId: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

// ---------- Lessons & Content ----------

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string;
  contentHash: string;
  version: string;
  status: LessonStatus;
  subtopicId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  metadata: Record<string, unknown>;
}

export enum LessonStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  PUBLISHED = 'archived',
  ARCHIVED = 'archived',
}

export interface LessonPackage {
  id: string;
  version: string;
  html: string;
  contentHash: string;
  packageVersion: string;
  signature: string;
}

// ---------- Progress ----------

export interface ProgressRecord {
  id: string;
  studentId: string;
  lessonId: string;
  sessionId: string;
  completionPercentage: number;
  scorePercentage: number;
  elapsedMs: number;
  syncedAt: Date;
  metadata: Record<string, unknown>;
}

// ---------- Quizzes ----------

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  explanation?: string;
  points: number;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  studentId: string;
  answers: QuizAnswer[];
  score: number;
  totalPoints: number;
  submittedAt: Date;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
}

// ---------- Payments ----------

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  createdAt: Date;
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SUCCESS = 'success',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

// ---------- Notifications ----------

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  metadata: Record<string, unknown>;
}

export enum NotificationType {
  SYSTEM = 'system',
  ACHIEVEMENT = 'achievement',
  QUIZ_RESULT = 'quiz_result',
  LESSON_PUBLISHED = 'lesson_published',
  PAYMENT = 'payment',
}

// ---------- Analytics ----------

export interface AnalyticsEvent {
  id: string;
  type: string;
  userId?: string;
  lessonId?: string;
  payload: Record<string, unknown>;
  timestamp: Date;
}

// ---------- API Responses ----------

export type { ApiResponse } from './types';

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ---------- Search ----------

export interface SearchResult {
  id: string;
  type: 'lesson' | 'quiz' | 'topic' | 'subject';
  title: string;
  snippet: string;
  score: number;
  url: string;
}

// ---------- Pagination ----------

export type { PaginatedResult, PaginationParams } from './types';
