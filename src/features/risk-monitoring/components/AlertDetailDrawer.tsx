"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRiskAlert } from "../hooks/useRiskAlerts";
import { ALERT_SEVERITY_CONFIG, ALERT_CATEGORY_CONFIG } from "@/lib/mock-data";
import { RiskAlertDetail } from "@/types";
import { Building2, User, CheckCircle2, Clock, ExternalLink, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface AlertDetailDrawerProps {
  alert: RiskAlertDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertDetailDrawer({ alert, open, onOpenChange }: AlertDetailDrawerProps) {
  const { data: response, isLoading } = useRiskAlert(alert?.id || null);

  if (!alert) return null;

  const severityConfig = ALERT_SEVERITY_CONFIG[alert.severity];
  const categoryConfig = ALERT_CATEGORY_CONFIG[alert.category];
  const isAcknowledged = !!alert.acknowledgedAt;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] sm:max-w-[600px] overflow-y-auto p-0 flex flex-col">
        {isLoading ? (
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-[300px] w-full mt-4" />
          </div>
        ) : (
          <>
            <div className="px-6 py-5 border-b sticky top-0 bg-background z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-full p-2" style={{ backgroundColor: `${severityConfig.color}15` }}>
                  <AlertTriangle className="h-5 w-5" style={{ color: severityConfig.color }} />
                </div>
                <SheetTitle className="text-xl">{alert.title}</SheetTitle>
              </div>
              <SheetDescription className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" style={{ borderColor: severityConfig.color, color: severityConfig.color, backgroundColor: `${severityConfig.color}15` }}>
                  {severityConfig.label}
                </Badge>
                <Badge variant="outline" style={{ borderColor: categoryConfig.color, color: categoryConfig.color, backgroundColor: `${categoryConfig.color}15` }}>
                  {categoryConfig.label}
                </Badge>
                {isAcknowledged && (
                  <Badge variant="secondary">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Acknowledged
                  </Badge>
                )}
              </SheetDescription>
            </div>

            <div className="flex-1 px-6 py-5 space-y-4">
              <div className="p-4 border rounded-lg bg-muted/50">
                <p className="text-sm leading-relaxed">{alert.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm font-medium">{alert.companyName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="text-sm font-medium">{format(new Date(alert.createdAt), "MMM dd, yyyy HH:mm")}</p>
                  </div>
                </div>
                {alert.assignedToName && (
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Assigned To</p>
                      <p className="text-sm font-medium">{alert.assignedToName}</p>
                    </div>
                  </div>
                )}
                {alert.acknowledgedBy && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Acknowledged By</p>
                      <p className="text-sm font-medium">{alert.acknowledgedBy}</p>
                      {alert.acknowledgedAt && (
                        <p className="text-xs text-muted-foreground">{format(new Date(alert.acknowledgedAt), "MMM dd, yyyy HH:mm")}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {alert.resolution && (
                <div className="p-3 border rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                  <p className="text-xs text-muted-foreground mb-1">Resolution</p>
                  <p className="text-sm">{alert.resolution}</p>
                </div>
              )}

              <div className="flex items-center gap-2 pt-4 border-t">
                <Link href={`/companies/${alert.companyId}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-1.5">
                    <Building2 className="h-4 w-4" />
                    View Company
                  </Button>
                </Link>
                {!isAcknowledged ? (
                  <Button className="flex-1 gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Acknowledge Alert
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 gap-1.5">
                    <User className="h-4 w-4" />
                    Assign to RM
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}