"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RiskAlertFilterParams } from "@/types";
import { Search, Filter, AlertTriangle } from "lucide-react";

interface AlertFiltersProps {
  filters: RiskAlertFilterParams;
  onFilterChange: (f: Partial<RiskAlertFilterParams>) => void;
}

export function AlertFilters({ filters, onFilterChange }: AlertFiltersProps) {
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
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            className="pl-8 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={filters.severity || "ALL"} onValueChange={(v) => onFilterChange({ severity: v === "ALL" ? undefined : v as any, page: 1 })}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Severity</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.category || "ALL"} onValueChange={(v) => onFilterChange({ category: v === "ALL" ? undefined : v as any, page: 1 })}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            <SelectItem value="FINANCIAL">Financial</SelectItem>
            <SelectItem value="OPERATIONAL">Operational</SelectItem>
            <SelectItem value="LEGAL">Legal</SelectItem>
            <SelectItem value="COMPLIANCE">Compliance</SelectItem>
            <SelectItem value="UTILIZATION">Utilization</SelectItem>
            <SelectItem value="FRAUD">Fraud</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.isAcknowledged === undefined ? "ALL" : filters.isAcknowledged ? "ACK" : "PENDING"} onValueChange={(v) => onFilterChange({ isAcknowledged: v === "ALL" ? undefined : v === "ACK", page: 1 })}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ACK">Acknowledged</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}