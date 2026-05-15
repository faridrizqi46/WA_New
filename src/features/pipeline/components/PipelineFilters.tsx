"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PipelineFilterParams } from "@/types";
import { Search, LayoutGrid, List, PlusCircle } from "lucide-react";

interface PipelineFiltersProps {
  filters: PipelineFilterParams;
  onFilterChange: (f: Partial<PipelineFilterParams>) => void;
  view: "kanban" | "table";
  onViewChange: (v: "kanban" | "table") => void;
}

export function PipelineFilters({ filters, onFilterChange, view, onViewChange }: PipelineFiltersProps) {
  const [search, setSearch] = useState(filters.search || "");

  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== filters.search) onFilterChange({ search, page: 1 });
    }, 400);
    return () => clearTimeout(t);
  }, [search, filters.search, onFilterChange]);

  return (
    <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center md:justify-between">
      {/* Left: search + filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-60">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deals or companies..."
            className="pl-8 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={filters.industry || "All"} onValueChange={(v) => onFilterChange({ industry: v || undefined })}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Industries</SelectItem>
            <SelectItem value="Technology">Technology</SelectItem>
            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            <SelectItem value="Agriculture">Agriculture</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Retail">Retail</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.rmOwner || "All"} onValueChange={(v) => onFilterChange({ rmOwner: v || undefined })}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue placeholder="RM Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All RMs</SelectItem>
            <SelectItem value="Alex RM">Alex RM</SelectItem>
            <SelectItem value="System Admin">System Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right: view toggle + add */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-lg border p-0.5 bg-muted/40">
          <Button
            variant={view === "kanban" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2.5 gap-1.5"
            onClick={() => onViewChange("kanban")}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Board
          </Button>
          <Button
            variant={view === "table" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2.5 gap-1.5"
            onClick={() => onViewChange("table")}
          >
            <List className="h-3.5 w-3.5" />
            List
          </Button>
        </div>
        <Button size="sm" className="gap-1.5 h-9">
          <PlusCircle className="h-3.5 w-3.5" />
          New Deal
        </Button>
      </div>
    </div>
  );
}
