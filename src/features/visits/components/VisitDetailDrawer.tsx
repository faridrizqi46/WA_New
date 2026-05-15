"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVisit } from "../hooks/useVisit";
import { VISIT_STATUS_CONFIG, VISIT_TYPE_CONFIG } from "@/lib/mock-data";
import { Visit } from "@/types";
import {
  Building2,
  Calendar,
  MapPin,
  Navigation,
  CheckCircle2,
  Clock,
  FileText,
  Image,
  ExternalLink,
  User,
} from "lucide-react";
import { format } from "date-fns";

interface VisitDetailDrawerProps {
  visit: Visit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VisitDetailDrawer({ visit, open, onOpenChange }: VisitDetailDrawerProps) {
  const { data: response, isLoading } = useVisit(visit?.id || null);
  const visitData = response?.data;

  if (!visit) return null;

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
              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <SheetTitle className="text-xl">{visitData?.companyName || visit.companyName}</SheetTitle>
                  <SheetDescription className="flex items-center gap-2 mt-1.5">
                    <Building2 className="h-4 w-4" />
                    <span>{visitData?.visitType ? VISIT_TYPE_CONFIG[visitData.visitType].label : ""}</span>
                  </SheetDescription>
                </div>
                <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
                  View Company <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge
                  variant="outline"
                  style={{
                    borderColor: visitData?.status ? VISIT_STATUS_CONFIG[visitData.status].color : "#94a3b8",
                    backgroundColor: visitData?.status ? `${VISIT_STATUS_CONFIG[visitData.status].color}15` : "bg-slate-100",
                  }}
                >
                  {visitData?.status ? VISIT_STATUS_CONFIG[visitData.status].label : visit.status}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                  <User className="h-3.5 w-3.5" />
                  {visit.rmName}
                </div>
              </div>
            </div>

            <div className="flex-1 px-6 py-5">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                  <TabsTrigger
                    value="details"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="checklist"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                  >
                    Checklist
                  </TabsTrigger>
                  <TabsTrigger
                    value="photos"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                  >
                    Photos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Scheduled</p>
                        <p className="text-sm font-medium">
                          {visitData?.scheduledAt ? format(new Date(visitData.scheduledAt), "MMM dd, yyyy HH:mm") : "-"}
                        </p>
                      </div>
                    </div>
                    {visitData?.checkedInAt && (
                      <div className="flex items-start gap-2">
                        <Navigation className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Checked In</p>
                          <p className="text-sm font-medium">
                            {format(new Date(visitData.checkedInAt), "MMM dd, yyyy HH:mm")}
                          </p>
                        </div>
                      </div>
                    )}
                    {visitData?.completedAt && (
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Completed</p>
                          <p className="text-sm font-medium">
                            {format(new Date(visitData.completedAt), "MMM dd, yyyy HH:mm")}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">{visitData?.location || "-"}</p>
                      </div>
                    </div>
                  </div>

                  {(visitData?.purpose || visit.purpose) && (
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Purpose</p>
                      <p className="text-sm">{visitData?.purpose || visit.purpose}</p>
                    </div>
                  )}

                  {visitData?.summary && (
                    <div className="p-3 border rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                      <p className="text-xs text-muted-foreground mb-1">Summary</p>
                      <p className="text-sm">{visitData.summary}</p>
                    </div>
                  )}

                  {visitData?.notes && (
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Notes</p>
                      <p className="text-sm">{visitData.notes}</p>
                    </div>
                  )}

                  {visitData?.latitude && visitData?.longitude && (
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">GPS Coordinates</p>
                      <p className="text-sm font-mono">
                        {visitData.latitude.toFixed(6)}, {visitData.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="checklist">
                  <p className="text-sm text-muted-foreground">Checklist items will be displayed here</p>
                </TabsContent>

                <TabsContent value="photos">
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}