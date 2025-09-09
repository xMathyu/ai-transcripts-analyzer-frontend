"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, Sparkles, Loader2, ChevronDown } from "lucide-react";
import { TranscriptCategory } from "@/types/transcript";
import { useSearch } from "@/hooks/useTranscripts";
import { useAIClassification } from "@/hooks/useAI";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/common";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TranscriptCategory | "">("");
  const [classifyingId, setClassifyingId] = useState<string | null>(null);
  const [localClassifications, setLocalClassifications] = useState<
    Record<string, { category: string; confidence: number; reasoning: string }>
  >({});
  const { results, loading, error, pagination, search } = useSearch();
  const { classifyTranscript, result: classificationResult } =
    useAIClassification();

  const handleClassify = (transcriptId: string) => {
    setClassifyingId(transcriptId);
    classifyTranscript(transcriptId);
  };

  useEffect(() => {
    if (
      classificationResult &&
      classificationResult.transcriptId === classifyingId
    ) {
      setLocalClassifications((prev) => ({
        ...prev,
        [classificationResult.transcriptId]: {
          category: classificationResult.category,
          confidence: classificationResult.confidence,
          reasoning: classificationResult.reasoning,
        },
      }));
      setClassifyingId(null);
    }
  }, [classificationResult, classifyingId]);

  const getTranscriptCategory = (transcript: {
    id: string;
    category?: string;
  }) => {
    const localClassification = localClassifications[transcript.id];
    if (localClassification) {
      return localClassification.category;
    }

    if (transcript.category) {
      return transcript.category;
    }
    return null;
  };

  const needsClassification = (transcript: {
    id: string;
    category?: string;
  }) => {
    const currentCategory = getTranscriptCategory(transcript);
    return !currentCategory || currentCategory === "uncategorized";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search({
        query: query.trim(),
        category: category || undefined,
        page: 1,
        limit: 10,
      });
    }
  };

  const getCategoryLabel = (cat: string | TranscriptCategory | undefined) => {
    if (!cat) return "Uncategorized";
    const labels: Record<string, string> = {
      technical_issues: "Technical Issues",
      billing_issues: "Billing Issues",
      commercial_support: "Commercial Support",
      administrative_requests: "Administrative Requests",
      service_activation: "Service Activation",
      complaints_claims: "Complaints & Claims",
    };
    return labels[cat] || cat;
  };

  const getBadgeVariant = (
    category: string | TranscriptCategory | undefined
  ) => {
    if (!category) return "secondary" as const;
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "warning" | "success"
    > = {
      technical_issues: "destructive",
      billing_issues: "warning",
      commercial_support: "success",
      administrative_requests: "secondary",
      service_activation: "default",
      complaints_claims: "destructive",
    };
    return variants[category] || "secondary";
  };

  const formatRelevanceScore = (score: number) => {
    if (score > 1) {
      return Math.round(score);
    } else {
      return Math.round(score * 100);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Search className="w-5 h-5 mr-2 text-primary" />
            Search Transcripts
          </CardTitle>
          <CardDescription>
            Find transcripts using keywords and AI-powered filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for topics, keywords, or specific content..."
                className="pl-10 h-12 text-base"
                required
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setQuery("")}
                >
                  ×
                </Button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as TranscriptCategory | "")
                    }
                    className={cn(
                      "w-full pl-10 pr-10 h-10 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer"
                    )}
                  >
                    <option value="">All Categories</option>
                    {Object.values(TranscriptCategory).map((cat) => (
                      <option key={cat} value={cat}>
                        {getCategoryLabel(cat)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !query.trim()}
                className="h-10 px-6 hover-lift"
                size="default"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>

            {/* Quick search suggestions */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-xs text-muted-foreground">Try:</span>
              {[
                "billing issue",
                "technical support",
                "complaint",
                "service activation",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  className="px-2 py-1 text-xs bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => search({ query, category: category || undefined })}
        />
      )}

      {results.length > 0 && (
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Search className="w-5 h-5 mr-2 text-primary" />
              Search Results
            </CardTitle>
            <CardDescription>
              Found {pagination?.total || results.length} results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.transcript.id}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-foreground">
                        {result.transcript.fileName}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant={getBadgeVariant(
                            getTranscriptCategory(result.transcript) ||
                              undefined
                          )}
                        >
                          {getCategoryLabel(
                            getTranscriptCategory(result.transcript) ||
                              undefined
                          )}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Duration: {result.transcript.duration}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Relevance:{" "}
                          {formatRelevanceScore(result.relevanceScore)}%
                        </span>
                      </div>
                    </div>

                    {needsClassification(result.transcript) && (
                      <div className="flex-shrink-0 ml-4">
                        <button
                          onClick={() => handleClassify(result.transcript.id)}
                          disabled={classifyingId === result.transcript.id}
                          className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {classifyingId === result.transcript.id ? (
                            <>
                              <LoadingSpinner size="sm" className="mr-1" />
                              Classifying...
                            </>
                          ) : (
                            "Classify"
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-foreground mb-3">
                    {result.transcript.summary}
                  </p>

                  {/* Mostrar resultado de clasificación local si está disponible */}
                  {localClassifications[result.transcript.id] && (
                    <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-md p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">
                          New Classification:{" "}
                          {getCategoryLabel(
                            localClassifications[result.transcript.id].category
                          )}
                        </Badge>
                        <span className="text-sm text-purple-600 dark:text-purple-400">
                          Confidence:{" "}
                          {(
                            localClassifications[result.transcript.id]
                              .confidence * 100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        {localClassifications[result.transcript.id].reasoning}
                      </p>
                    </div>
                  )}

                  {result.transcript.topics &&
                    result.transcript.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {result.transcript.topics.map((topic) => (
                          <Badge key={topic} variant="secondary">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    )}

                  {result.matchedMessages &&
                    result.matchedMessages.length > 0 && (
                      <div className="bg-muted rounded-md p-3">
                        <h5 className="text-sm font-medium text-foreground mb-2">
                          Matched Messages:
                        </h5>
                        <div className="space-y-2">
                          {result.matchedMessages.map((message, msgIndex) => (
                            <div key={msgIndex} className="text-sm">
                              <span className="font-medium text-muted-foreground">
                                [{message.timestamp}] {message.speaker}:
                              </span>
                              <span className="ml-2 text-foreground">
                                {message.content}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing page {pagination.page} of {pagination.totalPages} (
                  {pagination.total} total results)
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      search({
                        query,
                        category: category || undefined,
                        page: pagination.page - 1,
                        limit: 10,
                      })
                    }
                    disabled={pagination.page <= 1 || loading}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      search({
                        query,
                        category: category || undefined,
                        page: pagination.page + 1,
                        limit: 10,
                      })
                    }
                    disabled={
                      pagination.page >= pagination.totalPages || loading
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
