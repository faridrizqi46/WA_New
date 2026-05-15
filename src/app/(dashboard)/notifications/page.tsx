"use client";

import { useState } from "react";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { NotificationFilters } from "@/features/notifications/components/NotificationFilters";
import { NotificationCard } from "@/features/notifications/components/NotificationCard";
import { NotificationFilterParams } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const [filters, setFilters] = useState<NotificationFilterParams>({ page: 1, limit: 50 });
  const { data: response, isLoading } = useNotifications(filters);
  const notifications = response?.data || [];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleFilterChange = (newFilters: Partial<NotificationFilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleMarkRead = (id: string) => {
    console.log(`Marking notification ${id} as read`);
  };

  const handleMarkAllRead = () => {
    console.log("Marking all notifications as read");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Notifications</h1>
        <p className="text-sm text-muted-foreground">Stay updated on your portfolio and client activities.</p>
      </div>

      <NotificationFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onMarkAllRead={handleMarkAllRead}
        unreadCount={unreadCount}
      />

      <div className="flex-1">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Bell className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">No notifications</p>
            <p className="text-xs mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkRead={handleMarkRead}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}