"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Lightbulb, Bot } from "lucide-react";

interface Anomaly {
  description: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

interface AIAnalysisBlockProps {
  strengths: string[];
  weaknesses: string[];
  anomalies: Anomaly[];
  riskSummary: string;
  recommendation: string;
}

export function AIAnalysisBlock({
  strengths,
  weaknesses,
  anomalies,
  riskSummary,
  recommendation,
}: AIAnalysisBlockProps) {
  const severityConfig = {
    HIGH: { color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: AlertTriangle },
    MEDIUM: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: AlertTriangle },
    LOW: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: AlertTriangle },
  };

  return (
    <Card className="border-indigo-200 dark:border-indigo-900/50">
      <CardHeader className="pb-2 bg-indigo-50/50 dark:bg-indigo-950/20">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {strengths.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Strengths</h4>
            </div>
            <ul className="space-y-1.5 pl-6">
              {strengths.map((s, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {weaknesses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-semibold text-red-700 dark:text-red-400">Weaknesses</h4>
            </div>
            <ul className="space-y-1.5 pl-6">
              {weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {anomalies.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400">Anomaly Detection</h4>
            </div>
            <div className="space-y-2">
              {anomalies.map((a, i) => {
                const config = severityConfig[a.severity];
                return (
                  <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${config.color}`}>
                    <config.icon className="h-3 w-3 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">{a.description}</p>
                      <Badge variant="outline" className={`text-[10px] h-4 mt-1 ${config.color}`}>
                        {a.severity}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {riskSummary && (
          <div className="p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Risk Summary</h4>
            </div>
            <p className="text-sm leading-relaxed">{riskSummary}</p>
          </div>
        )}

        {recommendation && (
          <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">Recommendation</h4>
            </div>
            <p className="text-sm leading-relaxed font-medium">{recommendation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}