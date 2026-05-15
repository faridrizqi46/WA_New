"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanyDetail } from "@/types";
import { ChevronRight, AlertTriangle, Building2 } from "lucide-react";

interface CompanyHeaderProps {
  company: CompanyDetail | undefined;
  isLoading: boolean;
}

const riskColors: Record<string, string> = {
  LOW: "bg-emerald-100 text-emerald-800 border-emerald-200",
  MEDIUM: "bg-yellow-100 text-yellow-900 border-yellow-200",
  HIGH: "bg-orange-100 text-orange-900 border-orange-200",
  VERY_HIGH: "bg-red-100 text-red-800 border-red-200",
  CRITICAL: "bg-red-600 text-white border-red-700",
};

export function CompanyHeader({ company, isLoading }: CompanyHeaderProps) {
  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(v);

  if (isLoading) {
    return (
      <div className="border-b bg-background pb-5 pt-4 px-6 space-y-4">
        <Skeleton className="h-4 w-40" />
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-14 w-32 rounded-lg" />)}
        </div>
      </div>
    );
  }

  if (!company) return null;

  const kpis = [
    { label: "Total Exposure", value: formatCurrency(company.totalExposure) },
    { label: "Utilization", value: `${company.utilizationPct}%`, highlight: company.utilizationPct > 90 },
    { label: "Active Facilities", value: company.facilities.length },
    { label: "Active Alerts", value: company.activeAlerts, highlight: company.activeAlerts > 0 },
  ];

  return (
    <div className="border-b bg-background pb-4 pt-3 px-6 shadow-sm">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
        <Link href="/companies" className="hover:text-foreground transition-colors">Companies</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium truncate">{company.name}</span>
      </nav>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
              <Badge variant="outline" className={riskColors[company.riskRating]}>
                {company.riskRating.replace("_", " ")} Risk
              </Badge>
              {company.activeAlerts > 0 && (
                <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700 gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {company.activeAlerts} Alert{company.activeAlerts > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              {company.groupName ? `${company.groupName} • ` : ""}{company.industry} • {company.region}
            </p>
          </div>
        </div>

        {/* KPI Pills */}
        <div className="flex gap-3 flex-wrap">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className={`flex flex-col items-center justify-center rounded-xl border px-4 py-2 min-w-[90px] text-center ${kpi.highlight ? "border-red-200 bg-red-50" : "border-border bg-muted/40"}`}
            >
              <span className={`text-lg font-bold ${kpi.highlight ? "text-red-600" : ""}`}>{kpi.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mt-0.5">{kpi.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
