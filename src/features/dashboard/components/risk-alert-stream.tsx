"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useRiskAlerts } from "../hooks/useDashboardData";
import { ShieldAlert } from "lucide-react";

export function RiskAlertStream() {
  const { data: alertsRes, isLoading } = useRiskAlerts();
  const alerts = alertsRes?.data || [];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "LOW":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-red-500" />
          <CardTitle className="text-base font-semibold">Risk Alert Stream</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-sm font-semibold">{alert.title}</h4>
                  <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${getSeverityStyles(alert.severity)}`}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {alert.companyName} <span className="text-muted-foreground font-normal">• {alert.category}</span>
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
                  {alert.description}
                </p>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No active risk alerts.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
