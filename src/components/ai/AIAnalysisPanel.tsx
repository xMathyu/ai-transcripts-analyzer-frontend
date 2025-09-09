"use client";

import React from "react";
import { useAIBulkClassification } from "@/hooks/useAI";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function AIAnalysisPanel() {
  const {
    result: bulkResult,
    loading: bulkLoading,
    error: bulkError,
    classifyAll,
  } = useAIBulkClassification();

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
      {/* Bulk AI Classification */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk AI Classification</CardTitle>
          <p className="text-sm text-muted-foreground">
            Classify all transcripts automatically (heavy operation)
          </p>
        </CardHeader>
        <CardContent>
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
                  <h3 className="text-sm font-medium text-yellow-800">
                    Warning
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      This operation will process ALL transcripts in your system
                      using AI. It may consume a significant number of tokens
                      and take several minutes to complete.
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
        </CardContent>
      </Card>
    </div>
  );
}
