"use client";

import { useState } from "react";
import { useCreditAnalyses } from "@/features/credit-analysis/hooks/useCreditAnalyses";
import { CreditAnalysisCard } from "@/features/credit-analysis/components/CreditAnalysisCard";
import { CreditAnalysisFilterParams, CreditAnalysis } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreditAnalysisPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<CreditAnalysisFilterParams>({ limit: 50 });
  const { data: response, isLoading } = useCreditAnalyses(filters);
  const analyses = response?.data || [];

  const handleFilterChange = (newFilters: Partial<CreditAnalysisFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleAnalysisClick = (analysis: CreditAnalysis) => {
    router.push(`/credit-analysis/${analysis.id}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Credit Analysis</h1>
              <p className="text-sm text-muted-foreground">Financial analysis for credit decisions</p>
            </div>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          {["ALL", "DRAFT", "IN_REVIEW", "APPROVED"].map((status) => (
            <Button
              key={status}
              size="sm"
              variant={filters.status === status || (!filters.status && status === "ALL") ? "default" : "outline"}
              className="h-8 text-xs"
              onClick={() => handleFilterChange({ status: status === "ALL" ? undefined : status as any })}
            >
              {status === "ALL" ? "All" : status.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : analyses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">No credit analyses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {analyses.map((analysis) => (
              <CreditAnalysisCard
                key={analysis.id}
                analysis={analysis}
                onClick={handleAnalysisClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}