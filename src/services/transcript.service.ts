import {
  ApiResponse,
  SearchResult,
  SearchTranscriptsDto,
  Transcript,
  Statistics,
  TranscriptCategory,
  ExtractTopicsDto,
  TopicAnalysis,
  ClassificationResult,
  BulkClassificationResult,
  SummaryResult,
} from "@/types/transcript";
import { getApiBaseUrl } from "@/config/api";

const API_BASE_URL = getApiBaseUrl();

class TranscriptService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async searchTranscripts(
    params: SearchTranscriptsDto
  ): Promise<ApiResponse<SearchResult[]>> {
    const searchParams = new URLSearchParams();

    searchParams.append("query", params.query);
    if (params.category) searchParams.append("category", params.category);
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());

    return this.request<ApiResponse<SearchResult[]>>(
      `/api/transcripts/search?${searchParams.toString()}`
    );
  }

  async getStatistics(): Promise<ApiResponse<Statistics>> {
    return this.request<ApiResponse<Statistics>>("/api/transcripts/statistics");
  }

  async getFrequentTopics(
    category?: TranscriptCategory
  ): Promise<ApiResponse<TopicAnalysis[]>> {
    const params = category ? `?category=${category}` : "";
    return this.request<ApiResponse<TopicAnalysis[]>>(
      `/api/transcripts/topics/frequent${params}`
    );
  }

  async getAllTranscripts(): Promise<ApiResponse<Transcript[]>> {
    return this.request<ApiResponse<Transcript[]>>("/api/transcripts");
  }

  async getTranscriptById(id: string): Promise<ApiResponse<Transcript>> {
    return this.request<ApiResponse<Transcript>>(`/api/transcripts/${id}`);
  }

  async extractTopicsWithAI(
    params: ExtractTopicsDto
  ): Promise<ApiResponse<TopicAnalysis[]>> {
    return this.request<ApiResponse<TopicAnalysis[]>>(
      "/api/ai/topics/extract",
      {
        method: "POST",
        body: JSON.stringify(params),
      }
    );
  }

  async classifyAllTranscriptsWithAI(): Promise<
    ApiResponse<BulkClassificationResult>
  > {
    return this.request<ApiResponse<BulkClassificationResult>>(
      "/api/ai/classify/all",
      {
        method: "POST",
      }
    );
  }

  async classifyTranscriptWithAI(
    id: string
  ): Promise<ApiResponse<ClassificationResult>> {
    return this.request<ApiResponse<ClassificationResult>>(
      `/api/ai/classify/${id}`,
      {
        method: "POST",
      }
    );
  }

  async generateSummaryWithAI(id: string): Promise<ApiResponse<SummaryResult>> {
    return this.request<ApiResponse<SummaryResult>>(`/api/ai/summarize/${id}`, {
      method: "POST",
    });
  }
}

export const transcriptService = new TranscriptService();
