"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NotificationFilterParams } from "@/types";
import { Search, Bell, CheckCheck } from "lucide-react";

interface NotificationFiltersProps {
  filters: NotificationFilterParams;
  onFilterChange: (f: Partial<NotificationFilterParams>) => void;
  onMarkAllRead: () => void;
  unreadCount: number;
}

export function NotificationFilters({ filters, onFilterChange, onMarkAllRead, unreadCount }: NotificationFiltersProps) {
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
            placeholder="Search notifications..."
            className="pl-8 h-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={filters.category || "ALL"} onValueChange={(v) => onFilterChange({ category: v === "ALL" ? undefined : v as any, page: 1 })}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            <SelectItem value="RISK">Risk</SelectItem>
            <SelectItem value="APPROVAL">Approval</SelectItem>
            <SelectItem value="RELATIONSHIP">Relationship</SelectItem>
            <SelectItem value="COMPLIANCE">Compliance</SelectItem>
            <SelectItem value="TASKS">Tasks</SelectItem>
            <SelectItem value="COMMERCIAL">Commercial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.priority || "ALL"} onValueChange={(v) => onFilterChange({ priority: v === "ALL" ? undefined : v as any, page: 1 })}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Priority</SelectItem>
            <SelectItem value="CRITICAL">Critical</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.isRead === undefined ? "ALL" : filters.isRead ? "READ" : "UNREAD"} onValueChange={(v) => onFilterChange({ isRead: v === "ALL" ? undefined : v === "READ", page: 1 })}>
          <SelectTrigger className="h-9 w-28">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="UNREAD">Unread</SelectItem>
            <SelectItem value="READ">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {unreadCount > 0 && (
          <span className="text-xs text-muted-foreground">
            {unreadCount} unread
          </span>
        )}
        <Button size="sm" variant="outline" className="gap-1.5 h-9" onClick={onMarkAllRead}>
          <CheckCheck className="h-3.5 w-3.5" />
          Mark All Read
        </Button>
      </div>
    </div>
  );
}