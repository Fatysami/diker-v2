import { UseFormReturn } from "react-hook-form";
import { Wrench } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuoteFormData, workTypes } from "./QuoteFormTypes";

interface QuoteFormStep2Props {
  form: UseFormReturn<QuoteFormData>;
}

const QuoteFormStep2 = ({ form }: QuoteFormStep2Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Art der Arbeiten</h3>
        <p className="text-muted-foreground">Welche Leistung benötigen Sie?</p>
      </div>

      <FormField
        control={form.control}
        name="workType"
        render={({ field }) => (
          <FormItem>
            <Label className="flex items-center gap-2 text-foreground">
              <Wrench className="w-4 h-4 text-primary" />
              Leistungsart *
            </Label>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Bitte wählen Sie eine Leistung" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {workTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} className="text-base py-3">
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-8 p-6 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Unsere Leistungen umfassen:</h4>
        <ul className="space-y-2 text-muted-foreground text-sm">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Straßenbau & Asphaltarbeiten
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Tiefbau & Erdarbeiten
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Kanalbau & Rohrleitungen
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Garten- & Landschaftsbau
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuoteFormStep2;
