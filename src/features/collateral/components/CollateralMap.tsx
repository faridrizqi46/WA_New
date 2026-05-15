"use client";

import { CollateralAsset } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2 } from "lucide-react";
import { COLLATERAL_TYPE_CONFIG } from "@/lib/mock-data";

interface CollateralMapProps {
  assets: CollateralAsset[];
  selectedAssetId?: string;
  onAssetClick: (asset: CollateralAsset) => void;
}

export function CollateralMap({ assets, selectedAssetId, onAssetClick }: CollateralMapProps) {
  const assetsWithCoords = assets.filter((a) => a.latitude && a.longitude);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="h-[400px] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm font-medium">Map View</p>
              <p className="text-xs">{assetsWithCoords.length} assets with location data</p>
            </div>
          </div>

          {assetsWithCoords.slice(0, 5).map((asset, index) => {
            const typeConfig = COLLATERAL_TYPE_CONFIG[asset.type];
            const isSelected = selectedAssetId === asset.id;
            const offsetX = (index % 3 - 1) * 30;
            const offsetY = Math.floor(index / 3) * 30;

            return (
              <button
                key={asset.id}
                onClick={() => onAssetClick(asset)}
                className={`absolute transition-all ${isSelected ? "scale-125 z-10" : "hover:scale-110"}`}
                style={{
                  top: `${35 + offsetY}%`,
                  left: `${40 + offsetX}%`,
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 ${
                    isSelected ? "border-primary" : "border-white"
                  }`}
                  style={{ backgroundColor: typeConfig.color }}
                >
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap bg-background border rounded-lg px-2 py-1 shadow-lg">
                  <p className="text-xs font-medium max-w-[120px] truncate">{asset.companyName}</p>
                  <p className="text-[10px] text-muted-foreground">{typeConfig.label}</p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}