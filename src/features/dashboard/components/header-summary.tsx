"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useDashboardKPIs } from "../hooks/useDashboardData";
import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSummary() {
  const { user } = useAuthStore();
  const { data: kpiRes, isLoading } = useDashboardKPIs();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Welcome back, {user?.name?.split(" ")[0] || "RM"}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here is your portfolio summary for today.
        </p>
      </div>
      <div className="mt-4 flex gap-6 md:mt-0">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-muted-foreground">
            Total Portfolio
          </span>
          {isLoading ? (
            <Skeleton className="h-8 w-32 mt-1" />
          ) : (
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              {kpiRes?.data ? formatCurrency(kpiRes.data.totalPortfolioValue) : "$0"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
