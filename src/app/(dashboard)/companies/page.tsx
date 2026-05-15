"use client";

import { useState } from "react";
import { CompanyFilters } from "@/features/companies/components/CompanyFilters";
import { CompanyDataTable } from "@/features/companies/components/CompanyDataTable";
import { useCompanies } from "@/features/companies/hooks/useCompanies";
import { CompanyFilterParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function CompaniesPage() {
  const [filters, setFilters] = useState<CompanyFilterParams>({
    page: 1,
    limit: 10,
    segment: "All",
  });

  const { data: response, isLoading, isFetching } = useCompanies(filters);

  const handleFilterChange = (newFilters: Partial<CompanyFilterParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Reset to page 1 on filter changes unless page is explicitly being set
      page: newFilters.page || (newFilters.limit !== undefined ? prev.page : 1),
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleSortChange = (sortBy: string, sortOrder: "asc" | "desc") => {
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
  };

  const handleExportCSV = () => {
    // Simulated export - replace with actual CSV generation
    console.log("Exporting companies to CSV…");
  };

  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Companies
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your entire portfolio.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <CompanyFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <CompanyDataTable 
        data={response?.data || []} 
        total={response?.meta?.total || 0}
        isLoading={isLoading || isFetching}
        page={filters.page || 1}
        limit={filters.limit || 10}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    </div>
  );
}
