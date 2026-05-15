"use client";

import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { useVisitChecklist } from "../hooks/useVisits";
import { VISIT_STATUS_CONFIG, VISIT_TYPE_CONFIG } from "@/lib/mock-data";
import { Visit, VisitChecklistItem } from "@/types";
import { Navigation, Camera, MapPin, CheckCircle2, X, Mic, FileText, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface VisitCheckInProps {
  visit: Visit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (visitId: string, data: { summary: string; notes: string }) => void;
}

export function VisitCheckIn({ visit, open, onOpenChange, onComplete }: VisitCheckInProps) {
  const [step, setStep] = useState<"info" | "gps" | "photos" | "checklist" | "notes" | "confirm">("info");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [checklistItems, setChecklistItems] = useState<VisitChecklistItem[]>([]);
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: checklistResponse } = useVisitChecklist(visit?.id || "");

  useEffect(() => {
    if (checklistResponse?.data) {
      setChecklistItems(checklistResponse.data);
    }
  }, [checklistResponse]);

  const handleGetLocation = () => {
    setGpsLoading(true);
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by this browser");
      setGpsLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setGpsLoading(false);
      },
      (error) => {
        setGpsError(error.message);
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePhotoCapture = () => {
    const newPhotoUrl = `https://picsum.photos/seed/${Date.now()}/400/300`;
    setPhotoUrls((prev) => [...prev, newPhotoUrl]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    onComplete(visit!.id, { summary, notes });
    setSubmitting(false);
    resetState();
    onOpenChange(false);
  };

  const resetState = () => {
    setStep("info");
    setGpsCoords(null);
    setGpsError(null);
    setPhotoUrls([]);
    setSummary("");
    setNotes("");
    setChecklistItems([]);
  };

  const handleClose = () => {
    resetState();
    onOpenChange(false);
  };

  const steps = [
    { key: "info", label: "Info" },
    { key: "gps", label: "Location" },
    { key: "photos", label: "Photos" },
    { key: "checklist", label: "Checklist" },
    { key: "notes", label: "Notes" },
    { key: "confirm", label: "Confirm" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  if (!visit) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Visit Check-In
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" style={{ borderColor: VISIT_TYPE_CONFIG[visit.visitType].color, color: VISIT_TYPE_CONFIG[visit.visitType].color }}>
              {VISIT_TYPE_CONFIG[visit.visitType].label}
            </Badge>
            <span className="text-sm font-medium">{visit.companyName}</span>
          </div>
        </DialogHeader>

        <div className="px-6 pb-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${i <= currentStepIndex ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  {i < currentStepIndex ? <CheckCircle2 className="h-3 w-3" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && <ChevronRight className="h-3 w-3 mx-1" />}
              </div>
            ))}
          </div>

          {step === "info" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Date</span>
                  <p className="font-medium">{format(new Date(visit.scheduledAt), "MMMM dd, yyyy")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Time</span>
                  <p className="font-medium">{format(new Date(visit.scheduledAt), "HH:mm")}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Purpose</span>
                  <p className="font-medium">{visit.purpose || "Not specified"}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Location</span>
                  <p className="font-medium">{visit.location || "Not specified"}</p>
                </div>
              </div>
              <Button className="w-full" onClick={() => setStep("gps")}>
                Continue
              </Button>
            </div>
          )}

          {step === "gps" && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/50">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                {gpsCoords ? (
                  <div className="text-center">
                    <p className="text-sm font-medium text-emerald-600">Location Captured</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {gpsCoords.lat.toFixed(6)}, {gpsCoords.lng.toFixed(6)}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                ) : gpsError ? (
                  <div className="text-center">
                    <p className="text-sm text-red-600">{gpsError}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={handleGetLocation}>
                      Retry
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Tap to capture your current location</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("info")}>
                  Back
                </Button>
                <Button className="flex-1 gap-2" onClick={handleGetLocation} disabled={gpsLoading}>
                  <Navigation className="h-4 w-4" />
                  {gpsLoading ? "Getting location..." : gpsCoords ? "Update Location" : "Capture Location"}
                </Button>
                <Button className="flex-1" onClick={() => setStep("photos")} disabled={!gpsCoords && !gpsError}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === "photos" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Take photos of the location and assets</p>
                <span className="text-xs font-medium">{photoUrls.length} photo(s)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {photoUrls.map((url, i) => (
                  <div key={i} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                    <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => handleRemovePhoto(i)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handlePhotoCapture}
                  className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Camera className="h-8 w-8 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Add Photo</span>
                </button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("gps")}>
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep("checklist")}>
                  Continue ({photoUrls.length} photos)
                </Button>
              </div>
            </div>
          )}

          {step === "checklist" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Complete the checklist items</p>
              <div className="space-y-2">
                {checklistItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No checklist items for this visit</p>
                ) : (
                  checklistItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                      <Checkbox
                        id={item.id}
                        checked={item.checked}
                        onCheckedChange={(checked) => {
                          setChecklistItems((prev) => prev.map((c) => (c.id === item.id ? { ...c, checked: !!checked } : c)));
                        }}
                      />
                      <label htmlFor={item.id} className={`flex-1 text-sm ${item.checked ? "line-through text-muted-foreground" : ""}`}>
                        {item.label}
                      </label>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("photos")}>
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep("notes")}>
                  Continue ({checklistItems.filter((c) => c.checked).length}/{checklistItems.length})
                </Button>
              </div>
            </div>
          )}

          {step === "notes" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Visit Summary</label>
                <textarea
                  className="w-full min-h-[100px] p-3 text-sm border rounded-lg resize-none bg-background"
                  placeholder="Brief summary of the visit..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Notes</label>
                <textarea
                  className="w-full min-h-[80px] p-3 text-sm border rounded-lg resize-none bg-background"
                  placeholder="Any additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("checklist")}>
                  Back
                </Button>
                <Button className="flex-1" onClick={() => setStep("confirm")}>
                  Review
                </Button>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-emerald-50 dark:bg-emerald-950/30 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">Visit will be marked as COMPLETED</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Photos: {photoUrls.length}</p>
                  <p>Checklist: {checklistItems.filter((c) => c.checked).length}/{checklistItems.length} completed</p>
                </div>
              </div>
              {summary && (
                <div className="p-3 border rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Summary</p>
                  <p className="text-sm">{summary}</p>
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("notes")}>
                  Back
                </Button>
                <Button className="flex-1 gap-2" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Submitting..." : "Complete Visit"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}