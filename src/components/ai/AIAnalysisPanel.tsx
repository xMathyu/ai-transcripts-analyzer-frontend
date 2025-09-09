"use client";

import React, { useState } from "react";
import { TranscriptCategory } from "@/types/transcript";
import { useAITopicExtraction, useAIBulkClassification } from "@/hooks/useAI";
import {
  LoadingSpinner,
  ErrorMessage,
  Badge,
  Card,
} from "@/components/ui/common";

export function AIAnalysisPanel() {
  const [selectedCategory, setSelectedCategory] = useState<
    TranscriptCategory | undefined
  >(undefined);
  const [topicsCount, setTopicsCount] = useState(10);

  const {
    topics,
    loading: topicsLoading,
    error: topicsError,
    extractTopics,
  } = useAITopicExtraction();
  const {
    result: bulkResult,
    loading: bulkLoading,
    error: bulkError,
    classifyAll,
  } = useAIBulkClassification();

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

  const handleExtractTopics = () => {
    extractTopics({
      category: selectedCategory,
      topicsCount,
    });
  };

  const handleBulkClassify = () => {
    if (
      window.confirm(
        "This will classify ALL transcripts using AI and may consume many tokens. Continue?"
      )
    ) {
      classifyAll();
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Topic Extraction */}
      <Card
        title="AI Topic Extraction"
        subtitle="Extract main topics using OpenAI analysis (consumes tokens)"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ai-category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Filter (Optional)
              </label>
              <select
                id="ai-category"
                value={selectedCategory || ""}
                onChange={(e) =>
                  setSelectedCategory(
                    (e.target.value as TranscriptCategory) || undefined
                  )
                }
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
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
                htmlFor="topics-count"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Number of Topics
              </label>
              <input
                type="number"
                id="topics-count"
                min="1"
                max="50"
                value={topicsCount}
                onChange={(e) => setTopicsCount(parseInt(e.target.value) || 10)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleExtractTopics}
            disabled={topicsLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {topicsLoading && <LoadingSpinner size="sm" className="mr-2" />}
            {topicsLoading
              ? "Extracting Topics..."
              : "🤖 Extract Topics with AI"}
          </button>

          {topicsError && <ErrorMessage message={topicsError} />}

          {topics.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-gray-900">
                AI-Extracted Topics
              </h4>
              {topics.map((topic, index) => (
                <div
                  key={topic.topic}
                  className="border border-gray-200 rounded-lg p-4 bg-purple-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h5 className="text-lg font-medium text-purple-900 capitalize">
                          {topic.topic}
                        </h5>
                        <Badge variant="secondary">#{index + 1}</Badge>
                        <Badge variant="default">AI Generated</Badge>
                      </div>
                      <p className="text-sm text-purple-700 mt-1">
                        {topic.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {topic.frequency}
                      </div>
                      <div className="text-sm text-purple-500">occurrences</div>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-purple-700 mb-2">
                      Related Transcripts ({topic.relevantTranscripts.length})
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {topic.relevantTranscripts
                        .slice(0, 6)
                        .map((transcriptId) => (
                          <Badge key={transcriptId} variant="default" size="sm">
                            {transcriptId}
                          </Badge>
                        ))}
                      {topic.relevantTranscripts.length > 6 && (
                        <Badge variant="secondary" size="sm">
                          +{topic.relevantTranscripts.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Bulk AI Classification */}
      <Card
        title="Bulk AI Classification"
        subtitle="Classify all transcripts automatically (heavy operation)"
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    This operation will process ALL transcripts in your system
                    using AI. It may consume a significant number of tokens and
                    take several minutes to complete.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleBulkClassify}
            disabled={bulkLoading}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {bulkLoading && <LoadingSpinner size="sm" className="mr-2" />}
            {bulkLoading
              ? "Processing All Transcripts..."
              : "⚡ Classify All Transcripts with AI"}
          </button>

          {bulkError && <ErrorMessage message={bulkError} />}

          {bulkResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-green-900 mb-3">
                Bulk Classification Complete
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-green-900">
                    {bulkResult.totalProcessed}
                  </div>
                  <div className="text-green-600">Total Processed</div>
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {bulkResult.successful}
                  </div>
                  <div className="text-green-600">Successful</div>
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    {bulkResult.failed}
                  </div>
                  <div className="text-green-600">Failed</div>
                </div>
                <div>
                  <div className="font-semibold text-green-900">
                    ${bulkResult.estimatedCost.toFixed(2)}
                  </div>
                  <div className="text-green-600">Estimated Cost</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-sm text-green-700">
                  Processing time: {bulkResult.processingTime}
                </div>
                {bulkResult.note && (
                  <div className="text-sm text-green-600 mt-1">
                    {bulkResult.note}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
