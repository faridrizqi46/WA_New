"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useCollateral } from "@/features/collateral/hooks/useCollaterals";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Building2, Calendar, MapPin, Shield, FileText, AlertTriangle } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { COLLATERAL_TYPE_CONFIG, COLLATERAL_STATUS_CONFIG } from "@/lib/mock-data";

export default function CollateralDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data: response, isLoading } = useCollateral(id);
  const asset = response?.data;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-sm">Collateral not found</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/collateral")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to List
        </Button>
      </div>
    );
  }

  const typeConfig = COLLATERAL_TYPE_CONFIG[asset.type];
  const statusConfig = COLLATERAL_STATUS_CONFIG[asset.status];
  const isInsuranceExpiringSoon = asset.insuranceExpiry
    ? differenceInDays(new Date(asset.insuranceExpiry), new Date()) <= 30
    : false;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/collateral")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{asset.description}</h1>
              <Badge className={`${statusConfig.bgColor}`} style={{ color: statusConfig.color }}>
                {statusConfig.label}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {asset.companyName}
              </div>
              <Badge variant="outline" style={{ borderColor: typeConfig.color, color: typeConfig.color }}>
                {typeConfig.label}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </Button>
          <Button>Edit Collateral</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-1">Appraised Value</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(asset.appraisedValue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-1">Coverage Ratio</p>
            <p className={`text-2xl font-bold ${asset.coverageRatio >= 1.2 ? "text-emerald-600" : asset.coverageRatio >= 1.0 ? "text-amber-600" : "text-red-600"}`}>
              {asset.coverageRatio.toFixed(2)}x
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-1">Insurance Expiry</p>
            <p className={`text-2xl font-bold ${isInsuranceExpiringSoon ? "text-red-600" : ""}`}>
              {asset.insuranceExpiry ? format(new Date(asset.insuranceExpiry), "MMM dd, yyyy") : "-"}
            </p>
            {isInsuranceExpiringSoon && (
              <Badge variant="destructive" className="mt-1 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Expiring Soon
              </Badge>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground mb-1">Next Appraisal</p>
            <p className="text-2xl font-bold">
              {asset.nextAppraisalDate ? format(new Date(asset.nextAppraisalDate), "MMM dd, yyyy") : "-"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Asset Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {asset.location || "-"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Appraisal</p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(asset.appraisalDate), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
            {asset.latitude && asset.longitude && (
              <div>
                <p className="text-muted-foreground mb-2">GPS Coordinates</p>
                <p className="text-sm font-mono bg-muted p-2 rounded">
                  {asset.latitude.toFixed(6)}, {asset.longitude.toFixed(6)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Valuation History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border bg-emerald-50/50 dark:bg-emerald-950/20">
                <div>
                  <p className="text-sm font-medium">IDR {new Intl.NumberFormat("en-US", { notation: "compact" }).format(asset.appraisedValue * 1.1)}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(Date.now() - 365 * 86400000), "MMM yyyy")} - Previous</p>
                </div>
                <Badge variant="secondary">+10%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div>
                  <p className="text-sm font-medium">IDR {new Intl.NumberFormat("en-US", { notation: "compact" }).format(asset.appraisedValue)}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(asset.appraisalDate), "MMM yyyy")} - Current</p>
                </div>
                <Badge>Current</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}