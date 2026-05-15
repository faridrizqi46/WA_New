"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";
import { format } from "date-fns";

interface AuditTrailTabProps { company: CompanyDetail; }

export function AuditTrailTab({ company }: AuditTrailTabProps) {
  const sorted = [...company.auditLogs].sort(
    (a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
  );

  return (
    <Card>
      <CardContent className="py-4">
        <div className="space-y-0">
          {sorted.map((log, idx) => (
            <div key={log.id} className="flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <History className="h-3.5 w-3.5" />
                </div>
                {idx < sorted.length - 1 && <div className="w-px flex-1 bg-border mt-1 mb-1" />}
              </div>
              {/* Content */}
              <div className={`pb-6 ${idx === sorted.length - 1 ? "pb-0" : ""}`}>
                <p className="text-sm font-semibold">{log.action}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {log.performedBy} • {format(new Date(log.performedAt), "dd MMM yyyy, HH:mm")}
                </p>
                {log.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed border-l-2 border-muted pl-2">
                    {log.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
          {sorted.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-8">No audit logs found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
