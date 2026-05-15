"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedFilterSidebar } from "./AdvancedFilterSidebar";
import { CompanyFilterParams } from "@/types";
import { Search } from "lucide-react";

interface CompanyFiltersProps {
  filters: CompanyFilterParams;
  onFilterChange: (newFilters: Partial<CompanyFilterParams>) => void;
}

export function CompanyFilters({ filters, onFilterChange }: CompanyFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchTerm) {
        onFilterChange({ search: searchTerm, page: 1 });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filters.search, onFilterChange]);

  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Tabs 
          value={filters.segment || "All"} 
          onValueChange={(val) => onFilterChange({ segment: val, page: 1 })}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="High Risk">High Risk</TabsTrigger>
            <TabsTrigger value="Upsell">Upsell Opportunity</TabsTrigger>
            <TabsTrigger value="Renewal">Renewal Soon</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AdvancedFilterSidebar filters={filters} onFilterChange={onFilterChange} />
      </div>
    </div>
  );
}
