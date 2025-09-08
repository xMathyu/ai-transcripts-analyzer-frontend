import { useState } from "react";
import { transcriptService } from "@/services/transcript.service";
import {
  ExtractTopicsDto,
  TopicAnalysis,
  ClassificationResult,
  BulkClassificationResult,
  SummaryResult,
} from "@/types/transcript";

export function useAITopicExtraction() {
  const [topics, setTopics] = useState<TopicAnalysis[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractTopics = async (params: ExtractTopicsDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await transcriptService.extractTopicsWithAI(params);
      setTopics(response.data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to extract topics with AI"
      );
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  return { topics, loading, error, extractTopics };
}

export function useAIClassification() {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classifyTranscript = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await transcriptService.classifyTranscriptWithAI(id);
      setResult(response.data || null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to classify transcript"
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, classifyTranscript };
}

export function useAIBulkClassification() {
  const [result, setResult] = useState<BulkClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classifyAll = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await transcriptService.classifyAllTranscriptsWithAI();
      setResult(response.data || null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to classify all transcripts"
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, classifyAll };
}

export function useAISummary() {
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await transcriptService.generateSummaryWithAI(id);
      setSummary(response.data || null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate summary"
      );
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, error, generateSummary };
}
