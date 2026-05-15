"use client";

import { Notification } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NOTIFICATION_CATEGORY_CONFIG, NOTIFICATION_PRIORITY_CONFIG } from "@/lib/mock-data";
import { Bell, BellRing, ExternalLink, CheckCircle2 } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export function NotificationCard({ notification, onMarkRead }: NotificationCardProps) {
  const categoryConfig = NOTIFICATION_CATEGORY_CONFIG[notification.category];
  const priorityConfig = NOTIFICATION_PRIORITY_CONFIG[notification.priority];

  return (
    <Card className={`group hover:shadow-md transition-shadow ${!notification.isRead ? "border-l-4 border-l-primary bg-primary/5" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 rounded-full p-2 ${notification.isRead ? "bg-muted" : "bg-primary/10"}`}>
            {notification.isRead ? (
              <Bell className="h-4 w-4 text-muted-foreground" />
            ) : (
              <BellRing className="h-4 w-4 text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge
                variant="outline"
                style={{ borderColor: categoryConfig.color, color: categoryConfig.color, backgroundColor: `${categoryConfig.color}15` }}
                className="text-xs"
              >
                {categoryConfig.label}
              </Badge>
              <Badge
                variant="secondary"
                style={{ color: priorityConfig.color, backgroundColor: `${priorityConfig.color}15` }}
                className="text-xs"
              >
                {priorityConfig.label}
              </Badge>
              {!notification.isRead && (
                <Badge variant="default" className="text-xs h-5 w-2 p-0 rounded-full" />
              )}
            </div>

            <h3 className={`text-sm font-semibold mb-1 ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
              {notification.title}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{notification.description}</p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {notification.companyName && (
                  <span className="font-medium">{notification.companyName}</span>
                )}
                <span>•</span>
                <span>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</span>
              </div>

              <div className="flex items-center gap-2">
                {!notification.isRead && (
                  <Button
                    size="xs"
                    variant="ghost"
                    className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.preventDefault();
                      onMarkRead(notification.id);
                    }}
                  >
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Mark Read
                  </Button>
                )}
                {notification.actionUrl && (
                  <Link href={notification.actionUrl}>
                    <Button size="xs" variant="ghost" className="h-6 px-2 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}