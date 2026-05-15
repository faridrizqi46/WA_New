"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface FacilitiesTabProps { company: CompanyDetail; }

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  EXPIRED: "bg-red-100 text-red-800 border-red-200",
  PENDING_RENEWAL: "bg-yellow-100 text-yellow-900 border-yellow-200",
};

export function FacilitiesTab({ company }: FacilitiesTabProps) {
  const fmt = (v: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  const totals = company.facilities.reduce(
    (acc, f) => ({ limit: acc.limit + f.limit, outstanding: acc.outstanding + f.outstanding }),
    { limit: 0, outstanding: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Limit</p>
            <p className="text-2xl font-bold mt-1">{fmt(totals.limit)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Outstanding</p>
            <p className="text-2xl font-bold mt-1">{fmt(totals.outstanding)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Utilization</p>
            <p className={`text-2xl font-bold mt-1 ${company.utilizationPct > 90 ? "text-red-600" : ""}`}>{company.utilizationPct}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Facilities List */}
      <div className="space-y-4">
        {company.facilities.map((facility) => (
          <Card key={facility.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  {facility.type}
                </CardTitle>
                <Badge variant="outline" className={statusStyles[facility.status]}>
                  {facility.status.replace("_", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Limit</p>
                  <p className="text-sm font-semibold mt-0.5">{fmt(facility.limit)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Outstanding</p>
                  <p className="text-sm font-semibold mt-0.5">{fmt(facility.outstanding)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Interest Rate</p>
                  <p className="text-sm font-semibold mt-0.5">{facility.interestRate}% p.a.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Maturity</p>
                  <p className="text-sm font-semibold mt-0.5">{new Date(facility.maturityDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
              {/* Utilization bar */}
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Utilization</span>
                  <span className={facility.utilizationPct > 90 ? "text-red-600 font-medium" : ""}>{facility.utilizationPct}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${facility.utilizationPct > 90 ? "bg-red-500" : facility.utilizationPct > 75 ? "bg-yellow-500" : "bg-primary"}`}
                    style={{ width: `${facility.utilizationPct}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Collateral Coverage: <span className={`font-medium ${facility.collateralCoverage < 100 ? "text-red-600" : "text-foreground"}`}>{facility.collateralCoverage}%</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
