"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useCreditAnalysis } from "@/features/credit-analysis/hooks/useCreditAnalyses";
import { RevenueChart, EBITDAChart, NetMarginChart } from "@/features/credit-analysis/components/FinancialCharts";
import { DSCRChart, DebtRatioChart, CashFlowChart } from "@/features/credit-analysis/components/FinancialCharts";
import { RatioGrid } from "@/features/credit-analysis/components/RatioGrid";
import { AIAnalysisBlock } from "@/features/credit-analysis/components/AIAnalysisBlock";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, User, ArrowLeft, FileText } from "lucide-react";
import { format } from "date-fns";

export default function CreditAnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: response, isLoading } = useCreditAnalysis(id);
  const analysis = response?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-sm">Credit analysis not found</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/credit-analysis")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
      </div>
    );
  }

  const statusConfig = {
    DRAFT: { label: "Draft", color: "bg-slate-100 text-slate-700" },
    IN_REVIEW: { label: "In Review", color: "bg-amber-100 text-amber-700" },
    APPROVED: { label: "Approved", color: "bg-emerald-100 text-emerald-700" },
  };
  const status = statusConfig[analysis.status];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/credit-analysis")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{analysis.companyName}</h1>
              <Badge className={status.color}>{status.label}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(analysis.analysisDate), "MMMM dd, yyyy")}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {analysis.analystName}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button className="gap-2">
            Generate AI Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2 p-4 rounded-lg border bg-card">
          <p className="text-xs text-muted-foreground">Latest DSCR</p>
          <p className={`text-2xl font-bold ${analysis.financialData.dscr[analysis.financialData.dscr.length - 1].value >= 1.2 ? "text-emerald-600" : "text-red-600"}`}>
            {analysis.financialData.dscr[analysis.financialData.dscr.length - 1].value.toFixed(2)}x
          </p>
        </div>
        <div className="col-span-2 p-4 rounded-lg border bg-card">
          <p className="text-xs text-muted-foreground">Debt/Equity</p>
          <p className="text-2xl font-bold">{analysis.ratios.solvency.debtToEquity.toFixed(2)}x</p>
        </div>
        <div className="col-span-2 p-4 rounded-lg border bg-card">
          <p className="text-xs text-muted-foreground">Net Profit Margin</p>
          <p className="text-2xl font-bold">{analysis.ratios.profitability.netProfitMargin.toFixed(1)}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <RevenueChart data={analysis.financialData.revenue} />
        <EBITDAChart data={analysis.financialData.ebitda} />
        <DSCRChart data={analysis.financialData.dscr} />
        <NetMarginChart data={analysis.financialData.netProfitMargin} />
        <CashFlowChart data={analysis.financialData.operatingCashFlow} />
        <DebtRatioChart data={[]} />
      </div>

      <RatioGrid ratios={analysis.ratios} benchmarks={analysis.industryBenchmarks} />

      {analysis.aiAnalysis && (
        <AIAnalysisBlock
          strengths={analysis.aiAnalysis.strengths}
          weaknesses={analysis.aiAnalysis.weaknesses}
          anomalies={analysis.aiAnalysis.anomalies}
          riskSummary={analysis.aiAnalysis.riskSummary}
          recommendation={analysis.aiAnalysis.recommendation}
        />
      )}
    </div>
  );
}