"use client";

import React from "react";
import { StatisticsPanel } from "@/components/analytics/StatisticsPanel";
import { FrequentTopics } from "@/components/analytics/FrequentTopics";
import { SearchForm } from "@/components/search/SearchForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  TrendingUp,
  FileText,
  Brain,
  Zap,
  ArrowRight,
  Activity,
  Clock,
  Users,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl" />
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                Your AI-powered transcript analysis dashboard is ready to go.
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="success" className="px-3 py-1">
                  <Activity className="w-3 h-3 mr-1" />
                  System Active
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Clock className="w-3 h-3 mr-1" />
                  Last updated: 2 min ago
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl">
                <Brain className="w-16 h-16 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-all duration-200 cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Upload Transcript</CardTitle>
                <CardDescription>
                  Add new transcripts for analysis
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              className="w-full group-hover:shadow-lg transition-all"
              size="sm"
            >
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-200 hover:border-purple-300 transition-all duration-200 cursor-pointer group dark:border-purple-800 dark:hover:border-purple-700">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors dark:bg-purple-900 dark:group-hover:bg-purple-800">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Analysis</CardTitle>
                <CardDescription>Start intelligent analysis</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              variant="outline"
              className="w-full group-hover:shadow-lg transition-all"
              size="sm"
            >
              Analyze Now <Brain className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 hover:border-emerald-300 transition-all duration-200 cursor-pointer group dark:border-emerald-800 dark:hover:border-emerald-700">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors dark:bg-emerald-900 dark:group-hover:bg-emerald-800">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <CardTitle className="text-lg">View Analytics</CardTitle>
                <CardDescription>Explore trends and insights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              variant="outline"
              className="w-full group-hover:shadow-lg transition-all"
              size="sm"
            >
              View Reports <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Section */}
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Activity className="w-6 h-6 mr-2 text-primary" />
                System Statistics
              </CardTitle>
              <CardDescription>
                Real-time metrics and performance data
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <Users className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <StatisticsPanel />
        </CardContent>
      </Card>

      {/* Quick Search Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Zap className="w-6 h-6 mr-2 text-primary" />
            Quick Search
          </CardTitle>
          <CardDescription>
            Search through your transcripts using natural language or keywords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchForm />
        </CardContent>
      </Card>

      {/* Frequent Topics Section */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-primary" />
            Trending Topics
          </CardTitle>
          <CardDescription>
            Discover the most discussed topics across your transcripts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FrequentTopics />
        </CardContent>
      </Card>
    </div>
  );
}
