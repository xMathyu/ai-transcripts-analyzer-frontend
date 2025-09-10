export const getApiBaseUrl = (): string => {
  // In browser environment
  if (typeof window !== "undefined") {
    // First try runtime config (injected by server)
    if (window.__RUNTIME_CONFIG__?.apiUrl) {
      console.log(
        "Using runtime config API URL:",
        window.__RUNTIME_CONFIG__.apiUrl
      );
      return window.__RUNTIME_CONFIG__.apiUrl;
    }

    // Fallback to build-time env var
    if (process.env.NEXT_PUBLIC_API_URL) {
      console.log("Using build-time API URL:", process.env.NEXT_PUBLIC_API_URL);
      return process.env.NEXT_PUBLIC_API_URL;
    }

    console.log("Using default localhost API URL");
    return "https://ai-transcripts-analyzer-backend.azurewebsites.net";
  }

  // In server environment
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://ai-transcripts-analyzer-backend.azurewebsites.net";

  console.log("Server-side API URL:", apiUrl);
  return apiUrl;
};

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: {
      apiUrl: string;
    };
  }
}
