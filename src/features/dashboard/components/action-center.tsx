"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useActionItems } from "../hooks/useDashboardData";
import { FileSignature, CheckSquare, FileText, ArrowRight } from "lucide-react";

export function ActionCenter() {
  const { data: actionsRes, isLoading } = useActionItems();
  const actions = actionsRes?.data || [];

  const getIcon = (type: string) => {
    switch (type) {
      case "APPROVAL":
        return <FileSignature className="h-4 w-4" />;
      case "DOCUMENT":
        return <FileText className="h-4 w-4" />;
      case "TASK":
      default:
        return <CheckSquare className="h-4 w-4" />;
    }
  };

  const getActionLabel = (type: string) => {
    switch (type) {
      case "APPROVAL": return "Review";
      case "DOCUMENT": return "Upload";
      case "TASK": return "Complete";
      default: return "View";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Action Center</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <Skeleton className="h-8 w-20 flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y">
            {actions.map((action) => (
              <div key={action.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {getIcon(action.type)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{action.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {action.companyName ? `${action.companyName} • ` : ''}{action.description}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant={action.type === 'APPROVAL' ? 'default' : 'outline'} className="flex-shrink-0">
                  {getActionLabel(action.type)}
                </Button>
              </div>
            ))}
            {actions.length === 0 && (
              <div className="p-8 text-center text-muted-foreground text-sm">
                You're all caught up!
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
