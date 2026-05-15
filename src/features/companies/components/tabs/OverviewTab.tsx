"use client";

import { CompanyDetail } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Globe, Phone, Mail, Star } from "lucide-react";

interface OverviewTabProps { company: CompanyDetail; }

export function OverviewTab({ company }: OverviewTabProps) {
  const infoItems = [
    { label: "Legal Name", value: company.name },
    { label: "Group", value: company.groupName ?? "—" },
    { label: "Industry", value: company.industry ?? "—" },
    { label: "Region", value: company.region ?? "—" },
    { label: "Legal Status", value: company.legalStatus ?? "—" },
    { label: "Incorporated", value: company.incorporatedDate ? new Date(company.incorporatedDate).getFullYear() : "—" },
    { label: "Tax ID (NPWP)", value: company.taxId ?? "—" },
    { label: "Address", value: company.address ?? "—" },
    { label: "Revenue Range", value: company.revenueRange ?? "—" },
    { label: "RM Owner", value: company.rmName },
  ];

  const primaryContact = company.contacts.find((c) => c.isPrimary) ?? company.contacts[0];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Company Info */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{company.description}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
            {infoItems.map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</dt>
                <dd className="text-sm font-medium mt-0.5">{String(item.value)}</dd>
              </div>
            ))}
          </dl>
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center gap-1.5 text-sm text-primary hover:underline">
              <Globe className="h-3.5 w-3.5" />
              {company.website}
            </a>
          )}
        </CardContent>
      </Card>

      {/* Primary Contact */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            Key Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {company.contacts.map((contact) => (
            <div key={contact.id} className={`p-3 rounded-lg border ${contact.isPrimary ? "border-primary/30 bg-primary/5" : "border-border"}`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold">{contact.name}</p>
                {contact.isPrimary && <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Primary</span>}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{contact.title}</p>
              <div className="space-y-1">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                  <Mail className="h-3 w-3" />{contact.email}
                </a>
                {contact.phone && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />{contact.phone}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
