"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { TranscriptDetail } from "@/components/transcripts/TranscriptDetail";

export default function TranscriptPage() {
  const params = useParams();
  const router = useRouter();
  const transcriptId = params.id as string;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Transcript Detail
          </h1>
          <p className="mt-2 text-muted-foreground">
            Detailed view of transcript: {transcriptId}
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-input rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
        >
          ← Back
        </button>
      </div>

      {/* Transcript Detail */}
      <TranscriptDetail transcriptId={transcriptId} />
    </div>
  );
}
