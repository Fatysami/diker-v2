import { UseFormReturn } from "react-hook-form";
import { Shield, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { QuoteFormData, workTypes } from "./QuoteFormTypes";

interface QuoteFormStep5Props {
  form: UseFormReturn<QuoteFormData>;
}

const QuoteFormStep5 = ({ form }: QuoteFormStep5Props) => {
  const values = form.getValues();
  const selectedWorkType = workTypes.find(t => t.value === values.workType);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Zusammenfassung & Absenden</h3>
        <p className="text-muted-foreground">Überprüfen Sie Ihre Angaben</p>
      </div>

      {/* Summary */}
      <div className="bg-muted/30 rounded-xl p-6 space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Ihre Anfrage
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground font-medium">{values.firstName} {values.lastName}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-primary mt-0.5" />
              <span className="text-foreground">{values.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-primary mt-0.5" />
              <span className="text-foreground">{values.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5" />
              <span className="text-foreground">{values.city}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="text-muted-foreground">Leistung:</span>
              <span className="ml-2 text-foreground font-medium">{selectedWorkType?.label}</span>
            </div>
            {values.surface && (
              <div>
                <span className="text-muted-foreground">Fläche:</span>
                <span className="ml-2 text-foreground">{values.surface} m²</span>
              </div>
            )}
            {values.deadline && (
              <div>
                <span className="text-muted-foreground">Zeitraum:</span>
                <span className="ml-2 text-foreground">{values.deadline}</span>
              </div>
            )}
          </div>
        </div>

        {values.description && (
          <div className="pt-3 border-t border-border">
            <span className="text-muted-foreground text-sm">Beschreibung:</span>
            <p className="text-foreground mt-1">{values.description}</p>
          </div>
        )}
      </div>

      {/* Consent */}
      <FormField
        control={form.control}
        name="consent"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              </FormControl>
              <Label className="text-sm text-foreground leading-relaxed cursor-pointer">
                <Shield className="w-4 h-4 text-primary inline mr-1" />
                Ich stimme der Verarbeitung meiner Daten gemäß{" "}
                <a href="/datenschutz" className="text-primary hover:underline" target="_blank">
                  Datenschutzerklärung
                </a>{" "}
                zu. *
              </Label>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Honeypot - hidden from users */}
      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem className="hidden" aria-hidden="true">
            <FormControl>
              <input 
                type="text" 
                tabIndex={-1} 
                autoComplete="off"
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="text-center text-sm text-muted-foreground">
        Nach dem Absenden erhalten Sie eine Bestätigung per E-Mail.
        <br />
        Wir melden uns innerhalb von 24-48 Stunden bei Ihnen.
      </div>
    </div>
  );
};

export default QuoteFormStep5;
