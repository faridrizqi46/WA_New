"use client";

import { CommitteeDiscussion } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface DiscussionThreadProps {
  discussions: CommitteeDiscussion[];
  onAddMessage?: (message: string) => void;
}

export function DiscussionThread({ discussions }: DiscussionThreadProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Discussion Thread
        </CardTitle>
      </CardHeader>
      <CardContent>
        {discussions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-sm">No discussion yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {discussions.map((disc) => (
              <div key={disc.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs bg-muted">
                    {disc.memberName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{disc.memberName}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(disc.createdAt), "MMM dd, HH:mm")}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm leading-relaxed">{disc.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}