import { useQuery } from "@tanstack/react-query";
import { getMockCollaterals, getMockCollateralById } from "@/lib/mock-data";
import { CollateralFilterParams } from "@/types";

export function useCollaterals(params: CollateralFilterParams) {
  return useQuery({
    queryKey: ["collaterals", params],
    queryFn: () => getMockCollaterals(params),
    placeholderData: (prev) => prev,
  });
}

export function useCollateral(id: string | null) {
  return useQuery({
    queryKey: ["collateral", id],
    queryFn: () => getMockCollateralById(id!),
    enabled: !!id,
  });
}