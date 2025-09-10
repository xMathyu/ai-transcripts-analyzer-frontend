"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

export function BackendStatus() {
  const [isOnline, setIsOnline] = React.useState<boolean | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL ||
            "https://ai-transcripts-analyzer-backend.azurewebsites.net"
          }/api/transcripts/statistics`
        );
        setIsOnline(response.ok);
      } catch {
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    checkBackendStatus();

    const interval = setInterval(checkBackendStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return null;
  }

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="border-red-200 bg-red-50">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div>
            <h4 className="text-sm font-medium text-red-800">
              Backend Not Available
            </h4>
            <p className="text-xs text-red-600 mt-1">
              Cannot connect to the API server. Please ensure your backend is
              running on{" "}
              <code className="bg-red-100 px-1 rounded">
                {process.env.NEXT_PUBLIC_API_URL ||
                  "https://ai-transcripts-analyzer-backend.azurewebsites.net"}
              </code>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
