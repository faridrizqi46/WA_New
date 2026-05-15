"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { PipelineOpportunity, PipelineStage } from "@/types";
import { PIPELINE_STAGE_CONFIG } from "@/lib/mock-data";
import { KanbanCard } from "./KanbanCard";

interface KanbanBoardProps {
  data: PipelineOpportunity[];
  isLoading: boolean;
  onCardClick: (opp: PipelineOpportunity) => void;
  onStageChange: (oppId: string, newStage: PipelineStage) => void;
}

const STAGES: PipelineStage[] = [
  "LEAD",
  "INITIAL_CONTACT",
  "FINANCIAL_COLLECTION",
  "ANALYSIS",
  "PROPOSAL",
  "COMMITTEE",
  "APPROVED",
  "REJECTED",
];

// Column component that acts as a droppable area and sortable context
function KanbanColumn({
  id,
  title,
  color,
  items,
  isTerminal,
  onCardClick,
}: {
  id: PipelineStage;
  title: string;
  color: string;
  items: PipelineOpportunity[];
  isTerminal: boolean;
  onCardClick: (o: PipelineOpportunity) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  const totalValue = items.reduce((sum, item) => sum + item.dealValue, 0);
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(totalValue);

  return (
    <div className="flex flex-col min-w-[280px] w-[280px] flex-shrink-0 border-r last:border-r-0 border-border bg-slate-50/50 dark:bg-slate-900/50 h-full">
      {/* Column Header */}
      <div className="p-3 border-b bg-muted/30 sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <h3 className="font-semibold text-sm">{title}</h3>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
            {items.length}
          </span>
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          {formattedValue}
        </div>
      </div>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-2.5 overflow-y-auto space-y-2.5 transition-colors ${
          isOver ? "bg-muted/50" : ""
        }`}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <KanbanCard key={item.id} opportunity={item} onClick={onCardClick} isTerminal={isTerminal} />
          ))}
        </SortableContext>
        {items.length === 0 && (
          <div className="h-24 rounded-lg border-2 border-dashed border-muted flex items-center justify-center text-xs text-muted-foreground p-4 text-center">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({ data, isLoading, onCardClick, onStageChange }: KanbanBoardProps) {
  // Local state for optimistic updates during drag
  const [items, setItems] = useState<PipelineOpportunity[]>(data);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sync with prop data when it changes (but not during drag)
  useEffect(() => {
    if (!activeId) setItems(data);
  }, [data, activeId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires 5px movement before drag starts (allows clicks)
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeOppId = active.id as string;
    const overId = over.id as string;

    // Find the item being dragged
    const activeItem = items.find((i) => i.id === activeOppId);
    if (!activeItem) return;

    // Determine target stage
    let targetStage: PipelineStage | null = null;
    
    // If over a column directly
    if (STAGES.includes(overId as PipelineStage)) {
      targetStage = overId as PipelineStage;
    } else {
      // If over another card, find its stage
      const overItem = items.find((i) => i.id === overId);
      if (overItem) targetStage = overItem.stage;
    }

    if (targetStage && activeItem.stage !== targetStage) {
      // Optimitic update
      setItems((prev) =>
        prev.map((i) => (i.id === activeOppId ? { ...i, stage: targetStage! } : i))
      );
      // Trigger callback
      onStageChange(activeOppId, targetStage);
    }
  };

  const activeOpp = activeId ? items.find((i) => i.id === activeId) : null;

  if (isLoading) {
    return (
      <div className="flex gap-4 h-[600px] items-center justify-center text-muted-foreground">
        Loading board...
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-280px)] overflow-x-auto border rounded-xl overflow-hidden shadow-sm bg-background">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex h-full min-w-max">
          {STAGES.map((stage) => {
            const config = PIPELINE_STAGE_CONFIG[stage];
            const columnItems = items.filter((i) => i.stage === stage);
            return (
              <KanbanColumn
                key={stage}
                id={stage}
                title={config.label}
                color={config.color}
                items={columnItems}
                isTerminal={config.isTerminal}
                onCardClick={onCardClick}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeOpp ? (
            <div className="rotate-2 opacity-90 scale-105 transition-transform shadow-2xl">
              <KanbanCard opportunity={activeOpp} onClick={() => {}} isTerminal={PIPELINE_STAGE_CONFIG[activeOpp.stage].isTerminal} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
