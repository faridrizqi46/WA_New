"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, TrendingUp, AlertTriangle, Info } from "lucide-react";

interface AIInsightsTabProps { company: CompanyDetail; }

const iconMap = {
  OPPORTUNITY: <TrendingUp className="h-4 w-4 text-emerald-500" />,
  RISK: <AlertTriangle className="h-4 w-4 text-red-500" />,
  INFO: <Info className="h-4 w-4 text-blue-500" />,
};

const bgMap = {
  OPPORTUNITY: "border-emerald-200 bg-emerald-50/50",
  RISK: "border-red-200 bg-red-50/50",
  INFO: "border-blue-200 bg-blue-50/50",
};

export function AIInsightsTab({ company }: AIInsightsTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 rounded-xl border border-primary/20 bg-primary/5 mb-2">
        <Bot className="h-5 w-5 text-primary flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          AI insights are generated from financial trends, market data, and portfolio signals. They are advisory and should be reviewed by the RM.
        </p>
      </div>
      {company.aiInsights.map((insight) => (
        <Card key={insight.id} className={`border ${bgMap[insight.type]}`}>
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              {iconMap[insight.type]}
              {insight.title}
              <span className="ml-auto text-[10px] font-normal text-muted-foreground uppercase tracking-wider">{insight.type}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm leading-relaxed">{insight.description}</p>
            <p className="text-xs text-muted-foreground mt-3">
              {new Date(insight.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </CardContent>
        </Card>
      ))}
      {company.aiInsights.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground text-sm">
            No AI insights available.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
