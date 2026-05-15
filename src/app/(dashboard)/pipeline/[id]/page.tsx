"use client";

import { use } from "react";
import { useOpportunity } from "@/features/pipeline/hooks/useOpportunity";
import { OpportunityDrawer } from "@/features/pipeline/components/OpportunityDrawer";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function PipelineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: response, isLoading } = useOpportunity(id);

  const handleClose = () => {
    router.push("/pipeline");
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const opp = response?.data;

  // We mount the drawer and force it open. When closed, we redirect to the main pipeline.
  // This satisfies the "standalone page for direct URL access" requirement while
  // keeping the UX consistent (details are always in a drawer).
  return (
    <>
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-sm mt-1">Loading opportunity detail...</p>
      </div>
      {opp && (
        <OpportunityDrawer
          opportunity={opp}
          open={true}
          onOpenChange={handleClose}
        />
      )}
    </>
  );
}
