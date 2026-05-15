"use client";

import { useState } from "react";
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable, 
  ColumnDef,
  SortingState
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Company } from "@/types";
import { ArrowUpDown, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CompanyDataTableProps {
  data: Company[];
  total: number;
  isLoading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

export function CompanyDataTable({
  data,
  total,
  isLoading,
  page,
  limit,
  onPageChange,
  onSortChange,
}: CompanyDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "CRITICAL": return <Badge variant="destructive">Critical</Badge>;
      case "VERY_HIGH": return <Badge className="bg-red-500">Very High</Badge>;
      case "HIGH": return <Badge className="bg-orange-500">High</Badge>;
      case "MEDIUM": return <Badge className="bg-yellow-500 text-yellow-950">Medium</Badge>;
      case "LOW": return <Badge className="bg-emerald-500">Low</Badge>;
      default: return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Company Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="pl-4">
          <Link href={`/companies/${row.original.id}`} className="font-medium text-primary hover:underline flex items-center gap-1">
            {row.getValue("name")}
            <ExternalLink className="h-3 w-3 opacity-50" />
          </Link>
          <div className="text-xs text-muted-foreground">{row.original.groupName}</div>
        </div>
      ),
    },
    {
      accessorKey: "industry",
      header: "Industry",
    },
    {
      accessorKey: "riskRating",
      header: "Risk",
      cell: ({ row }) => getRiskBadge(row.getValue("riskRating")),
    },
    {
      accessorKey: "totalExposure",
      header: ({ column }) => (
        <div className="text-right">
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Exposure
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div className="text-right font-medium pr-4">{formatCurrency(row.getValue("totalExposure"))}</div>,
    },
    {
      accessorKey: "utilizationPct",
      header: "Utilization",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${row.original.utilizationPct > 90 ? 'bg-red-500' : 'bg-primary'}`} 
              style={{ width: `${row.original.utilizationPct}%` }} 
            />
          </div>
          <span className="text-xs w-8 text-right">{row.getValue("utilizationPct")}%</span>
        </div>
      ),
    },
    {
      accessorKey: "activeAlerts",
      header: "Alerts",
      cell: ({ row }) => {
        const alerts = row.getValue("activeAlerts") as number;
        return alerts > 0 ? (
          <div className="flex items-center text-red-500 text-sm font-medium">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {alerts}
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        );
      },
    },
    {
      accessorKey: "rmName",
      header: "RM Owner",
      cell: ({ row }) => <div className="text-sm">{row.getValue("rmName")}</div>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: (updater) => {
      setSorting(updater);
      // Determine new sorting state and call prop
      if (typeof updater === 'function') {
        const newSort = updater(sorting);
        if (newSort.length > 0) {
          onSortChange(newSort[0].id, newSort[0].desc ? "desc" : "asc");
        } else {
          onSortChange("", "asc");
        }
      }
    },
    manualSorting: true,
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: limit }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, colIdx) => (
                    <TableCell key={colIdx}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min((page - 1) * limit + 1, total)} to {Math.min(page * limit, total)} of {total} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page * limit >= total || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
