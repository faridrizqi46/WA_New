import { useState } from "react";
import { AIChatMessage, AICommand, AIConversationContext } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface AIChatProps {
  messages: AIChatMessage[];
  context: AIConversationContext;
  onSendMessage: (content: string, command?: AICommand) => void;
  isLoading: boolean;
}

const COMMAND_LABELS: Record<AICommand, string> = {
  SUMMARIZE_COMPANY: "Summarize Company",
  ANALYZE_FINANCIALS: "Analyze Financials",
  GENERATE_PROPOSAL: "Generate Proposal",
  GENERATE_CALL_REPORT: "Generate Call Report",
  EXPLAIN_RISK: "Explain Risk",
  COMPARE_INDUSTRY: "Compare Industry",
  PREPARE_COMMITTEE_QA: "Prepare Committee Q&A",
  SUMMARIZE_DOCUMENT: "Summarize Document",
  FREE_FORM: "Free Form",
};

export function AIChat({ messages, context, onSendMessage, isLoading }: AIChatProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim(), "FREE_FORM");
    setInput("");
  };

  const handleCommandClick = (command: AICommand, prompt: string) => {
    onSendMessage(prompt, command);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <Bot className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">Ask me anything about your portfolio</p>
            <p className="text-xs mt-1 text-center max-w-xs">
              I can help analyze companies, generate proposals, explain risks, and more.
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              {msg.command && msg.role === "user" && (
                <Badge variant="secondary" className="mb-2 text-xs">
                  {COMMAND_LABELS[msg.command]}
                </Badge>
              )}
              <div className="text-sm whitespace-pre-wrap">
                {msg.isStreaming ? (
                  <span className="animate-pulse">{msg.content}</span>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "assistant" && (
                <div className="text-xs text-muted-foreground mt-2">
                  {format(new Date(msg.timestamp), "HH:mm")}
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="bg-muted rounded-2xl p-4 max-w-[80%]">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking...
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about companies, risks, proposals..."
            className="flex-1 h-10 px-4 rounded-lg border bg-background text-sm"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}