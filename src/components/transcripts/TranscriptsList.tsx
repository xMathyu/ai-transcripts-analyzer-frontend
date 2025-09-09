"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranscripts } from "@/hooks/useTranscripts";
import { TranscriptCategory } from "@/types/transcript";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/common";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

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
      [TranscriptCategory.TECHNICAL_ISSUES]: "destructive" as const,
      [TranscriptCategory.BILLING_ISSUES]: "warning" as const,
      [TranscriptCategory.COMMERCIAL_SUPPORT]: "success" as const,
      [TranscriptCategory.ADMINISTRATIVE_REQUESTS]: "secondary" as const,
      [TranscriptCategory.SERVICE_ACTIVATION]: "default" as const,
      [TranscriptCategory.COMPLAINTS_CLAIMS]: "destructive" as const,
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
      <Card>
        <CardHeader>
          <CardTitle>All Transcripts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Loading transcript data...
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
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
    <Card>
      <CardHeader>
        <CardTitle>All Transcripts</CardTitle>
        <p className="text-sm text-muted-foreground">{`${filteredAndSortedTranscripts.length} of ${transcripts.length} transcripts`}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transcripts..."
                className="w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm text-foreground placeholder-muted-foreground focus:ring-ring focus:border-ring"
              />
            </div>

            <div>
              <label
                htmlFor="category-filter"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Category
              </label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) =>
                  setFilterCategory(e.target.value as TranscriptCategory | "")
                }
                className="w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm text-foreground focus:ring-ring focus:border-ring"
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
                className="block text-sm font-medium text-foreground mb-1"
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
                className="w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm text-foreground focus:ring-ring focus:border-ring"
              >
                <option value="fileName">File Name</option>
                <option value="duration">Duration</option>
                <option value="messageCount">Message Count</option>
              </select>
            </div>
          </div>

          {/* Transcripts List */}
          {filteredAndSortedTranscripts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery || filterCategory
                ? "No transcripts match your filters."
                : "No transcripts available."}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSortedTranscripts.map((transcript) => (
                <div
                  key={transcript.id}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-foreground">
                        {transcript.fileName}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getBadgeVariant(transcript.category)}>
                          {getCategoryLabel(transcript.category)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Duration: {transcript.duration}
                        </span>
                        <span className="text-sm text-muted-foreground">
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
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  <p className="text-foreground mb-3">{transcript.summary}</p>

                  {transcript.topics && transcript.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {transcript.topics.map((topic) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {transcript.sentiment && (
                    <div className="text-sm text-muted-foreground">
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
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-foreground">
                    {filteredAndSortedTranscripts.length}
                  </div>
                  <div className="text-muted-foreground">Total Shown</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {Math.round(
                      filteredAndSortedTranscripts.reduce(
                        (sum, t) =>
                          sum + (t.messageCount || t.messages?.length || 0),
                        0
                      ) / filteredAndSortedTranscripts.length
                    )}
                  </div>
                  <div className="text-muted-foreground">Avg Messages</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {
                      new Set(
                        filteredAndSortedTranscripts.map((t) => t.category)
                      ).size
                    }
                  </div>
                  <div className="text-muted-foreground">Categories</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {
                      new Set(
                        filteredAndSortedTranscripts.flatMap((t) => t.topics)
                      ).size
                    }
                  </div>
                  <div className="text-muted-foreground">Unique Topics</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
