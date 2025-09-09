import { useState, useEffect, useCallback } from "react";
import { transcriptService } from "@/services/transcript.service";
import {
  SearchResult,
  SearchTranscriptsDto,
  Transcript,
  TopicAnalysis,
  Statistics,
  TranscriptCategory,
  PaginationInfo,
} from "@/types/transcript";

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const search = async (params: SearchTranscriptsDto) => {
    setLoading(true);
    setError(null);

    try {
      const response = await transcriptService.searchTranscripts(params);
      setResults(response.data || []);
      setPagination(response.pagination || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, pagination, search };
}

export function useTranscripts() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await transcriptService.getAllTranscripts();
        setTranscripts(response.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch transcripts"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTranscripts();
  }, []);

  return { transcripts, loading, error, refetch: () => setLoading(true) };
}

export function useTranscript(id: string) {
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTranscript = async () => {
      try {
        const response = await transcriptService.getTranscriptById(id);
        setTranscript(response.data || null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch transcript"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTranscript();
  }, [id]);

  return { transcript, loading, error };
}

export function useStatistics() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await transcriptService.getStatistics();
      setStatistics(response.data || null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch statistics"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return { statistics, loading, error, refreshStatistics: fetchStatistics };
}

export function useFrequentTopics(category?: TranscriptCategory) {
  const [topics, setTopics] = useState<TopicAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await transcriptService.getFrequentTopics(category);
        setTopics(response.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch topics");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [category]);

  return { topics, loading, error };
}
