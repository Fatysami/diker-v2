import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

interface ContactInfo {
  id: string;
  type: string;
  value: string;
  icon: string | null;
  display_order: number;
}

interface AdminContactTabProps {
  contactInfo: ContactInfo[];
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo[]>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
}

const getIconForType = (type: string) => {
  switch (type) {
    case "address":
      return MapPin;
    case "phone":
      return Phone;
    case "email":
      return Mail;
    case "hours":
      return Clock;
    default:
      return Phone;
  }
};

const getLabelForType = (type: string) => {
  switch (type) {
    case "address":
      return "Adresse";
    case "phone":
      return "Telefon";
    case "email":
      return "E-Mail";
    case "hours":
      return "Öffnungszeiten";
    default:
      return type;
  }
};

const AdminContactTab = ({
  contactInfo,
  setContactInfo,
  saving,
  setSaving,
  onRefresh,
}: AdminContactTabProps) => {
  const handleContactChange = (id: string, value: string) => {
    setContactInfo(prev =>
      prev.map(item => item.id === id ? { ...item, value } : item)
    );
  };

  const saveContactInfo = async () => {
    setSaving(true);

    try {
      for (const info of contactInfo) {
        const { error } = await supabase
          .from("contact_info")
          .update({ value: info.value })
          .eq("id", info.id);

        if (error) throw error;
      }

      toast.success("Kontaktinformationen erfolgreich gespeichert!");
      onRefresh();
    } catch (error) {
      console.error("Error saving contact info:", error);
      toast.error("Fehler beim Speichern der Kontaktinformationen");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Kontaktinformationen</h2>
        <Button onClick={saveContactInfo} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Speichern..." : "Speichern"}
        </Button>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border">
        <p className="text-muted-foreground mb-6">
          Diese Informationen werden auf der gesamten Website angezeigt (Header, Footer, Kontaktseite).
        </p>
        
        <div className="grid gap-6">
          {contactInfo.map((info) => {
            const Icon = getIconForType(info.type);
            const label = getLabelForType(info.type);
            
            return (
              <div key={info.id} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-6">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {label}
                  </label>
                  <Input
                    value={info.value}
                    onChange={(e) => handleContactChange(info.id, e.target.value)}
                    placeholder={`${label} eingeben...`}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {info.type === "phone" && "Format: 0212 22 66 39 31"}
                    {info.type === "email" && "Format: info@beispiel.de"}
                    {info.type === "address" && "Format: Straße Nr., PLZ Stadt"}
                    {info.type === "hours" && "Format: Mo–Fr: 7:00–17:00 Uhr"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminContactTab;
