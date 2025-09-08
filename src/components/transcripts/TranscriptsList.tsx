"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranscripts } from "@/hooks/useTranscripts";
import { TranscriptCategory } from "@/types/transcript";
import {
  LoadingSpinner,
  ErrorMessage,
  Badge,
  Card,
} from "@/components/ui/common";

export function TranscriptsList() {
  const { transcripts, loading, error } = useTranscripts();
  const [filterCategory, setFilterCategory] = useState<TranscriptCategory | "">(
    ""
  );
  const [sortBy, setSortBy] = useState<
    "fileName" | "duration" | "messageCount"
  >("fileName");
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryLabel = (cat: TranscriptCategory) => {
    const labels = {
      [TranscriptCategory.TECHNICAL_ISSUES]: "Technical Issues",
      [TranscriptCategory.BILLING_ISSUES]: "Billing Issues",
      [TranscriptCategory.COMMERCIAL_SUPPORT]: "Commercial Support",
      [TranscriptCategory.ADMINISTRATIVE_REQUESTS]: "Administrative Requests",
      [TranscriptCategory.SERVICE_ACTIVATION]: "Service Activation",
      [TranscriptCategory.COMPLAINTS_CLAIMS]: "Complaints & Claims",
    };
    return labels[cat];
  };

  const getBadgeVariant = (category: TranscriptCategory) => {
    const variants = {
      [TranscriptCategory.TECHNICAL_ISSUES]: "danger" as const,
      [TranscriptCategory.BILLING_ISSUES]: "warning" as const,
      [TranscriptCategory.COMMERCIAL_SUPPORT]: "success" as const,
      [TranscriptCategory.ADMINISTRATIVE_REQUESTS]: "secondary" as const,
      [TranscriptCategory.SERVICE_ACTIVATION]: "default" as const,
      [TranscriptCategory.COMPLAINTS_CLAIMS]: "danger" as const,
    };
    return variants[category];
  };

  const filteredAndSortedTranscripts = React.useMemo(() => {
    let filtered = transcripts;

    if (filterCategory) {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.fileName.toLowerCase().includes(query) ||
          t.summary.toLowerCase().includes(query) ||
          t.topics.some((topic) => topic.toLowerCase().includes(query))
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "fileName":
          return a.fileName.localeCompare(b.fileName);
        case "duration":
          return (a.duration || "").localeCompare(b.duration || "");
        case "messageCount":
          return (a.messageCount || 0) - (b.messageCount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [transcripts, filterCategory, sortBy, searchQuery]);

  if (loading) {
    return (
      <Card title="All Transcripts" subtitle="Loading transcript data...">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="All Transcripts">
        <ErrorMessage message={error} />
      </Card>
    );
  }

  return (
    <Card
      title="All Transcripts"
      subtitle={`${filteredAndSortedTranscripts.length} of ${transcripts.length} transcripts`}
    >
      <div className="space-y-4">
        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcripts..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category-filter"
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(e.target.value as TranscriptCategory | "")
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

          <div>
            <label
              htmlFor="sort-by"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "fileName" | "duration" | "messageCount"
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="fileName">File Name</option>
              <option value="duration">Duration</option>
              <option value="messageCount">Message Count</option>
            </select>
          </div>
        </div>

        {/* Transcripts List */}
        {filteredAndSortedTranscripts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {searchQuery || filterCategory
              ? "No transcripts match your filters."
              : "No transcripts available."}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedTranscripts.map((transcript) => (
              <div
                key={transcript.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">
                      {transcript.fileName}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={getBadgeVariant(transcript.category)}>
                        {getCategoryLabel(transcript.category)}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Duration: {transcript.duration}
                      </span>
                      <span className="text-sm text-gray-500">
                        Messages:{" "}
                        {transcript.messageCount ||
                          transcript.messages?.length ||
                          0}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Link
                      href={`/transcripts/${transcript.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{transcript.summary}</p>

                {transcript.topics && transcript.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {transcript.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" size="sm">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}

                {transcript.sentiment && (
                  <div className="text-sm text-gray-500">
                    Sentiment:{" "}
                    <span className="capitalize">{transcript.sentiment}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {filteredAndSortedTranscripts.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-semibold text-gray-900">
                  {filteredAndSortedTranscripts.length}
                </div>
                <div className="text-gray-500">Total Shown</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {Math.round(
                    filteredAndSortedTranscripts.reduce(
                      (sum, t) =>
                        sum + (t.messageCount || t.messages?.length || 0),
                      0
                    ) / filteredAndSortedTranscripts.length
                  )}
                </div>
                <div className="text-gray-500">Avg Messages</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {
                    new Set(filteredAndSortedTranscripts.map((t) => t.category))
                      .size
                  }
                </div>
                <div className="text-gray-500">Categories</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {
                    new Set(
                      filteredAndSortedTranscripts.flatMap((t) => t.topics)
                    ).size
                  }
                </div>
                <div className="text-gray-500">Unique Topics</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
