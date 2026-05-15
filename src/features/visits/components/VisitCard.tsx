"use client";

import { Visit } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VISIT_TYPE_CONFIG, VISIT_STATUS_CONFIG } from "@/lib/mock-data";
import { Building2, Calendar, MapPin, Navigation, CheckCircle2, Clock, XCircle } from "lucide-react";
import { format, formatDistanceToNow, isToday, isTomorrow, isPast } from "date-fns";

interface VisitCardProps {
  visit: Visit;
  onClick: (visit: Visit) => void;
  onCheckIn?: (visit: Visit) => void;
}

export function VisitCard({ visit, onClick, onCheckIn }: VisitCardProps) {
  const statusConfig = VISIT_STATUS_CONFIG[visit.status];
  const typeConfig = VISIT_TYPE_CONFIG[visit.visitType];
  const scheduledDate = new Date(visit.scheduledAt);

  const getScheduleLabel = () => {
    if (visit.status === "COMPLETED" || visit.status === "CANCELLED") {
      return format(scheduledDate, "MMM dd, yyyy");
    }
    if (isToday(scheduledDate)) return "Today";
    if (isTomorrow(scheduledDate)) return "Tomorrow";
    return format(scheduledDate, "MMM dd");
  };

  const getTimeLabel = () => {
    if (visit.status === "COMPLETED" || visit.status === "CANCELLED") {
      return format(scheduledDate, "HH:mm");
    }
    return format(scheduledDate, "HH:mm");
  };

  const isOverdue = isPast(scheduledDate) && visit.status === "SCHEDULED" && !isToday(scheduledDate);

  return (
    <Card className="group hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(visit)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                style={{
                  borderColor: typeConfig.color,
                  color: typeConfig.color,
                  backgroundColor: `${typeConfig.color}15`,
                }}
                className="text-xs"
              >
                {typeConfig.label}
              </Badge>
              <Badge variant="secondary" className={`text-xs ${statusConfig.bgColor} ${visit.status === "IN_PROGRESS" ? "animate-pulse" : ""}`}>
                {visit.status === "IN_PROGRESS" && <Clock className="h-3 w-3 mr-1 animate-spin" />}
                {statusConfig.label}
              </Badge>
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-sm mb-1 truncate">{visit.companyName}</h3>

            {visit.purpose && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{visit.purpose}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className={isOverdue ? "text-red-600 font-medium" : ""}>{getScheduleLabel()}</span>
                <span>•</span>
                <span>{getTimeLabel()}</span>
              </div>
              {visit.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-[120px]">{visit.location}</span>
                </div>
              )}
            </div>

            {visit.summary && (
              <p className="text-xs text-muted-foreground mt-2 italic line-clamp-1">"{visit.summary}"</p>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span>{visit.rmName}</span>
            </div>

            {visit.status === "SCHEDULED" && onCheckIn && (
              <Button
                size="sm"
                variant="default"
                className="h-7 px-2.5 gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onCheckIn(visit);
                }}
              >
                <Navigation className="h-3 w-3" />
                Check In
              </Button>
            )}

            {visit.status === "IN_PROGRESS" && (
              <Button size="sm" variant="outline" className="h-7 px-2.5 gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Complete
              </Button>
            )}

            {visit.status === "COMPLETED" && (
              <div className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-medium">Done</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}