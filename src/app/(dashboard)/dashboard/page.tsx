import { HeaderSummary } from "@/features/dashboard/components/header-summary";
import { KPICards } from "@/features/dashboard/components/kpi-cards";
import { AIInsightsFeed } from "@/features/dashboard/components/ai-insights-feed";
import { ActionCenter } from "@/features/dashboard/components/action-center";
import { RiskAlertStream } from "@/features/dashboard/components/risk-alert-stream";
import { PipelineSnapshot } from "@/features/dashboard/components/pipeline-snapshot";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex justify-end">
        <DatePickerWithRange />
      </div>
      
      <HeaderSummary />
      <KPICards />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Main Column */}
        <div className="flex flex-col gap-6 md:col-span-2 xl:col-span-3">
          <div className="grid gap-6 md:grid-cols-2">
            <ActionCenter />
            <RiskAlertStream />
          </div>
          <PipelineSnapshot />
        </div>
        
        {/* Right Sidebar */}
        <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
          <div className="h-[600px] lg:h-full">
            <AIInsightsFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
