"use client";

import React from "react";
import { AIAnalysisPanel } from "@/components/ai/AIAnalysisPanel";

export default function AIPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Analysis</h1>
        <p className="mt-2 text-gray-600">
          Advanced AI-powered analysis using OpenAI. These operations consume
          tokens and may incur costs.
        </p>
      </div>

      {/* AI Analysis Panel */}
      <AIAnalysisPanel />
    </div>
  );
}
