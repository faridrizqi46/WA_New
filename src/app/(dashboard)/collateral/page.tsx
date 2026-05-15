"use client";

import { useState } from "react";
import { useCollaterals } from "@/features/collateral/hooks/useCollaterals";
import { CollateralTable } from "@/features/collateral/components/CollateralTable";
import { CollateralCard } from "@/features/collateral/components/CollateralCard";
import { CollateralMap } from "@/features/collateral/components/CollateralMap";
import { CollateralFilterParams, CollateralAsset } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Landmark, LayoutGrid, Map, Plus, Table2 } from "lucide-react";

export default function CollateralPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<CollateralFilterParams>({ limit: 50 });
  const [view, setView] = useState<"table" | "card" | "map">("table");
  const { data: response, isLoading } = useCollaterals(filters);
  const assets = response?.data || [];

  const handleFilterChange = (newFilters: Partial<CollateralFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleAssetClick = (asset: CollateralAsset) => {
    router.push(`/collateral/${asset.id}`);
  };

  const statusTabs: { key: CollateralFilterParams["status"]; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "VALID", label: "Valid" },
    { key: "PENDING_APPRAISAL", label: "Pending" },
    { key: "EXPIRED", label: "Expired" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center">
              <Landmark className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Collateral</h1>
              <p className="text-sm text-muted-foreground">Manage collateral assets and fiducia</p>
            </div>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Collateral
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 border-b pb-2">
          {statusTabs.map((tab) => (
            <Button
              key={tab.key}
              size="sm"
              variant={filters.status === tab.key || (!filters.status && tab.key === "ALL") ? "default" : "ghost"}
              className="h-8 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              onClick={() => handleFilterChange({ status: tab.key === "ALL" ? undefined : tab.key as any })}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-1 border rounded-lg p-1 bg-muted/40">
          <Button
            variant={view === "table" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2"
            onClick={() => setView("table")}
          >
            <Table2 className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "card" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2"
            onClick={() => setView("card")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "map" ? "default" : "ghost"}
            size="sm"
            className="h-7 px-2"
            onClick={() => setView("map")}
          >
            <Map className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Landmark className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">No collateral assets found</p>
          </div>
        ) : view === "table" ? (
          <CollateralTable data={assets} isLoading={isLoading} onRowClick={handleAssetClick} />
        ) : view === "map" ? (
          <CollateralMap assets={assets} onAssetClick={handleAssetClick} />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {assets.map((asset) => (
              <CollateralCard key={asset.id} asset={asset} onClick={handleAssetClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}