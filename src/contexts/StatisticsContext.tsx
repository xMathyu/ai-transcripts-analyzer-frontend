"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface StatisticsContextType {
  triggerRefresh: () => void;
}

const StatisticsContext = createContext<StatisticsContextType | undefined>(
  undefined
);

export function useStatisticsContext() {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error(
      "useStatisticsContext must be used within a StatisticsProvider"
    );
  }
  return context;
}

interface StatisticsProviderProps {
  children: ReactNode;
  onRefresh: () => void;
}

export function StatisticsProvider({
  children,
  onRefresh,
}: StatisticsProviderProps) {
  return (
    <StatisticsContext.Provider value={{ triggerRefresh: onRefresh }}>
      {children}
    </StatisticsContext.Provider>
  );
}
