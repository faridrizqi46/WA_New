"use client";

import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Users, FileText, CheckCircle2, AlertTriangle, Edit, Download, ExternalLink, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getMockMeetingById } from "@/lib/mock-data";
import { useParams } from "next/navigation";

const STATUS_CONFIG = {
  PENDING: { label: "Pending", color: "bg-slate-100 text-slate-600" },
  IN_PROGRESS: { label: "In Progress", color: "bg-amber-100 text-amber-700" },
  COMPLETED: { label: "Completed", color: "bg-green-100 text-green-700" },
};

export function MeetingSummaryView() {
  const params = useParams();
  const meetingId = params.id as string;

  const { data: meetingData, isLoading } = useQuery({
    queryKey: ["meeting", meetingId],
    queryFn: () => getMockMeetingById(meetingId),
    enabled: !!meetingId,
  });

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="h-8 w-64 bg-slate-100 rounded animate-pulse" />
          <div className="h-32 bg-slate-100 rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-6">
            <div className="h-48 bg-slate-100 rounded animate-pulse" />
            <div className="h-48 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const meeting = meetingData?.data;

  if (!meeting) {
    return (
      <div className="flex-1 p-6">
        <p className="text-slate-500">Meeting not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Meeting Summary - {meeting.companyName}</h2>
          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {meeting.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {meeting.duration} min
            </span>
            <span>RM: {meeting.rm}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            ATTENDEES
          </h3>
          <div className="flex flex-wrap gap-3">
            {meeting.attendees.map((attendee, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${attendee.isRM ? "bg-blue-500" : "bg-green-500"}`} />
                <span className="font-medium">{attendee.name}</span>
                <span className="text-slate-500">({attendee.role})</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-3">EXECUTIVE SUMMARY</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{meeting.summary}</p>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              KEY DECISIONS
            </h3>
            <ul className="space-y-2">
              {meeting.decisions.map((decision, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  {decision}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-3">ACTION ITEMS</h3>
            <div className="space-y-2">
              {meeting.actionItems.map((item) => {
                const statusConfig = STATUS_CONFIG[item.status];
                return (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span>{item.text}</span>
                    <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {meeting.termSheet && (
          <Card className="p-4">
            <h3 className="font-medium mb-3">TERM SHEET DRAFT</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Facility Type:</span>
                <span className="ml-2 font-medium">{meeting.termSheet.facilityType}</span>
              </div>
              <div>
                <span className="text-slate-500">Amount:</span>
                <span className="ml-2 font-medium">{meeting.termSheet.amount}</span>
              </div>
              <div>
                <span className="text-slate-500">Tenor:</span>
                <span className="ml-2 font-medium">{meeting.termSheet.tenor}</span>
              </div>
              <div>
                <span className="text-slate-500">Interest:</span>
                <span className="ml-2 font-medium">{meeting.termSheet.interest}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500">Collateral:</span>
                <span className="ml-2 font-medium">{meeting.termSheet.collateral}</span>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            DOCUMENTS REQUESTED
          </h3>
          <ol className="space-y-2 list-decimal list-inside text-sm">
            {meeting.documentsRequested.map((doc, i) => (
              <li key={i}>{doc}</li>
            ))}
          </ol>
        </Card>

        {meeting.riskFlags.length > 0 && (
          <Card className="p-4 border-amber-200 bg-amber-50">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-4 w-4" />
              RISK FLAGS
            </h3>
            <div className="space-y-2">
              {meeting.riskFlags.map((flag) => (
                <div key={flag.id} className="flex items-center gap-2 text-sm text-amber-700">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{flag.message}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Link to Company: {meeting.companyName}
          </Button>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Follow-up Visit
          </Button>
        </div>
      </div>
    </div>
  );
}