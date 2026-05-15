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
import { CollateralAsset } from "@/types";
import { COLLATERAL_TYPE_CONFIG, COLLATERAL_STATUS_CONFIG } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface CollateralTableProps {
  data: CollateralAsset[];
  isLoading: boolean;
  onRowClick: (asset: CollateralAsset) => void;
}

export function CollateralTable({ data, isLoading, onRowClick }: CollateralTableProps) {
  const columns = useMemo<ColumnDef<CollateralAsset>[]>(() => [
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as CollateralAsset["type"];
        const config = COLLATERAL_TYPE_CONFIG[type];
        return (
          <Badge variant="outline" style={{ borderColor: config.color, color: config.color, backgroundColor: `${config.color}15` }}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[250px]">
          <p className="text-sm font-medium truncate">{row.original.description}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building2 className="h-3 w-3" />
            <span>{row.original.companyName}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "appraisedValue",
      header: ({ column }) => (
        <Button variant="ghost" size="sm" className="-ml-3 h-8" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Valuation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const value = row.getValue("appraisedValue") as number;
        return (
          <span className="font-medium">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value)}
          </span>
        );
      },
    },
    {
      accessorKey: "coverageRatio",
      header: "Coverage",
      cell: ({ row }) => {
        const ratio = row.getValue("coverageRatio") as number;
        return (
          <span className={`font-medium ${ratio >= 1.2 ? "text-emerald-600" : ratio >= 1.0 ? "text-amber-600" : "text-red-600"}`}>
            {ratio.toFixed(2)}x
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as CollateralAsset["status"];
        const config = COLLATERAL_STATUS_CONFIG[status];
        return (
          <Badge className={`${config.bgColor} text-xs`} style={{ color: config.color }}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{row.original.location || "-"}</span>
        </div>
      ),
    },
    {
      accessorKey: "insuranceExpiry",
      header: "Insurance Expiry",
      cell: ({ row }) => {
        const expiry = row.original.insuranceExpiry;
        if (!expiry) return <span className="text-muted-foreground">-</span>;
        const expiryDate = new Date(expiry);
        const isExpiringSoon = expiryDate.getTime() < Date.now() + 86400000 * 30;
        return (
          <span className={`text-sm ${isExpiringSoon ? "text-red-600 font-medium" : ""}`}>
            {format(expiryDate, "MMM dd, yyyy")}
          </span>
        );
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
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
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
                No collateral assets found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}