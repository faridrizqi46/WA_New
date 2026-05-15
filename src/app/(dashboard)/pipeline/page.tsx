"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePipeline } from "@/features/pipeline/hooks/usePipeline";
import { PipelineFilters } from "@/features/pipeline/components/PipelineFilters";
import { KanbanBoard } from "@/features/pipeline/components/KanbanBoard";
import { PipelineTable } from "@/features/pipeline/components/PipelineTable";
import { OpportunityDrawer } from "@/features/pipeline/components/OpportunityDrawer";
import { PipelineFilterParams, PipelineOpportunity, PipelineStage } from "@/types";

export default function PipelinePage() {
  const router = useRouter();
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const [filters, setFilters] = useState<PipelineFilterParams>({ page: 1, limit: 50 });
  const [selectedOpp, setSelectedOpp] = useState<PipelineOpportunity | null>(null);

  const { data: response, isLoading } = usePipeline(filters);
  const opportunities = response?.data || [];

  const handleFilterChange = (newFilters: Partial<PipelineFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleStageChange = (oppId: string, newStage: PipelineStage) => {
    // In a real app, this would be a mutation.
    // For now, it's optimistically handled by the KanbanBoard, but we'd persist it here.
    console.log(`Moving ${oppId} to ${newStage}`);
  };

  const handleRowClick = (opp: PipelineOpportunity) => {
    setSelectedOpp(opp);
    // Optional: shallow routing to update URL
    window.history.pushState(null, "", `/pipeline/${opp.id}`);
  };

  const handleDrawerClose = (open: boolean) => {
    if (!open) {
      setSelectedOpp(null);
      window.history.pushState(null, "", `/pipeline`);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Deal Pipeline</h1>
        <p className="text-sm text-muted-foreground">Manage your opportunities from lead to approval.</p>
      </div>

      <PipelineFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        view={view}
        onViewChange={setView}
      />

      <div className="flex-1 overflow-hidden">
        {view === "kanban" ? (
          <KanbanBoard
            data={opportunities}
            isLoading={isLoading}
            onCardClick={handleRowClick}
            onStageChange={handleStageChange}
          />
        ) : (
          <div className="h-full overflow-y-auto pb-6">
            <PipelineTable
              data={opportunities}
              isLoading={isLoading}
              onRowClick={handleRowClick}
            />
          </div>
        )}
      </div>

      <OpportunityDrawer
        opportunity={selectedOpp}
        open={!!selectedOpp}
        onOpenChange={handleDrawerClose}
      />
    </div>
  );
}
