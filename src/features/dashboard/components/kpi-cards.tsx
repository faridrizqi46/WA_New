"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardKPIs } from "../hooks/useDashboardData";
import { Users, FileSignature, ShieldAlert, CreditCard, RefreshCw, CheckSquare } from "lucide-react";

export function KPICards() {
  const { data: kpiRes, isLoading } = useDashboardKPIs();
  const kpis = kpiRes?.data;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      notation: "compact",
      compactDisplay: "short"
    }).format(value);
  };

  const metrics = [
    {
      title: "Active Customers",
      value: kpis?.activeCustomers,
      icon: Users,
      description: "Across all active facilities",
    },
    {
      title: "Pending Approvals",
      value: kpis?.pendingApprovals,
      icon: FileSignature,
      description: "Requires your attention",
    },
    {
      title: "High Risk Accounts",
      value: kpis?.highRiskAccounts,
      icon: ShieldAlert,
      description: "Critical & High severity",
      trend: "up",
      trendValue: "+1",
      destructive: true,
    },
    {
      title: "Unused Limits",
      value: kpis ? formatCurrency(kpis.unusedLimits) : undefined,
      icon: CreditCard,
      description: "Upsell opportunities",
    },
    {
      title: "Upcoming Renewals",
      value: kpis?.upcomingRenewals,
      icon: RefreshCw,
      description: "Within next 30 days",
    },
    {
      title: "Today's Tasks",
      value: kpis?.todaysTasks,
      icon: CheckSquare,
      description: "Remaining to complete",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/3 mb-1" />
              <Skeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
      {metrics.map((metric, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metric.value !== undefined ? metric.value : "-"}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              {metric.trend && (
                <span className={`mr-1 font-medium ${metric.destructive ? 'text-red-500' : 'text-emerald-500'}`}>
                  {metric.trendValue}
                </span>
              )}
              {metric.description}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
