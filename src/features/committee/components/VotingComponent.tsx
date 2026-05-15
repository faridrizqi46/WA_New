"use client";

import { CommitteeVote, VoteDecision } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Minus, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface VotingComponentProps {
  votes: CommitteeVote[];
  quorum: number;
  currentUserId?: string;
  onVote: (decision: VoteDecision, comments?: string) => void;
  disabled?: boolean;
}

export function VotingComponent({ votes, quorum, currentUserId, onVote, disabled }: VotingComponentProps) {
  const approveCount = votes.filter((v) => v.decision === "APPROVE").length;
  const rejectCount = votes.filter((v) => v.decision === "REJECT").length;
  const abstainCount = votes.filter((v) => v.decision === "ABSTAIN").length;
  const hasVoted = currentUserId ? votes.some((v) => v.memberId === currentUserId) : false;

  const decisionConfig = {
    APPROVE: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    REJECT: { color: "bg-red-100 text-red-700", icon: XCircle },
    ABSTAIN: { color: "bg-slate-100 text-slate-700", icon: Minus },
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Committee Voting
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mb-1" />
            <p className="text-2xl font-bold text-emerald-700">{approveCount}</p>
            <p className="text-xs text-muted-foreground">Approve</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
            <XCircle className="h-5 w-5 text-red-600 mb-1" />
            <p className="text-2xl font-bold text-red-700">{rejectCount}</p>
            <p className="text-xs text-muted-foreground">Reject</p>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-950/30">
            <Minus className="h-5 w-5 text-slate-600 mb-1" />
            <p className="text-2xl font-bold text-slate-700">{abstainCount}</p>
            <p className="text-xs text-muted-foreground">Abstain</p>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {approveCount + rejectCount + abstainCount} of {quorum} quorum votes cast
        </div>

        <div className="space-y-2">
          {votes.map((vote) => {
            const config = decisionConfig[vote.decision];
            const IconComponent = config.icon;
            return (
              <div key={vote.memberId} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${vote.decision === "APPROVE" ? "bg-emerald-500" : vote.decision === "REJECT" ? "bg-red-500" : "bg-slate-400"}`} />
                  <span className="text-sm font-medium">{vote.memberName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${config.color} text-xs`}>
                    <IconComponent className="h-3 w-3 mr-1" />
                    {vote.decision}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(vote.votedAt), "MMM dd HH:mm")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {!disabled && !hasVoted && (
          <div className="flex gap-2 pt-2 border-t">
            <Button
              variant="outline"
              className="flex-1 gap-1.5 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              onClick={() => onVote("APPROVE")}
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-1.5 border-red-200 text-red-700 hover:bg-red-50"
              onClick={() => onVote("REJECT")}
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-1.5"
              onClick={() => onVote("ABSTAIN")}
            >
              <Minus className="h-4 w-4" />
              Abstain
            </Button>
          </div>
        )}

        {hasVoted && (
          <div className="text-center text-sm text-muted-foreground pt-2 border-t">
            You have already cast your vote
          </div>
        )}
      </CardContent>
    </Card>
  );
}