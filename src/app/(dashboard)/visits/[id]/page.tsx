"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useVisit } from "@/features/visits/hooks/useVisit";
import { VisitDetailDrawer } from "@/features/visits/components/VisitDetailDrawer";
import { Skeleton } from "@/components/ui/skeleton";

export default function VisitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: response, isLoading } = useVisit(id);

  const handleClose = () => {
    router.push("/visits");
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const visit = response?.data;

  return (
    <>
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-sm mt-1">Loading visit detail...</p>
      </div>
      {visit && (
        <VisitDetailDrawer
          visit={visit}
          open={true}
          onOpenChange={handleClose}
        />
      )}
    </>
  );
}