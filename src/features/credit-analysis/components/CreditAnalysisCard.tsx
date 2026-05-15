"use client";

import { CreditAnalysis } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, User, FileText } from "lucide-react";
import { format } from "date-fns";

interface CreditAnalysisCardProps {
  analysis: CreditAnalysis;
  onClick: (analysis: CreditAnalysis) => void;
}

const statusConfig = {
  DRAFT: { label: "Draft", color: "bg-slate-100 text-slate-700 dark:bg-slate-900/50 dark:text-slate-400" },
  IN_REVIEW: { label: "In Review", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  APPROVED: { label: "Approved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
};

export function CreditAnalysisCard({ analysis, onClick }: CreditAnalysisCardProps) {
  const status = statusConfig[analysis.status];
  const latestDSCR = analysis.financialData.dscr[analysis.financialData.dscr.length - 1]?.value || 0;
  const dscrColor = latestDSCR >= 1.2 ? "text-emerald-600" : latestDSCR >= 1.0 ? "text-amber-600" : "text-red-600";

  return (
    <Card className="group hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(analysis)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-xs ${status.color}`}>{status.label}</Badge>
            </div>

            <h3 className="font-semibold text-sm mb-1">{analysis.companyName}</h3>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(analysis.analysisDate), "MMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{analysis.analystName}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className={`text-lg font-bold ${dscrColor}`}>{latestDSCR.toFixed(2)}x</p>
              <p className="text-[10px] text-muted-foreground">DSCR</p>
            </div>
            <Button size="sm" variant="outline" className="h-7 px-2.5 gap-1">
              <FileText className="h-3 w-3" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}