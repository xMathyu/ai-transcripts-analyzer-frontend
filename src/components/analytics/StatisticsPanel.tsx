"use client";

import React, { useEffect } from "react";
import { useStatistics } from "@/hooks/useTranscripts";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function StatisticsPanel() {
  const { statistics, loading, error, refreshStatistics } = useStatistics();

  useEffect(() => {
    const interval = setInterval(() => {
      refreshStatistics();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshStatistics]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <p className="text-sm text-muted-foreground">
            Loading analytics data...
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
      <Card title="Statistics">
        <ErrorMessage message={error} />
      </Card>
    );
  }

  if (!statistics) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    if (amount < 0.01 && amount > 0) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(amount);
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatMemory = (bytes: number) => {
    const mb = bytes / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Transcripts Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Transcripts</CardTitle>
          <p className="text-sm text-muted-foreground">
            General transcript analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {statistics.transcripts.totalTranscripts}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Transcripts
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {statistics.transcripts.totalTranscripts -
                    (statistics.transcripts.categoriesDistribution
                      ?.unclassified || 0)}
                </div>
                <div className="text-sm text-muted-foreground">Categorized</div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {Math.round(
                    statistics.transcripts.averageMessagesPerTranscript
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg Messages per Transcript
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                By Category
              </h4>
              <div className="space-y-1">
                {statistics.transcripts.categoriesDistribution &&
                  Object.entries(
                    statistics.transcripts.categoriesDistribution
                  ).map(([category, count]) => (
                    <div
                      key={category}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground capitalize">
                        {category.replace(/_/g, " ")}
                      </span>
                      <span className="font-medium text-foreground">
                        {count as number}
                      </span>
                    </div>
                  ))}
                {!statistics.transcripts.categoriesDistribution && (
                  <div className="text-sm text-muted-foreground">
                    No category data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OpenAI Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>AI Usage</CardTitle>
          <p className="text-sm text-muted-foreground">
            OpenAI API consumption
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatNumber(statistics.openAiUsage.tokenUsage.total)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Tokens
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {formatCurrency(statistics.openAiUsage.estimatedCost)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Estimated Cost
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {formatNumber(statistics.openAiUsage.tokenUsage.prompt)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Prompt Tokens
                </div>
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">
                  {formatNumber(statistics.openAiUsage.tokenUsage.completion)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Completion Tokens
                </div>
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                {formatCurrency(statistics.openAiUsage.remainingBudget)}
              </div>
              <div className="text-sm text-muted-foreground">
                Remaining Budget
              </div>
            </div>

            {/* Budget Progress Bar */}
            <div>
              <div className="text-sm text-foreground mb-1">Budget Usage</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (statistics.openAiUsage.estimatedCost /
                        (statistics.openAiUsage.estimatedCost +
                          statistics.openAiUsage.remainingBudget)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cache Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Cache Status</CardTitle>
          <p className="text-sm text-muted-foreground">System cache metrics</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {statistics.cache.size}
                </div>
                <div className="text-sm text-muted-foreground">
                  Cache Entries
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {formatMemory(statistics.cache.memoryUsageEstimate)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Memory Usage
                </div>
              </div>
            </div>

            {/* Cache Keys Preview */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Recent Cache Keys
              </h4>
              <div className="bg-muted rounded-md p-3 max-h-32 overflow-y-auto">
                <div className="space-y-1">
                  {statistics.cache.keys.slice(0, 5).map((key, index) => (
                    <div
                      key={index}
                      className="text-xs text-muted-foreground truncate"
                      title={key}
                    >
                      {key}
                    </div>
                  ))}
                  {statistics.cache.keys.length > 5 && (
                    <div className="text-xs text-muted-foreground italic">
                      ... and {statistics.cache.keys.length - 5} more
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cache Status */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
              <div className="text-sm">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  ℹ Active caching for search, AI operations, and topics
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
