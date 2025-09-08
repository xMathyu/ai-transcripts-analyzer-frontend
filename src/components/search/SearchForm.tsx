"use client";

import React, { useState } from "react";
import { TranscriptCategory } from "@/types/transcript";
import { useSearch } from "@/hooks/useTranscripts";
import {
  LoadingSpinner,
  ErrorMessage,
  Badge,
  Card,
} from "@/components/ui/common";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TranscriptCategory | "">("");
  const { results, loading, error, pagination, search } = useSearch();

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
      "default" | "secondary" | "danger" | "warning" | "success"
    > = {
      technical_issues: "danger",
      billing_issues: "warning",
      commercial_support: "success",
      administrative_requests: "secondary",
      service_activation: "default",
      complaints_claims: "danger",
    };
    return variants[category] || "secondary";
  };

  return (
    <div className="space-y-6">
      <Card
        title="Search Transcripts"
        subtitle="Find transcripts using keywords and filters"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Keywords
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter keywords to search for..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category (Optional)
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as TranscriptCategory | "")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {Object.values(TranscriptCategory).map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryLabel(cat)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading && <LoadingSpinner size="sm" className="mr-2" />}
            Search
          </button>
        </form>
      </Card>

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => search({ query, category: category || undefined })}
        />
      )}

      {results.length > 0 && (
        <Card
          title="Search Results"
          subtitle={`Found ${pagination?.total || results.length} results`}
        >
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.transcript.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">
                      {result.transcript.fileName}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant={getBadgeVariant(result.transcript.category)}
                      >
                        {getCategoryLabel(result.transcript.category)}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Duration: {result.transcript.duration}
                      </span>
                      <span className="text-sm text-gray-500">
                        Relevance: {(result.relevanceScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">
                  {result.transcript.summary}
                </p>

                {result.transcript.topics &&
                  result.transcript.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {result.transcript.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" size="sm">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                {result.matchedMessages &&
                  result.matchedMessages.length > 0 && (
                    <div className="bg-gray-50 rounded-md p-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">
                        Matched Messages:
                      </h5>
                      <div className="space-y-2">
                        {result.matchedMessages.map((message, msgIndex) => (
                          <div key={msgIndex} className="text-sm">
                            <span className="font-medium text-gray-600">
                              [{message.timestamp}] {message.speaker}:
                            </span>
                            <span className="ml-2 text-gray-800">
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
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing page {pagination.page} of {pagination.totalPages} (
                {pagination.total} total results)
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    search({
                      query,
                      category: category || undefined,
                      page: pagination.page - 1,
                      limit: 10,
                    })
                  }
                  disabled={pagination.page <= 1 || loading}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    search({
                      query,
                      category: category || undefined,
                      page: pagination.page + 1,
                      limit: 10,
                    })
                  }
                  disabled={pagination.page >= pagination.totalPages || loading}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
