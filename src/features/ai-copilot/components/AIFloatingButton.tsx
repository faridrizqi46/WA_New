"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import Link from "next/link";

interface AIFloatingButtonProps {
  className?: string;
}

export function AIFloatingButton({ className = "" }: AIFloatingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/ai-copilot"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Bot className="h-5 w-5" />
      <span className={`text-sm font-medium transition-all ${isHovered ? "opacity-100 max-w-full" : "opacity-0 max-w-0 overflow-hidden whitespace-nowrap"}`}>
        AI Copilot
      </span>
    </Link>
  );
}