"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVisits } from "@/features/visits/hooks/useVisits";
import { VisitFilters } from "@/features/visits/components/VisitFilters";
import { VisitCard } from "@/features/visits/components/VisitCard";
import { VisitDetailDrawer } from "@/features/visits/components/VisitDetailDrawer";
import { VisitCheckIn } from "@/features/visits/components/VisitCheckIn";
import { ScheduleVisitModal } from "@/features/visits/components/ScheduleVisitModal";
import { VisitFilterParams, Visit } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function VisitsPage() {
  const router = useRouter();
  const [view, setView] = useState<"list">("list");
  const [filters, setFilters] = useState<VisitFilterParams>({ page: 1, limit: 50 });
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [checkInVisit, setCheckInVisit] = useState<Visit | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const { data: response, isLoading } = useVisits(filters);
  const visits = response?.data || [];

  const handleFilterChange = (newFilters: Partial<VisitFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
  };

  const handleCheckIn = (visit: Visit) => {
    setCheckInVisit(visit);
  };

  const handleCheckInComplete = (visitId: string, data: { summary: string; notes: string }) => {
    console.log(`Visit ${visitId} completed with summary: ${data.summary}`);
    setCheckInVisit(null);
    setSelectedVisit(null);
  };

  const handleScheduleVisit = () => {
    setScheduleModalOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Field Visits</h1>
        <p className="text-sm text-muted-foreground">Schedule and track your client site visits.</p>
      </div>

      <VisitFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onScheduleClick={handleScheduleVisit}
      />

      <div className="flex-1 overflow-y-auto pb-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : visits.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p className="text-sm font-medium">No visits found</p>
            <p className="text-xs mt-1">Schedule your first visit to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visits.map((visit) => (
              <VisitCard
                key={visit.id}
                visit={visit}
                onClick={handleVisitClick}
                onCheckIn={handleCheckIn}
              />
            ))}
          </div>
        )}
      </div>

      <VisitDetailDrawer
        visit={selectedVisit}
        open={!!selectedVisit}
        onOpenChange={(open) => {
          if (!open) setSelectedVisit(null);
        }}
      />

      <VisitCheckIn
        visit={checkInVisit}
        open={!!checkInVisit}
        onOpenChange={(open) => {
          if (!open) setCheckInVisit(null);
        }}
        onComplete={handleCheckInComplete}
      />

      <ScheduleVisitModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        onScheduled={() => {
          console.log("Visit scheduled");
        }}
      />
    </div>
  );
}