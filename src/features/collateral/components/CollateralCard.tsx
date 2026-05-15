"use client";

import { CollateralAsset } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { COLLATERAL_TYPE_CONFIG, COLLATERAL_STATUS_CONFIG } from "@/lib/mock-data";

interface CollateralCardProps {
  asset: CollateralAsset;
  onClick: (asset: CollateralAsset) => void;
}

export function CollateralCard({ asset, onClick }: CollateralCardProps) {
  const typeConfig = COLLATERAL_TYPE_CONFIG[asset.type];
  const statusConfig = COLLATERAL_STATUS_CONFIG[asset.status];

  const isInsuranceExpiringSoon = asset.insuranceExpiry
    ? differenceInDays(new Date(asset.insuranceExpiry), new Date()) <= 30
    : false;

  return (
    <Card className="group hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(asset)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="outline"
                style={{ borderColor: typeConfig.color, color: typeConfig.color, backgroundColor: `${typeConfig.color}15` }}
                className="text-xs"
              >
                {typeConfig.label}
              </Badge>
              <Badge className={`${statusConfig.bgColor} text-xs`} style={{ color: statusConfig.color }}>
                {statusConfig.label}
              </Badge>
              {isInsuranceExpiringSoon && (
                <Badge variant="destructive" className="text-xs animate-pulse">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Expiring Soon
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-sm mb-1 line-clamp-2">{asset.description}</h3>

            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <Building2 className="h-3 w-3" />
              <span>{asset.companyName}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {asset.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{asset.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Appraised {format(new Date(asset.appraisalDate), "MMM yyyy")}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-lg font-bold">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "IDR", notation: "compact", maximumFractionDigits: 1 }).format(asset.appraisedValue)}
              </p>
              <p className="text-[10px] text-muted-foreground">Coverage: {asset.coverageRatio.toFixed(2)}x</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}