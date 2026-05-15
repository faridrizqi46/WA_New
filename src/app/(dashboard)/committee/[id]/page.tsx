"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useCommitteeSession } from "@/features/committee/hooks/useCommittee";
import { VotingComponent } from "@/features/committee/components/VotingComponent";
import { DiscussionThread } from "@/features/committee/components/DiscussionThread";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Building2, Calendar, FileText, Users, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { COMMITTEE_STATUS_CONFIG } from "@/lib/mock-data";

export default function CommitteeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: response, isLoading } = useCommitteeSession(id);
  const session = response?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-sm">Session not found</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/committee")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
      </div>
    );
  }

  const statusConfig = COMMITTEE_STATUS_CONFIG[session.status];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/committee")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{session.title}</h1>
              <Badge className={`${statusConfig.bgColor}`} style={{ color: statusConfig.color }}>
                {statusConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {session.companyName}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(session.scheduledAt), "MMMM dd, yyyy HH:mm")}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {session.presentMembers.length} members present
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {session.status === "DRAFT" && (
            <Button>Submit for Review</Button>
          )}
          {session.status === "UNDER_REVIEW" && (
            <Button className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Start Voting
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Credit Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {session.analysisId ? (
                <Button variant="outline" className="gap-2" onClick={() => router.push(`/credit-analysis/${session.analysisId}`)}>
                  <FileText className="h-4 w-4" />
                  View Credit Analysis {session.analysisId}
                </Button>
              ) : (
                <p className="text-sm text-muted-foreground">No credit analysis linked</p>
              )}
            </CardContent>
          </Card>

          <div className="mt-6">
            <DiscussionThread discussions={session.discussions} />
          </div>
        </div>

        <div>
          <VotingComponent
            votes={session.votes}
            quorum={session.quorum}
            currentUserId="user-1"
            onVote={(decision, comments) => {
              console.log(`User voted ${decision}: ${comments || ""}`);
            }}
            disabled={session.status !== "UNDER_REVIEW"}
          />

          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Session Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quorum Required</span>
                <span className="font-medium">{session.quorum}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members Present</span>
                <span className="font-medium">{session.presentMembers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Votes Cast</span>
                <span className="font-medium">{session.votes.length}</span>
              </div>
              {session.concludedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Concluded</span>
                  <span className="font-medium">{format(new Date(session.concludedAt), "MMM dd, yyyy")}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}