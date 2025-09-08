"use client";

import React from "react";
import { useStatistics } from "@/hooks/useTranscripts";
import { LoadingSpinner, ErrorMessage, Card } from "@/components/ui/common";

export function StatisticsPanel() {
  const { statistics, loading, error } = useStatistics();

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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(1)}%`;
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
                {statistics.transcripts.total}
              </div>
              <div className="text-sm text-gray-500">Total Transcripts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {statistics.transcripts.categorized}
              </div>
              <div className="text-sm text-gray-500">Categorized</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-lg font-semibold text-gray-700">
                {statistics.transcripts.averageMessageCount}
              </div>
              <div className="text-sm text-gray-500">Avg Messages</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-700">
                {statistics.transcripts.averageDuration}
              </div>
              <div className="text-sm text-gray-500">Avg Duration</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              By Category
            </h4>
            <div className="space-y-1">
              {statistics.transcripts.byCategory &&
                Object.entries(statistics.transcripts.byCategory).map(
                  ([category, count]) => (
                    <div
                      key={category}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600 capitalize">
                        {category.replace("_", " ")}
                      </span>
                      <span className="font-medium">{count}</span>
                    </div>
                  )
                )}
              {!statistics.transcripts.byCategory && (
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
      <Card title="Cache Performance" subtitle="System cache metrics">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-indigo-600">
                {statistics.cache.size}
              </div>
              <div className="text-sm text-gray-500">Cache Entries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatPercentage(statistics.cache.hitRate)}
              </div>
              <div className="text-sm text-gray-500">Hit Rate</div>
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold text-gray-700">
              {formatMemory(statistics.cache.memoryUsageEstimate)}
            </div>
            <div className="text-sm text-gray-500">Memory Usage</div>
          </div>

          {/* Hit Rate Visual */}
          <div>
            <div className="text-sm text-gray-700 mb-1">Cache Efficiency</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${statistics.cache.hitRate * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="text-sm">
              {statistics.cache.hitRate > 0.8 ? (
                <span className="text-green-600 font-medium">
                  ✓ Excellent cache performance
                </span>
              ) : statistics.cache.hitRate > 0.6 ? (
                <span className="text-yellow-600 font-medium">
                  ⚠ Good cache performance
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  ⚠ Consider cache optimization
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
