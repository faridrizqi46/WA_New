"use client";

import { useOpportunity } from "../hooks/useOpportunity";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PIPELINE_STAGE_CONFIG } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Calendar, FileText, User, CheckCircle2, History, ExternalLink, Bot, Plus } from "lucide-react";
import { format } from "date-fns";
import { PipelineOpportunity } from "@/types";

interface OpportunityDrawerProps {
  opportunity: PipelineOpportunity | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OpportunityDrawer({ opportunity, open, onOpenChange }: OpportunityDrawerProps) {
  const { data: response, isLoading } = useOpportunity(opportunity?.id || null);
  const detail = response?.data;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90vw] sm:max-w-[600px] overflow-y-auto p-0 flex flex-col">
        {isLoading || !opportunity ? (
          <div className="p-6 space-y-6">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <div className="flex gap-2"><Skeleton className="h-6 w-20" /><Skeleton className="h-6 w-20" /></div>
            <Skeleton className="h-[400px] w-full mt-6" />
          </div>
        ) : (
          <>
            {/* Header Area */}
            <div className="px-6 py-5 border-b sticky top-0 bg-background z-10">
              <div className="flex justify-between items-start gap-4 mb-3">
                <div>
                  <SheetTitle className="text-xl">{opportunity.title}</SheetTitle>
                  <SheetDescription className="flex items-center gap-2 mt-1.5">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium text-foreground">{opportunity.companyName}</span>
                    <span>•</span>
                    <span>{opportunity.industry}</span>
                  </SheetDescription>
                </div>
                <Button size="sm" variant="outline" className="shrink-0 gap-1.5">
                  View Client <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(opportunity.dealValue)}
                </Badge>
                <Badge 
                  variant="outline" 
                  style={{ 
                    borderColor: PIPELINE_STAGE_CONFIG[opportunity.stage].color,
                    color: PIPELINE_STAGE_CONFIG[opportunity.stage].color,
                    backgroundColor: `${PIPELINE_STAGE_CONFIG[opportunity.stage].color}10`
                  }}
                >
                  {PIPELINE_STAGE_CONFIG[opportunity.stage].label}
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                  <User className="h-3.5 w-3.5" />
                  {opportunity.rmName}
                </div>
              </div>
            </div>

            {/* AI Banner Placeholder */}
            <div className="mx-6 mt-5 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-lg p-3.5 flex gap-3 items-start">
              <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-300">AI Deal Recommendation</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-400 mt-1">
                  Based on similar deals in {opportunity.industry}, this opportunity has a {opportunity.probability}% win probability. Recommended next step: Complete financial ratio analysis before Committee.
                </p>
              </div>
            </div>

            {/* Tabs Area */}
            <div className="flex-1 px-6 py-5">
              <Tabs defaultValue="tasks" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                  <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">
                    Checklist & Tasks
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">
                    Documents
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tasks" className="space-y-4">
                  {detail?.tasks.map(task => (
                    <div key={task.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <Checkbox id={task.id} checked={task.completed} className="mt-0.5" />
                      <div className="grid gap-1.5 flex-1">
                        <label
                          htmlFor={task.id}
                          className={`text-sm font-medium leading-none cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {task.title}
                        </label>
                        {task.dueDate && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(new Date(task.dueDate), "MMM dd, yyyy")}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full border-dashed gap-2">
                    <Plus className="h-4 w-4" /> Add Task
                  </Button>
                </TabsContent>

                <TabsContent value="activity">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {detail?.activities.map((act, i) => (
                      <div key={act.id} className="relative flex items-start gap-4">
                        <div className="absolute left-0 w-10 h-10 flex items-center justify-center bg-background rounded-full border-2 border-muted z-10">
                          {act.type === 'STAGE_CHANGE' ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <History className="h-4 w-4 text-slate-500" />}
                        </div>
                        <div className="ml-14 flex-1 border rounded-lg p-3.5 bg-card">
                          <p className="text-sm text-foreground">{act.description}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{act.performedBy}</span>
                            <span>•</span>
                            <span>{format(new Date(act.performedAt), "MMM dd, HH:mm")}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-3">
                  {detail?.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg bg-card group">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">Uploaded {format(new Date(doc.uploadedAt), "MMM dd, yyyy")} by {doc.uploadedBy}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">View</Button>
                    </div>
                  ))}
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer">
                    <FileText className="h-8 w-8 mb-2 text-slate-400" />
                    <p className="text-sm font-medium text-foreground">Click to upload document</p>
                    <p className="text-xs mt-1">PDF, Excel, Word up to 10MB</p>
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
