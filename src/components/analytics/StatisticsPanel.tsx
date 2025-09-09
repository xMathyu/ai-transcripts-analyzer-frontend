"use client";

import React, { useEffect } from "react";
import { useStatistics } from "@/hooks/useTranscripts";
import { LoadingSpinner, ErrorMessage, Card } from "@/components/ui/common";

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
      <Card title="Statistics" subtitle="Loading analytics data...">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
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
      <Card title="Transcripts" subtitle="General transcript analytics">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {statistics.transcripts.totalTranscripts}
              </div>
              <div className="text-sm text-gray-500">Total Transcripts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {statistics.transcripts.totalTranscripts -
                  (statistics.transcripts.categoriesDistribution
                    ?.unclassified || 0)}
              </div>
              <div className="text-sm text-gray-500">Categorized</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="text-lg font-semibold text-gray-700">
                {Math.round(
                  statistics.transcripts.averageMessagesPerTranscript
                )}
              </div>
              <div className="text-sm text-gray-500">
                Avg Messages per Transcript
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              By Category
            </h4>
            <div className="space-y-1">
              {statistics.transcripts.categoriesDistribution &&
                Object.entries(
                  statistics.transcripts.categoriesDistribution
                ).map(([category, count]) => (
                  <div key={category} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">
                      {category.replace(/_/g, " ")}
                    </span>
                    <span className="font-medium">{count as number}</span>
                  </div>
                ))}
              {!statistics.transcripts.categoriesDistribution && (
                <div className="text-sm text-gray-500">
                  No category data available
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* OpenAI Usage Statistics */}
      <Card title="AI Usage" subtitle="OpenAI API consumption">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(statistics.openAiUsage.tokenUsage.total)}
              </div>
              <div className="text-sm text-gray-500">Total Tokens</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(statistics.openAiUsage.estimatedCost)}
              </div>
              <div className="text-sm text-gray-500">Estimated Cost</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-semibold text-gray-700">
                {formatNumber(statistics.openAiUsage.tokenUsage.prompt)}
              </div>
              <div className="text-sm text-gray-500">Prompt Tokens</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-700">
                {formatNumber(statistics.openAiUsage.tokenUsage.completion)}
              </div>
              <div className="text-sm text-gray-500">Completion Tokens</div>
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-green-600">
              {formatCurrency(statistics.openAiUsage.remainingBudget)}
            </div>
            <div className="text-sm text-gray-500">Remaining Budget</div>
          </div>

          {/* Budget Progress Bar */}
          <div>
            <div className="text-sm text-gray-700 mb-1">Budget Usage</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
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
      </Card>

      {/* Cache Statistics */}
      <Card title="Cache Status" subtitle="System cache metrics">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {statistics.cache.size}
              </div>
              <div className="text-sm text-gray-500">Cache Entries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {formatMemory(statistics.cache.memoryUsageEstimate)}
              </div>
              <div className="text-sm text-gray-500">Memory Usage</div>
            </div>
          </div>

          {/* Cache Keys Preview */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Recent Cache Keys
            </h4>
            <div className="bg-gray-50 rounded-md p-3 max-h-32 overflow-y-auto">
              <div className="space-y-1">
                {statistics.cache.keys.slice(0, 5).map((key, index) => (
                  <div
                    key={index}
                    className="text-xs text-gray-600 truncate"
                    title={key}
                  >
                    {key}
                  </div>
                ))}
                {statistics.cache.keys.length > 5 && (
                  <div className="text-xs text-gray-500 italic">
                    ... and {statistics.cache.keys.length - 5} more
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cache Status */}
          <div className="p-3 bg-blue-50 rounded-md">
            <div className="text-sm">
              <span className="text-blue-600 font-medium">
                ℹ Active caching for search, AI operations, and topics
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
