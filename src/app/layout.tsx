import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";
import { BackendStatus } from "@/components/ui/BackendStatus";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Transcripts Analyzer",
  description: "Analyze and search through transcripts using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Runtime configuration - Force Azure URL in production
  const isProduction = process.env.NODE_ENV === "production";
  const runtimeConfig = {
    apiUrl: isProduction
      ? "https://ai-transcripts-analyzer-backend.azurewebsites.net"
      : process.env.NEXT_PUBLIC_API_URL ||
        "https://ai-transcripts-analyzer-backend.azurewebsites.net",
  };

  console.log("Layout - Environment:", process.env.NODE_ENV);
  console.log("Layout - Runtime config:", runtimeConfig);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__RUNTIME_CONFIG__ = ${JSON.stringify(
              runtimeConfig
            )};`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="ai-transcripts-theme">
          <AppLayout>{children}</AppLayout>
          <BackendStatus />
        </ThemeProvider>
      </body>
    </html>
  );
}
