"use client";

import React, { useState } from "react";
import { useFrequentTopics } from "@/hooks/useTranscripts";
import { TranscriptCategory } from "@/types/transcript";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/common";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function FrequentTopics() {
  const [selectedCategory, setSelectedCategory] = useState<
    TranscriptCategory | undefined
  >(undefined);
  const { topics, loading, error } = useFrequentTopics(selectedCategory);

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

  const getFrequencyColor = (frequency: number, maxFrequency: number) => {
    const intensity = frequency / maxFrequency;
    if (intensity > 0.8) return "bg-red-500";
    if (intensity > 0.6) return "bg-orange-500";
    if (intensity > 0.4) return "bg-yellow-500";
    if (intensity > 0.2) return "bg-blue-500";
    return "bg-gray-500";
  };

  const maxFrequency = Math.max(...topics.map((t) => t.frequency), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequent Topics</CardTitle>
        <p className="text-sm text-muted-foreground">{`Most common topics${
          selectedCategory
            ? ` in ${getCategoryLabel(selectedCategory)}`
            : " across all categories"
        }`}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Category Filter */}
          <div>
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Filter by Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory || ""}
              onChange={(e) =>
                setSelectedCategory(
                  (e.target.value as TranscriptCategory) || undefined
                )
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

          {loading && (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          )}

          {error && <ErrorMessage message={error} />}

          {!loading && !error && topics.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No topics found for the selected category.
            </div>
          )}

          {!loading && !error && topics.length > 0 && (
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <div
                  key={topic.topic}
                  className="border border-border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-foreground capitalize">
                          {topic.topic}
                        </h4>
                        <Badge variant="secondary">{topic.frequency}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {topic.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {topic.frequency}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        occurrences
                      </div>
                    </div>
                  </div>

                  {/* Frequency Bar */}
                  <div className="mb-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getFrequencyColor(
                          topic.frequency,
                          maxFrequency
                        )}`}
                        style={{
                          width: `${(topic.frequency / maxFrequency) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Related Transcripts */}
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">
                      Related Transcripts ({topic.relevantTranscripts.length})
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {topic.relevantTranscripts
                        .slice(0, 6)
                        .map((transcriptId) => (
                          <Badge key={transcriptId} variant="default">
                            {transcriptId}
                          </Badge>
                        ))}
                      {topic.relevantTranscripts.length > 6 && (
                        <Badge variant="secondary">
                          +{topic.relevantTranscripts.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Statistics */}
          {!loading && !error && topics.length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">
                Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-foreground">
                    {topics.length}
                  </div>
                  <div className="text-muted-foreground">Unique Topics</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {topics.reduce((sum, t) => sum + t.frequency, 0)}
                  </div>
                  <div className="text-muted-foreground">Total Occurrences</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {Math.round(
                      topics.reduce((sum, t) => sum + t.frequency, 0) /
                        topics.length
                    )}
                  </div>
                  <div className="text-muted-foreground">Avg per Topic</div>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {Math.max(
                      ...topics.map((t) => t.relevantTranscripts.length)
                    )}
                  </div>
                  <div className="text-muted-foreground">Max Transcripts</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
