"use client";

import { useState, useCallback } from "react";
import { Upload, FileAudio, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRecentUploads } from "../hooks/useMeetings";

export function PostMeetingUploadView() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: recentUploads, isLoading } = useRecentUploads();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      simulateUpload();
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setIsProcessing(true);
          setTimeout(() => {
            setUploadProgress(null);
            setIsProcessing(false);
          }, 2000);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Upload Meeting Recording</h2>
        <p className="text-sm text-slate-500">Upload audio or video recordings for AI analysis</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center transition-colors
            ${isDragging ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"}
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-slate-100 p-4">
              <Upload className="h-8 w-8 text-slate-500" />
            </div>
            <div>
              <p className="font-medium">Drag audio/video file here</p>
              <p className="text-sm text-slate-500">or click to browse</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <FileAudio className="h-4 w-4" />
              Supported: MP3, WAV, M4A, MP4, MOV
            </div>
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
              Select File
            </Button>
          </div>

          {uploadProgress !== null && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing recording...
            </div>
          )}
        </div>

        <div className="mt-8">
          <h3 className="font-medium mb-4">Recent Uploads</h3>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : recentUploads?.data.length ? (
            <div className="space-y-3">
              {recentUploads.data.map((upload) => (
                <Card key={upload.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileAudio className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="font-medium">{upload.name}</p>
                      <p className="text-sm text-slate-500">{upload.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {upload.status === "Processing..." ? (
                      <Badge variant="secondary" className="gap-1">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Processing...
                      </Badge>
                    ) : (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Complete
                      </Badge>
                    )}
                    {upload.status === "Complete" && (
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No recent uploads</p>
          )}
        </div>
      </div>
    </div>
  );
}