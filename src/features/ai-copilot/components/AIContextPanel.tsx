"use client";

import { Company, RiskAlert } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Building2, AlertTriangle, TrendingUp, DollarSign, Percent, Activity } from "lucide-react";

interface AIContextPanelProps {
  company: Company | null;
  alerts: RiskAlert[];
  summary?: string;
}

export function AIContextPanel({ company, alerts, summary }: AIContextPanelProps) {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-indigo-600" aria-hidden="true" />
          <h3 className="font-semibold text-sm">Active Context</h3>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {company ? (
          <>
            <div className="p-3 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{company.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {company.industry}
                </Badge>
              </div>
              {company.groupName && (
                <p className="text-xs text-muted-foreground mb-2">{company.groupName}</p>
              )}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Exposure:</span>
                  <span className="font-medium">${(company.totalExposure / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center gap-1">
                  <Percent className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Utilization:</span>
                  <span className="font-medium">{company.utilizationPct}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Risk:</span>
                  <span className={`font-medium ${company.riskRating === "HIGH" || company.riskRating === "CRITICAL" ? "text-red-600" : ""}`}>
                    {company.riskRating}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">Alerts:</span>
                  <span className={`font-medium ${company.activeAlerts > 0 ? "text-red-600" : ""}`}>
                    {company.activeAlerts}
                  </span>
                </div>
              </div>
            </div>

            {alerts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent Alerts</h4>
                {alerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="p-2 rounded-lg border bg-card">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className={`h-3 w-3 mt-0.5 ${
                        alert.severity === "CRITICAL" ? "text-red-600" :
                        alert.severity === "HIGH" ? "text-orange-600" :
                        "text-yellow-600"
                      }`} aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium line-clamp-1">{alert.title}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">{alert.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {summary && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI Summary</h4>
                <div className="p-3 rounded-lg border bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900">
                  <p className="text-xs leading-relaxed">{summary}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-center">
            <Building2 className="h-10 w-10 mb-3 opacity-20" aria-hidden="true" />
            <p className="text-sm font-medium">No company selected</p>
            <p className="text-xs mt-1 max-w-[200px]">
              Select a company from the list or use the chat to select context
            </p>
          </div>
        )}
      </div>
    </div>
  );
}