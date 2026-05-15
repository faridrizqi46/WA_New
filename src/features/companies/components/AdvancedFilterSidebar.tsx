"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { CompanyFilterParams } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AdvancedFilterSidebarProps {
  filters: CompanyFilterParams;
  onFilterChange: (filters: Partial<CompanyFilterParams>) => void;
}

export function AdvancedFilterSidebar({ filters, onFilterChange }: AdvancedFilterSidebarProps) {
  const handleReset = () => {
    onFilterChange({
      industry: "All",
      riskRating: "All",
      rmOwner: "All",
      region: "All",
    });
  };

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "outline" }), "flex gap-2")}>
        <Filter className="h-4 w-4" />
        Advanced Filter
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Narrow down the company list by specific criteria.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label>Industry</Label>
            <Select 
              value={filters.industry || "All"} 
              onValueChange={(val) => onFilterChange({ industry: val || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
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
          </div>

          <div className="space-y-2">
            <Label>Risk Rating</Label>
            <Select 
              value={filters.riskRating || "All"} 
              onValueChange={(val) => onFilterChange({ riskRating: val || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select risk rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Ratings</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="VERY_HIGH">Very High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Region</Label>
            <Select 
              value={filters.region || "All"} 
              onValueChange={(val) => onFilterChange({ region: val || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Regions</SelectItem>
                <SelectItem value="Jakarta">Jakarta</SelectItem>
                <SelectItem value="Surabaya">Surabaya</SelectItem>
                <SelectItem value="Medan">Medan</SelectItem>
                <SelectItem value="Bandung">Bandung</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>RM Owner</Label>
            <Select 
              value={filters.rmOwner || "All"} 
              onValueChange={(val) => onFilterChange({ rmOwner: val || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select RM Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All RM Owners</SelectItem>
                <SelectItem value="Alex RM">Alex RM</SelectItem>
                <SelectItem value="System Admin">System Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
