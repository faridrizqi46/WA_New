"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VisitFilterParams } from "@/types";
import { Search, PlusCircle, Calendar, Filter } from "lucide-react";

interface VisitFiltersProps {
  filters: VisitFilterParams;
  onFilterChange: (f: Partial<VisitFilterParams>) => void;
  onScheduleClick: () => void;
}

export function VisitFilters({ filters, onFilterChange, onScheduleClick }: VisitFiltersProps) {
  const [search, setSearch] = useState(filters.search || "");

  useEffect(() => {
    const t = setTimeout(() => {
      if (search !== filters.search) onFilterChange({ search, page: 1 });
    }, 400);
    return () => clearTimeout(t);
  }, [search, filters.search, onFilterChange]);

  return (
    <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-60">
          <label htmlFor="visit-search" className="sr-only">Search visits or companies</label>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            id="visit-search"
            placeholder="Search visits or companies…"
            className="pl-8 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={filters.status || "ALL"} onValueChange={(v) => onFilterChange({ status: v === "ALL" ? undefined : v as any, page: 1 })}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.visitType || "ALL"} onValueChange={(v) => onFilterChange({ visitType: v === "ALL" ? undefined : v as any, page: 1 })}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Visit Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="VERIFICATION">Verification</SelectItem>
            <SelectItem value="RELATIONSHIP">Relationship</SelectItem>
            <SelectItem value="COMPLIANCE">Compliance</SelectItem>
            <SelectItem value="COLLECTION">Collection</SelectItem>
            <SelectItem value="RENEWAL">Renewal</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.rmOwner == null ? "All" : filters.rmOwner} onValueChange={(v) => onFilterChange({ rmOwner: v === "All" ? undefined : v })}>
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

      <div className="flex items-center gap-2">
        <Button size="sm" className="gap-1.5 h-9" onClick={onScheduleClick}>
          <PlusCircle className="h-3.5 w-3.5" />
          Schedule Visit
        </Button>
      </div>
    </div>
  );
}