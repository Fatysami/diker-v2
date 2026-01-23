import { UseFormReturn } from "react-hook-form";
import { FileText, Ruler, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { QuoteFormData } from "./QuoteFormTypes";

interface QuoteFormStep3Props {
  form: UseFormReturn<QuoteFormData>;
}

const QuoteFormStep3 = ({ form }: QuoteFormStep3Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Projektdetails</h3>
        <p className="text-muted-foreground">Beschreiben Sie Ihr Vorhaben</p>
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <Label className="flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              Projektbeschreibung *
            </Label>
            <FormControl>
              <Textarea 
                placeholder="Beschreiben Sie Ihr Projekt: Was soll gemacht werden? Welches Problem möchten Sie lösen?"
                className="min-h-[150px] text-base resize-none"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="surface"
          render={({ field }) => (
            <FormItem>
              <Label className="flex items-center gap-2 text-foreground">
                <Ruler className="w-4 h-4 text-primary" />
                Geschätzte Fläche (m²)
              </Label>
              <FormControl>
                <Input 
                  placeholder="z.B. 50, 100, 500..." 
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
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <Label className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                Gewünschter Zeitraum
              </Label>
              <FormControl>
                <Input 
                  placeholder="z.B. Frühjahr 2025" 
                  className="h-12 text-base"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default QuoteFormStep3;
