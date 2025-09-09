"use client";

import React from "react";
import { useAIClassification, useAISummary } from "@/hooks/useAI";
import { TranscriptCategory } from "@/types/transcript";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/common";
import { Badge } from "@/components/ui/Badge";

interface TranscriptAIActionsProps {
  transcriptId: string;
  currentCategory?: TranscriptCategory;
  currentSummary?: string;
}

export function TranscriptAIActions({
  transcriptId,
  currentCategory,
  currentSummary,
}: TranscriptAIActionsProps) {
  const {
    result: classificationResult,
    loading: classifyLoading,
    error: classifyError,
    classifyTranscript,
  } = useAIClassification();
  const {
    summary: aiSummary,
    loading: summaryLoading,
    error: summaryError,
    generateSummary,
  } = useAISummary();

  const getCategoryLabel = (cat: string) => {
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

  const getBadgeVariant = (category: string) => {
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

  const handleClassify = () => {
    classifyTranscript(transcriptId);
  };

  const handleGenerateSummary = () => {
    generateSummary(transcriptId);
  };

  return (
    <div className="space-y-4">
      {/* AI Classification */}
      <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-medium text-purple-900 dark:text-purple-100">
            AI Classification
          </h4>
          {currentCategory && (
            <Badge variant={getBadgeVariant(currentCategory)}>
              {getCategoryLabel(currentCategory)}
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleClassify}
            disabled={classifyLoading}
            className="w-full bg-purple-600 dark:bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-700 dark:hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-purple-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {classifyLoading && <LoadingSpinner size="sm" className="mr-2" />}
            {classifyLoading ? "Classifying..." : "🤖 Classify with AI"}
          </button>

          {classifyError && <ErrorMessage message={classifyError} />}

          {classificationResult && (
            <div className="bg-white dark:bg-purple-900 border border-purple-300 dark:border-purple-700 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={getBadgeVariant(classificationResult.category)}>
                  {getCategoryLabel(classificationResult.category)}
                </Badge>
                <span className="text-sm text-purple-600 dark:text-purple-300">
                  Confidence:{" "}
                  {(classificationResult.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-200">
                {classificationResult.reasoning}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Summary Generation */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-medium text-blue-900 dark:text-blue-100">
            AI Summary
          </h4>
          {currentSummary && <Badge variant="secondary">Has Summary</Badge>}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGenerateSummary}
            disabled={summaryLoading}
            className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-blue-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {summaryLoading && <LoadingSpinner size="sm" className="mr-2" />}
            {summaryLoading
              ? "Generating Summary..."
              : "📝 Generate AI Summary"}
          </button>

          {summaryError && <ErrorMessage message={summaryError} />}

          {aiSummary && (
            <div className="bg-white dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  AI Generated Summary
                </span>
                <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-300">
                  <span>{aiSummary.wordCount} words</span>
                  <span>•</span>
                  <span>
                    {new Date(aiSummary.generatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {aiSummary.summary}
              </p>
            </div>
          )}

          {currentSummary && !aiSummary && (
            <div className="bg-white dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-md p-3">
              <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Current Summary
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {currentSummary}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Budget Warning */}
      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
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
          <div className="ml-2">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              AI operations consume OpenAI tokens and may incur costs. Check
              your budget in the analytics section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
