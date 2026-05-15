"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Star, CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface RelationshipTabProps { company: CompanyDetail; }

export function RelationshipTab({ company }: RelationshipTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            All Contacts ({company.contacts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {company.contacts.map((c) => (
            <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg border">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                {c.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{c.name}</p>
                  {c.isPrimary && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-xs text-muted-foreground">{c.title}</p>
                <p className="text-xs text-primary mt-1">{c.email}</p>
                {c.phone && <p className="text-xs text-muted-foreground">{c.phone}</p>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            RM Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl border bg-muted/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                {company.rmName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{company.rmName}</p>
                <p className="text-xs text-muted-foreground">Relationship Manager</p>
              </div>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="text-xs text-muted-foreground">Last Activity</dt>
                <dd className="text-sm font-medium">{format(new Date(company.lastActivity), "dd MMM yyyy")}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Facility Type</dt>
                <dd className="text-sm font-medium">{company.facilityType ?? "—"}</dd>
              </div>
            </dl>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
