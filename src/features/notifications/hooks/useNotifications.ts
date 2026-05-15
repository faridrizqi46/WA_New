import { useQuery } from "@tanstack/react-query";
import { getMockNotifications } from "@/lib/mock-data";
import { NotificationFilterParams } from "@/types";

export function useNotifications(params: NotificationFilterParams) {
  return useQuery({
    queryKey: ["notifications", params],
    queryFn: () => getMockNotifications(params),
    placeholderData: (prev) => prev,
  });
}