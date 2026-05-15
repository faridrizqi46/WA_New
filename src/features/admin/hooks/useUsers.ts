import { useQuery } from "@tanstack/react-query";
import { getMockAdminUsers, getMockAdminUserById, getMockRoles } from "@/lib/mock-data";
import { UserFilterParams } from "@/types";

export function useAdminUsers(params?: UserFilterParams) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getMockAdminUsers(params),
    placeholderData: (prev) => prev,
  });
}

export function useAdminUser(id: string | null) {
  return useQuery({
    queryKey: ["admin-user", id],
    queryFn: () => getMockAdminUserById(id!),
    enabled: !!id,
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => getMockRoles(),
    staleTime: 1000 * 60 * 10,
  });
}