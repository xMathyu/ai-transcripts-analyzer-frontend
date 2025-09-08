"use client";

import React from "react";
import { StatisticsPanel } from "@/components/analytics/StatisticsPanel";
import { FrequentTopics } from "@/components/analytics/FrequentTopics";
import { SearchForm } from "@/components/search/SearchForm";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your transcript analysis system with key metrics and quick
          search.
        </p>
      </div>

      {/* Statistics Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          System Statistics
        </h2>
        <StatisticsPanel />
      </div>

      {/* Quick Search Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Search
        </h2>
        <div className="max-w-4xl">
          <SearchForm />
        </div>
      </div>

      {/* Frequent Topics Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Trending Topics
        </h2>
        <FrequentTopics />
      </div>
    </div>
  );
}
