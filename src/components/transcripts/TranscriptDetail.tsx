"use client";

import React from "react";
import { useTranscript } from "@/hooks/useTranscripts";
import { TranscriptCategory } from "@/types/transcript";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/common";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
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
      [TranscriptCategory.TECHNICAL_ISSUES]: "destructive" as const,
      [TranscriptCategory.BILLING_ISSUES]: "warning" as const,
      [TranscriptCategory.COMMERCIAL_SUPPORT]: "success" as const,
      [TranscriptCategory.ADMINISTRATIVE_REQUESTS]: "secondary" as const,
      [TranscriptCategory.SERVICE_ACTIVATION]: "default" as const,
      [TranscriptCategory.COMPLAINTS_CLAIMS]: "destructive" as const,
    };
    return variants[category];
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case "positive":
        return "text-green-600 dark:text-green-400";
      case "negative":
        return "text-red-600 dark:text-red-400";
      case "neutral":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Transcript...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transcript Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorMessage message={error} />
        </CardContent>
      </Card>
    );
  }

  if (!transcript) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transcript Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            The requested transcript could not be found.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>{transcript.fileName}</CardTitle>
          <p className="text-sm text-muted-foreground">ID: {transcript.id}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Category</div>
              <Badge variant={getBadgeVariant(transcript.category)}>
                {getCategoryLabel(transcript.category)}
              </Badge>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-medium text-foreground">
                {transcript.duration}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Messages</div>
              <div className="font-medium text-foreground">
                {transcript.messages.length}
              </div>
            </div>
            {transcript.sentiment && (
              <div>
                <div className="text-sm text-muted-foreground">Sentiment</div>
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
            <h4 className="text-sm font-medium text-foreground mb-2">
              Summary
            </h4>
            <p className="text-foreground">{transcript.summary}</p>
          </div>

          {transcript.topics && transcript.topics.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Topics
              </h4>
              <div className="flex flex-wrap gap-1">
                {transcript.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <p className="text-sm text-muted-foreground">
            {transcript.messages.length} messages
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transcript.messages.map((message, index) => (
              <div
                key={index}
                className="border-b border-border pb-4 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        message.speaker === "AGENT" ? "secondary" : "default"
                      }
                    >
                      {message.speaker}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                </div>
                <div className="text-foreground leading-relaxed">
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Actions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Use AI to analyze this transcript
          </p>
        </CardHeader>
        <CardContent>
          <TranscriptAIActions
            transcriptId={transcript.id}
            currentCategory={transcript.category}
            currentSummary={transcript.summary}
          />
        </CardContent>
      </Card>
    </div>
  );
}
