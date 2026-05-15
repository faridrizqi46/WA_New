"use client";

import { useState } from "react";
import { useCommitteeSessions } from "@/features/committee/hooks/useCommittee";
import { CommitteeSessionCard } from "@/features/committee/components/CommitteeSessionCard";
import { CommitteeFilterParams, CommitteeSession } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CommitteePage() {
  const router = useRouter();
  const [filters, setFilters] = useState<CommitteeFilterParams>({ limit: 50 });
  const { data: response, isLoading } = useCommitteeSessions(filters);
  const sessions = response?.data || [];

  const handleFilterChange = (newFilters: Partial<CommitteeFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleSessionClick = (session: CommitteeSession) => {
    router.push(`/committee/${session.id}`);
  };

  const statusTabs: { key: CommitteeFilterParams["status"]; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "DRAFT", label: "Draft" },
    { key: "UNDER_REVIEW", label: "Under Review" },
    { key: "VOTED", label: "Voted" },
    { key: "FINAL", label: "Approved" },
    { key: "REJECTED", label: "Rejected" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
              <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Committee</h1>
              <p className="text-sm text-muted-foreground">Credit approval sessions</p>
            </div>
          </div>
        </div>
        <Button className="gap-2">New Session</Button>
      </div>

      <div className="mb-6 flex items-center gap-2 border-b pb-2">
        {statusTabs.map((tab) => (
          <Button
            key={tab.key}
            size="sm"
            variant={filters.status === tab.key || (!filters.status && tab.key === "ALL") ? "default" : "ghost"}
            className="h-8 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => handleFilterChange({ status: tab.key === "ALL" ? undefined : tab.key as any })}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Users className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">No committee sessions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <CommitteeSessionCard
                key={session.id}
                session={session}
                onClick={handleSessionClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}