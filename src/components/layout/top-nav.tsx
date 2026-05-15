"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Bell, Search, Bot, User as UserIcon } from "lucide-react";

export function TopNav() {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search across modules..."
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border-r pr-4">
          <span className="flex h-6 items-center rounded-full bg-emerald-100 px-2 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
            MOCK ENV
          </span>
        </div>
        <button className="relative rounded-full p-2 hover:bg-muted">
          <Bot className="h-5 w-5" />
        </button>
        <button className="relative rounded-full p-2 hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-600"></span>
        </button>
        <div className="flex items-center gap-2 pl-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <UserIcon className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-medium leading-none">{user?.name || "Guest"}</span>
            <span className="text-xs text-muted-foreground">{user?.role}</span>
          </div>
          <button onClick={logout} className="ml-4 text-xs text-muted-foreground hover:text-foreground">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
