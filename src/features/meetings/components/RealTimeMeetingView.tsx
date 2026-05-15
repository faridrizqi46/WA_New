"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Pause, Play, Plus, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLiveTranscript } from "../hooks/useMeetings";

interface LiveSegment {
  id: number;
  speaker: string;
  text: string;
  timestamp: string;
}

const mockDetectedTopics = ["Credit facility", "Expansion plan", "New collateral", "Term sheet discussion"];
const mockActionItems = [
  { text: "Prepare draft term sheet", status: "pending" },
  { text: "Request 3-year audited financials", status: "pending" },
  { text: "Schedule follow-up meeting", status: "pending" },
];
const mockTermSheet = {
  facilityType: "Revolving Credit",
  amount: "IDR 5B",
  tenor: "36 months",
  rate: "JIBOR + 2.5%",
  collateral: "Land + Building",
};
const mockDocuments = [
  "Last 3 year audited financial statements",
  "Current facility agreement with Bank",
  "Asset certificates for collateral",
];

export function RealTimeMeetingView() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [segments, setSegments] = useState<LiveSegment[]>([
    { id: 1, speaker: "RM", text: "Good morning, thank you for joining us today.", timestamp: "00:00:00" },
  ]);
  const [mode, setMode] = useState<"live" | "summary">("live");

  const { data: transcriptData } = useLiveTranscript();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setElapsedTime((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (transcriptData && !isPaused && segments.length < 10) {
      const nextSegment = transcriptData[segments.length];
      if (nextSegment) {
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        const timestamp = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:00`;
        setSegments((prev) => [
          ...prev,
          { id: prev.length + 1, speaker: nextSegment.speaker, text: nextSegment.text, timestamp },
        ]);
      }
    }
  }, [transcriptData, elapsedTime, isPaused, segments.length]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Meeting Assistant</h2>
          <Badge variant={mode === "live" ? "default" : "secondary"}>
            {mode === "live" ? "Live Mode" : "Summary Only"}
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Company:</span>
            <select className="text-sm border rounded px-2 py-1">
              <option>PT Astra International</option>
              <option>PT Sentosa Jaya</option>
            </select>
          </div>
          <Button variant="outline" size="sm">
            End Meeting
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">LIVE TRANSCRIPT</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{formatTime(elapsedTime)}</Badge>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setMode(mode === "live" ? "summary" : "live")}
                      className={`px-3 py-1 text-xs rounded ${mode === "live" ? "bg-primary text-primary-foreground" : "bg-slate-100"}`}
                    >
                      Live Preview
                    </button>
                    <button
                      onClick={() => setMode(mode === "summary" ? "live" : "summary")}
                      className={`px-3 py-1 text-xs rounded ${mode === "summary" ? "bg-primary text-primary-foreground" : "bg-slate-100"}`}
                    >
                      Summary Only
                    </button>
                  </div>
                </div>
              </div>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {segments.map((seg) => (
                    <div key={seg.id} className="flex gap-3">
                      <span className="text-xs text-slate-400 font-mono w-16 shrink-0">
                        {seg.timestamp}
                      </span>
                      <span
                        className={`font-medium w-16 shrink-0 ${
                          seg.speaker === "RM" ? "text-blue-600" : "text-green-600"
                        }`}
                      >
                        {seg.speaker}:
                      </span>
                      <span className="text-sm">{seg.text}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Documents Requested
              </h3>
              <ul className="space-y-2">
                {mockDocuments.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-slate-400">{i + 1}.</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-medium mb-3">DETECTED TOPICS</h3>
              <div className="flex flex-wrap gap-2">
                {mockDetectedTopics.map((topic, i) => (
                  <Badge key={i} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-3">ACTION ITEMS</h3>
              <div className="space-y-2">
                {mockActionItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-3">TERM SHEET DRAFT</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Facility:</span>
                  <span className="font-medium">{mockTermSheet.facilityType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-medium">{mockTermSheet.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tenor:</span>
                  <span className="font-medium">{mockTermSheet.tenor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rate:</span>
                  <span className="font-medium">{mockTermSheet.rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Collat:</span>
                  <span className="font-medium">{mockTermSheet.collateral}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="border-t px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={isPaused ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
            >
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Add Note
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Live Mode: ON</span>
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}