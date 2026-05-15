"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Bot, MapPin, FileText, Bell, MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function StickyActionBar() {
  return (
    <div className="flex items-center gap-2 px-6 py-2.5 border-b bg-background/95 backdrop-blur-sm">
      <Button size="sm" variant="outline" className="gap-1.5">
        <MapPin className="h-3.5 w-3.5" />
        Log Site Visit
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5">
        <FileText className="h-3.5 w-3.5" />
        New Credit Proposal
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5 text-primary border-primary/40 hover:bg-primary/5">
        <Bot className="h-3.5 w-3.5" />
        AI Analyze
      </Button>
      <Button size="sm" variant="outline" className="gap-1.5">
        <Bell className="h-3.5 w-3.5" />
        Set Alert
      </Button>

      <Separator orientation="vertical" className="h-5 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5")}>
          <MoreHorizontal className="h-4 w-4" />
          More
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Facility
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            Upload Document
          </DropdownMenuItem>
          <DropdownMenuItem>
            Schedule Review Meeting
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            Flag for Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
