"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark } from "lucide-react";
import { format } from "date-fns";

interface CollateralTabProps { company: CompanyDetail; }

const statusStyles: Record<string, string> = {
  VALID: "bg-emerald-100 text-emerald-800 border-emerald-200",
  EXPIRED: "bg-red-100 text-red-800 border-red-200",
  PENDING_APPRAISAL: "bg-yellow-100 text-yellow-900 border-yellow-200",
};

export function CollateralTab({ company }: CollateralTabProps) {
  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);
  const totalValue = company.collaterals.reduce((s, c) => s + c.appraisedValue, 0);
  const totalExposure = company.totalExposure;
  const coverageRatio = totalExposure > 0 ? Math.round((totalValue / totalExposure) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="pt-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Appraised Value</p>
          <p className="text-2xl font-bold mt-1">{fmt(totalValue)}</p>
        </CardContent></Card>
        <Card><CardContent className="pt-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Exposure</p>
          <p className="text-2xl font-bold mt-1">{fmt(totalExposure)}</p>
        </CardContent></Card>
        <Card><CardContent className="pt-5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Overall Coverage</p>
          <p className={`text-2xl font-bold mt-1 ${coverageRatio < 100 ? "text-red-600" : "text-emerald-600"}`}>{coverageRatio}%</p>
        </CardContent></Card>
      </div>

      <div className="space-y-4">
        {company.collaterals.map((col) => (
          <Card key={col.id}>
            <CardContent className="py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                    <Landmark className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{col.type}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{col.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">Appraised: <span className="font-medium text-foreground">{fmt(col.appraisedValue)}</span></span>
                      <span className="text-xs text-muted-foreground">Date: <span className="font-medium text-foreground">{format(new Date(col.appraisalDate), "dd MMM yyyy")}</span></span>
                      <span className="text-xs text-muted-foreground">Coverage: <span className={`font-medium ${col.coverageRatio < 100 ? "text-red-600" : "text-foreground"}`}>{col.coverageRatio}%</span></span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={`flex-shrink-0 ${statusStyles[col.status]}`}>
                  {col.status.replace("_", " ")}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
