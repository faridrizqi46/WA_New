"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAIInsights } from "../hooks/useDashboardData";
import { Bot, TrendingUp, AlertTriangle, Info } from "lucide-react";

export function AIInsightsFeed() {
  const { data: insightsRes, isLoading } = useAIInsights();
  const insights = insightsRes?.data || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "OPPORTUNITY":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "RISK":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "INFO":
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-semibold">AI Insights</CardTitle>
        </div>
        <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full text-primary font-medium">
          Live
        </span>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {insights.map((insight) => (
              <div key={insight.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                    {getIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{insight.title}</h4>
                    {insight.companyName && (
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">
                        {insight.companyName}
                      </p>
                    )}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-snug">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {insights.length === 0 && (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No new insights at this time.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
