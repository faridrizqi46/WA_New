"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PipelineOpportunity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, GripVertical } from "lucide-react";

interface KanbanCardProps {
  opportunity: PipelineOpportunity;
  onClick: (opp: PipelineOpportunity) => void;
  isTerminal?: boolean;
}

const probabilityColor = (p: number) => {
  if (p >= 75) return "bg-emerald-100 text-emerald-800";
  if (p >= 40) return "bg-yellow-100 text-yellow-800";
  return "bg-slate-100 text-slate-600";
};

const fmt = (v: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(v);

export function KanbanCard({ opportunity, onClick, isTerminal }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: opportunity.id,
    disabled: isTerminal,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-xl border bg-card p-3.5 shadow-sm transition-shadow hover:shadow-md ${isTerminal ? "cursor-default" : "cursor-pointer"}`}
      onClick={() => onClick(opportunity)}
    >
      {/* Drag handle */}
      {!isTerminal && (
        <div
          {...attributes}
          {...listeners}
          className="absolute right-2.5 top-3 hidden group-hover:flex items-center text-muted-foreground cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-4 w-4" />
        </div>
      )}

      {/* Title */}
      <p className="text-sm font-semibold leading-tight pr-6 mb-2 line-clamp-2">{opportunity.title}</p>

      {/* Company */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
        <Building2 className="h-3 w-3 flex-shrink-0" />
        <span className="truncate">{opportunity.companyName}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-foreground">{fmt(opportunity.dealValue)}</span>
        <Badge variant="secondary" className={`text-[10px] font-medium px-1.5 py-0.5 ${probabilityColor(opportunity.probability)}`}>
          <TrendingUp className="h-2.5 w-2.5 mr-1" />
          {opportunity.probability}%
        </Badge>
      </div>

      <p className="text-[10px] text-muted-foreground mt-1.5">{opportunity.rmName}</p>
    </div>
  );
}
