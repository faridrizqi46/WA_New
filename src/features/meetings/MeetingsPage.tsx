"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Upload, History } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RealTimeMeetingView } from "./components/RealTimeMeetingView";
import { PostMeetingUploadView } from "./components/PostMeetingUploadView";
import { useMeetings } from "./hooks/useMeetings";
import type { Meeting } from "@/types";

export function MeetingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("realtime");
  const { data: meetingsData, isLoading } = useMeetings();

  const completedMeetings: Meeting[] = (meetingsData?.data ?? []).filter((m: Meeting) => m.status === "COMPLETED");

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Meeting Assistant</h1>
        <p className="text-sm text-slate-500 mt-1">
          AI-powered meeting transcription and summarization
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-6">
          <TabsList>
            <TabsTrigger value="realtime" className="gap-2">
              <Mic className="h-4 w-4" />
              Real-Time Mode
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Recording
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              Meeting History
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="realtime" className="h-full m-0">
            <RealTimeMeetingView />
          </TabsContent>

          <TabsContent value="upload" className="h-full m-0">
            <PostMeetingUploadView />
          </TabsContent>

          <TabsContent value="history" className="h-full overflow-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Meeting History</h2>
                <Badge variant="secondary">{completedMeetings.length} meetings</Badge>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-slate-100 rounded animate-pulse" />
                  ))}
                </div>
              ) : completedMeetings.length ? (
                <div className="space-y-3">
                  {completedMeetings.map((meeting) => (
                    <Card
                      key={meeting.id}
                      className="p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => router.push(`/meetings/${meeting.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                            <span>{meeting.companyName}</span>
                            <span>•</span>
                            <span>{meeting.date}</span>
                            <span>•</span>
                            <span>{meeting.duration} min</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{meeting.mode === "REAL_TIME" ? "Real-Time" : "Upload"}</Badge>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {meeting.detectedTopics.slice(0, 3).map((topic, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-500">No meeting history yet</p>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}