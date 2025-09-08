"use client";

import React from "react";
import { useTranscript } from "@/hooks/useTranscripts";
import { TranscriptCategory } from "@/types/transcript";
import {
  LoadingSpinner,
  ErrorMessage,
  Badge,
  Card,
} from "@/components/ui/common";
import { TranscriptAIActions } from "@/components/ai/TranscriptAIActions";

interface TranscriptDetailProps {
  transcriptId: string;
}

export function TranscriptDetail({ transcriptId }: TranscriptDetailProps) {
  const { transcript, loading, error } = useTranscript(transcriptId);

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

  const getBadgeVariant = (category: TranscriptCategory) => {
    const variants = {
      [TranscriptCategory.TECHNICAL_ISSUES]: "danger" as const,
      [TranscriptCategory.BILLING_ISSUES]: "warning" as const,
      [TranscriptCategory.COMMERCIAL_SUPPORT]: "success" as const,
      [TranscriptCategory.ADMINISTRATIVE_REQUESTS]: "secondary" as const,
      [TranscriptCategory.SERVICE_ACTIVATION]: "default" as const,
      [TranscriptCategory.COMPLAINTS_CLAIMS]: "danger" as const,
    };
    return variants[category];
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      case "neutral":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <Card title="Loading Transcript...">
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Transcript Detail">
        <ErrorMessage message={error} />
      </Card>
    );
  }

  if (!transcript) {
    return (
      <Card title="Transcript Not Found">
        <div className="text-center py-8 text-gray-500">
          The requested transcript could not be found.
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card title={transcript.fileName} subtitle={`ID: ${transcript.id}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500">Category</div>
            <Badge variant={getBadgeVariant(transcript.category)}>
              {getCategoryLabel(transcript.category)}
            </Badge>
          </div>
          <div>
            <div className="text-sm text-gray-500">Duration</div>
            <div className="font-medium">{transcript.duration}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Messages</div>
            <div className="font-medium">{transcript.messages.length}</div>
          </div>
          {transcript.sentiment && (
            <div>
              <div className="text-sm text-gray-500">Sentiment</div>
              <div
                className={`font-medium capitalize ${getSentimentColor(
                  transcript.sentiment
                )}`}
              >
                {transcript.sentiment}
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
          <p className="text-gray-800">{transcript.summary}</p>
        </div>

        {transcript.topics && transcript.topics.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Topics</h4>
            <div className="flex flex-wrap gap-1">
              {transcript.topics.map((topic) => (
                <Badge key={topic} variant="secondary" size="sm">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Messages */}
      <Card
        title="Conversation"
        subtitle={`${transcript.messages.length} messages`}
      >
        <div className="space-y-4">
          {transcript.messages.map((message, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-4 last:border-b-0"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      message.speaker === "AGENT" ? "secondary" : "default"
                    }
                    size="sm"
                  >
                    {message.speaker}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {message.timestamp}
                  </span>
                </div>
              </div>
              <div className="text-gray-800 leading-relaxed">
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Actions */}
      <Card title="AI Analysis" subtitle="Use AI to analyze this transcript">
        <TranscriptAIActions
          transcriptId={transcript.id}
          currentCategory={transcript.category}
          currentSummary={transcript.summary}
        />
      </Card>
    </div>
  );
}
