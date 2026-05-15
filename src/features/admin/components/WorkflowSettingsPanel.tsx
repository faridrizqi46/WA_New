"use client";

import { useWorkflowSettings } from "../hooks/useWorkflowSettings";
import { WorkflowSetting } from "@/types";
import { Settings, FileText, Building, CreditCard } from "lucide-react";

const ENTITY_ICONS: Record<string, React.ElementType> = {
  VISIT: FileText,
  COLATERAL: Building,
  CREDIT_ANALYSIS: CreditCard,
  DOCUMENT: FileText,
};

function WorkflowCard({ setting }: { setting: WorkflowSetting }) {
  const Icon = ENTITY_ICONS[setting.entityType] || Settings;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-gray-900">{setting.entityTypeLabel}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded ${setting.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
          {setting.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {setting.mandatoryFields && setting.mandatoryFields.length > 0 && (
        <div className="mb-3">
          <span className="text-xs text-gray-500 font-medium">Mandatory Fields:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {setting.mandatoryFields.map((field) => (
              <span key={field.fieldName} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {field.fieldLabel}
                {field.required && <span className="text-red-400 ml-0.5">*</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {setting.visitTypes && setting.visitTypes.length > 0 && (
        <div>
          <span className="text-xs text-gray-500 font-medium">Visit Types:</span>
          <div className="space-y-2 mt-2">
            {setting.visitTypes.map((vt) => (
              <div key={vt.visitType} className="text-xs">
                <div className="font-medium text-gray-700">{vt.visitType}</div>
                <div className="text-gray-500 mt-1">Checklist: {vt.checklistTemplate.join(", ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function WorkflowSettingsPanel() {
  const { data, isLoading } = useWorkflowSettings();

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        data?.data.map((setting) => (
          <WorkflowCard key={setting.id} setting={setting} />
        ))
      )}
    </div>
  );
}