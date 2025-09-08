export enum TranscriptCategory {
  TECHNICAL_ISSUES = "technical_issues",
  COMMERCIAL_SUPPORT = "commercial_support",
  ADMINISTRATIVE_REQUESTS = "administrative_requests",
  BILLING_ISSUES = "billing_issues",
  SERVICE_ACTIVATION = "service_activation",
  COMPLAINTS_CLAIMS = "complaints_claims",
}

export interface TranscriptMessage {
  timestamp: string;
  speaker: "AGENT" | "CLIENT" | "SYSTEM";
  content: string;
}

export type Message = TranscriptMessage;

export interface ParsedTranscript {
  id: string;
  fileName: string;
  messages: TranscriptMessage[];
  duration?: string;
  summary?: string;
  category?: string;
  topics?: string[];
  sentiment?: "positive" | "negative" | "neutral";
}

export interface Transcript extends ParsedTranscript {
  category: TranscriptCategory;
  summary: string;
  topics: string[];
  messageCount?: number;
}

export interface SearchResult {
  transcript: ParsedTranscript;
  relevanceScore: number;
  matchedMessages: TranscriptMessage[];
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: PaginationInfo;
}

export interface SearchTranscriptsDto {
  query: string;
  category?: TranscriptCategory;
  page?: number;
  limit?: number;
}

export interface TopicAnalysis {
  topic: string;
  frequency: number;
  relevantTranscripts: string[];
  description?: string;
}

export interface ExtractTopicsDto {
  transcriptIds?: string[];
  topicsCount?: number;
  category?: TranscriptCategory;
}

export interface ClassificationResult {
  transcriptId: string;
  category: string;
  confidence: number;
  reasoning: string;
}

export interface ClassifyTranscriptDto {
  transcriptId: string;
}

export interface BulkClassificationResult {
  totalProcessed: number;
  successful: number;
  failed: number;
  results: ClassificationResult[];
  estimatedCost: number;
  processingTime: string;
  note?: string;
}

export interface SummaryResult {
  transcriptId: string;
  summary: string;
  wordCount: number;
  generatedAt: string;
}

export interface Statistics {
  transcripts: {
    total: number;
    categorized: number;
    byCategory: Record<string, number> | null;
    averageMessageCount: number;
    averageDuration: string;
  };
  openAiUsage: {
    tokenUsage: {
      prompt: number;
      completion: number;
      total: number;
    };
    estimatedCost: number;
    remainingBudget: number;
  };
  cache: {
    size: number;
    hitRate: number;
    memoryUsageEstimate: number;
  };
}
