"use client";

import React from "react";
import { TranscriptsList } from "@/components/transcripts/TranscriptsList";

export default function TranscriptsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Transcripts</h1>
        <p className="mt-2 text-gray-600">
          Browse, filter, and manage all available transcripts in your system.
        </p>
      </div>

      {/* Transcripts List */}
      <TranscriptsList />
    </div>
  );
}
