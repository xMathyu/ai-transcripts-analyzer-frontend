"use client";

import React from "react";
import { StatisticsPanel } from "@/components/analytics/StatisticsPanel";
import { FrequentTopics } from "@/components/analytics/FrequentTopics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">
          Comprehensive analytics and insights about your transcript data, AI
          usage, and system performance.
        </p>
      </div>

      {/* Statistics Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          System Statistics
        </h2>
        <StatisticsPanel />
      </div>

      {/* Topics Analysis */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Topic Analysis
        </h2>
        <FrequentTopics />
      </div>
    </div>
  );
}
