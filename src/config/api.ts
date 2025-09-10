export const getApiBaseUrl = (): string => {
  // In browser environment
  if (typeof window !== "undefined") {
    // ALWAYS prioritize runtime config (injected by server)
    if (window.__RUNTIME_CONFIG__?.apiUrl) {
      console.log(
        "✅ Using runtime config API URL:",
        window.__RUNTIME_CONFIG__.apiUrl
      );
      return window.__RUNTIME_CONFIG__.apiUrl;
    }

    // Force Azure URL in production as fallback
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      console.log("✅ Using production Azure API URL");
      return "https://ai-transcripts-analyzer-backend.azurewebsites.net";
    }

    // Development fallback
    const devUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://ai-transcripts-analyzer-backend.azurewebsites.net";
    console.log("✅ Using development API URL:", devUrl);
    return devUrl;
  }

  // In server environment
  const isProduction = process.env.NODE_ENV === "production";
  const apiUrl = isProduction
    ? "https://ai-transcripts-analyzer-backend.azurewebsites.net"
    : process.env.NEXT_PUBLIC_API_URL ||
      "https://ai-transcripts-analyzer-backend.azurewebsites.net";

  console.log("✅ Server-side API URL:", apiUrl);
  return apiUrl;
};

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: {
      apiUrl: string;
    };
  }
}
