"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";

interface RiskTabProps { company: CompanyDetail; }

const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
const severityStyles: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-800 border-red-200",
  HIGH: "bg-orange-100 text-orange-900 border-orange-200",
  MEDIUM: "bg-yellow-100 text-yellow-900 border-yellow-200",
  LOW: "bg-blue-100 text-blue-800 border-blue-200",
};
const categoryStyles: Record<string, string> = {
  FINANCIAL: "bg-purple-100 text-purple-800",
  OPERATIONAL: "bg-slate-100 text-slate-700",
  LEGAL: "bg-red-50 text-red-700",
  COMPLIANCE: "bg-orange-50 text-orange-700",
  UTILIZATION: "bg-blue-50 text-blue-700",
  FRAUD: "bg-rose-100 text-rose-800",
};

export function RiskTab({ company }: RiskTabProps) {
  const alerts = [...company.riskAlerts].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <ShieldAlert className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
          <p className="text-sm font-medium">No active risk alerts</p>
          <p className="text-xs text-muted-foreground mt-1">This company has a clean risk profile.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert className="h-5 w-5 text-red-500" />
        <h2 className="text-base font-semibold">{alerts.length} Active Alert{alerts.length > 1 ? "s" : ""}</h2>
      </div>
      {alerts.map((alert) => (
        <Card key={alert.id} className={`border-l-4 ${alert.severity === "CRITICAL" ? "border-l-red-600" : alert.severity === "HIGH" ? "border-l-orange-500" : alert.severity === "MEDIUM" ? "border-l-yellow-500" : "border-l-blue-400"}`}>
          <CardHeader className="pb-2 pt-4">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-sm font-semibold">{alert.title}</CardTitle>
              <div className="flex gap-2 flex-shrink-0">
                <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-wider ${severityStyles[alert.severity]}`}>
                  {alert.severity}
                </Badge>
                <Badge variant="secondary" className={`text-[10px] uppercase font-medium ${categoryStyles[alert.category]}`}>
                  {alert.category}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{alert.description}</p>
            <p className="text-xs text-muted-foreground mt-3">
              {new Date(alert.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
