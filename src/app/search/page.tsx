"use client";

import React from "react";
import { SearchForm } from "@/components/search/SearchForm";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search Transcripts</h1>
        <p className="mt-2 text-gray-600">
          Find specific transcripts using keywords, categories, and filters.
          Fast local search with no AI tokens consumed.
        </p>
      </div>

      {/* Search Interface */}
      <SearchForm />
    </div>
  );
}
