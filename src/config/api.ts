export const getApiBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return (
      window.__RUNTIME_CONFIG__?.apiUrl ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3000"
    );
  }

  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "http://localhost:3000"
  );
};

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: {
      apiUrl: string;
    };
  }
}
