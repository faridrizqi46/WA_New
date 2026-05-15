"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { PipelineOpportunity, PipelineStage } from "@/types";
import { PIPELINE_STAGE_CONFIG } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PipelineTableProps {
  data: PipelineOpportunity[];
  isLoading: boolean;
  onRowClick: (opp: PipelineOpportunity) => void;
}

export function PipelineTable({ data, isLoading, onRowClick }: PipelineTableProps) {
  const columns = useMemo<ColumnDef<PipelineOpportunity>[]>(() => [
    {
      accessorKey: "title",
      header: "Opportunity",
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-foreground">{row.original.title}</span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3 flex-shrink-0" />
            <span>{row.original.companyName}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => {
        const stage = row.getValue("stage") as PipelineStage;
        const config = PIPELINE_STAGE_CONFIG[stage];
        return (
          <Badge
            variant="outline"
            style={{ borderColor: config.color, color: config.color, backgroundColor: `${config.color}15` }}
          >
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "dealValue",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Deal Value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const value = row.getValue("dealValue") as number;
        return (
          <span className="font-medium">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)}
          </span>
        );
      },
    },
    {
      accessorKey: "probability",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Prob.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const prob = row.getValue("probability") as number;
        let color = "text-slate-600";
        if (prob >= 75) color = "text-emerald-600 font-medium";
        else if (prob >= 40) color = "text-yellow-600 font-medium";
        
        return (
          <div className={`flex items-center gap-1.5 ${color}`}>
            <TrendingUp className="h-3.5 w-3.5" />
            {prob}%
          </div>
        );
      },
    },
    {
      accessorKey: "rmName",
      header: "RM Owner",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("rmName")}</span>,
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"));
        return <span className="text-muted-foreground">{date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>;
      },
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="h-10 text-xs font-medium">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="py-3"><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell className="py-3"><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell className="py-3"><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="py-3"><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="py-3"><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="py-3"><Skeleton className="h-4 w-20" /></TableCell>
                </TableRow>
              ))}
            </>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No opportunities found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
