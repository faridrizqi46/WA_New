"use client";

import { CommitteeSession } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, FileText, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { COMMITTEE_STATUS_CONFIG } from "@/lib/mock-data";

interface CommitteeSessionCardProps {
  session: CommitteeSession;
  onClick: (session: CommitteeSession) => void;
}

export function CommitteeSessionCard({ session, onClick }: CommitteeSessionCardProps) {
  const statusConfig = COMMITTEE_STATUS_CONFIG[session.status];
  const approveCount = session.votes.filter((v) => v.decision === "APPROVE").length;
  const rejectCount = session.votes.filter((v) => v.decision === "REJECT").length;

  return (
    <Card className="group hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(session)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-xs ${statusConfig.bgColor}`} style={{ color: statusConfig.color }}>
                {statusConfig.label}
              </Badge>
            </div>

            <h3 className="font-semibold text-sm mb-1 line-clamp-1">{session.title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{session.companyName}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(session.scheduledAt), "MMM dd, yyyy HH:mm")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{session.presentMembers.length} present</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>{session.votes.length} votes</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {(session.status === "FINAL" || session.status === "REJECTED") && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium">{approveCount}</span>
                <XCircle className="h-4 w-4 text-red-600 ml-2" />
                <span className="text-xs font-medium">{rejectCount}</span>
              </div>
            )}
            <Button size="sm" variant="outline" className="h-7 px-2.5 gap-1">
              <FileText className="h-3 w-3" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}