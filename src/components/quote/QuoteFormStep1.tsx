import { UseFormReturn } from "react-hook-form";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { QuoteFormData } from "./QuoteFormTypes";

interface QuoteFormStep1Props {
  form: UseFormReturn<QuoteFormData>;
}

const QuoteFormStep1 = ({ form }: QuoteFormStep1Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Ihre Kontaktdaten</h3>
        <p className="text-muted-foreground">Wie können wir Sie erreichen?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <Label className="flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-primary" />
                Vorname *
              </Label>
              <FormControl>
                <Input 
                  placeholder="Max" 
                  className="h-12 text-base"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <Label className="flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-primary" />
                Nachname *
              </Label>
              <FormControl>
                <Input 
                  placeholder="Mustermann" 
                  className="h-12 text-base"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <Label className="flex items-center gap-2 text-foreground">
              <Phone className="w-4 h-4 text-primary" />
              Telefon *
            </Label>
            <FormControl>
              <Input 
                type="tel"
                placeholder="+49 123 456789" 
                className="h-12 text-base"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <Label className="flex items-center gap-2 text-foreground">
              <Mail className="w-4 h-4 text-primary" />
              E-Mail *
            </Label>
            <FormControl>
              <Input 
                type="email"
                placeholder="ihre@email.de" 
                className="h-12 text-base"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <Label className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              Stadt / Ort des Projekts *
            </Label>
            <FormControl>
              <Input 
                placeholder="z.B. Solingen, Wuppertal..." 
                className="h-12 text-base"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default QuoteFormStep1;
