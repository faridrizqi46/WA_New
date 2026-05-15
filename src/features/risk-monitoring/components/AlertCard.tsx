"use client";

import { RiskAlert } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ALERT_SEVERITY_CONFIG, ALERT_CATEGORY_CONFIG } from "@/lib/mock-data";
import { Building2, User, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface AlertCardProps {
  alert: RiskAlert;
  onAcknowledge: (id: string) => void;
  onClick: (alert: RiskAlert) => void;
}

export function AlertCard({ alert, onAcknowledge, onClick }: AlertCardProps) {
  const severityConfig = ALERT_SEVERITY_CONFIG[alert.severity];
  const categoryConfig = ALERT_CATEGORY_CONFIG[alert.category];
  const isAcknowledged = !!alert.acknowledgedAt;

  return (
    <Card
      className={`group hover:shadow-md transition-shadow cursor-pointer ${alert.severity === "CRITICAL" ? "border-red-200 dark:border-red-900" : ""}`}
      onClick={() => onClick(alert)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className={`mt-0.5 rounded-full p-2 ${isAcknowledged ? "bg-muted" : `${severityConfig.bgColor}`}`}>
            <AlertTriangle className={`h-4 w-4 ${isAcknowledged ? "text-muted-foreground" : ""}`} style={{ color: isAcknowledged ? undefined : severityConfig.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge
                variant="outline"
                style={{ borderColor: severityConfig.color, color: severityConfig.color, backgroundColor: `${severityConfig.color}15` }}
                className="text-xs"
              >
                {severityConfig.label}
              </Badge>
              <Badge
                variant="outline"
                style={{ borderColor: categoryConfig.color, color: categoryConfig.color, backgroundColor: `${categoryConfig.color}15` }}
                className="text-xs"
              >
                {categoryConfig.label}
              </Badge>
              {isAcknowledged ? (
                <Badge variant="secondary" className="text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Acknowledged
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-xs animate-pulse">
                  Action Required
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{alert.description}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span>{alert.companyName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}</span>
              </div>
              {alert.assignedToName && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{alert.assignedToName}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {!isAcknowledged && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 px-2.5 gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onAcknowledge(alert.id);
                }}
              >
                <CheckCircle2 className="h-3 w-3" />
                Acknowledge
              </Button>
            )}
            {isAcknowledged && alert.acknowledgedBy && (
              <div className="text-xs text-muted-foreground text-right">
                <p>Acknowledged by</p>
                <p className="font-medium">{alert.acknowledgedBy}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}