import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { quoteFormSchema, QuoteFormData, workTypes } from "./QuoteFormTypes";
import QuoteFormProgress from "./QuoteFormProgress";
import QuoteFormStep1 from "./QuoteFormStep1";
import QuoteFormStep2 from "./QuoteFormStep2";
import QuoteFormStep3 from "./QuoteFormStep3";
import QuoteFormStep4 from "./QuoteFormStep4";
import QuoteFormStep5 from "./QuoteFormStep5";

interface QuoteFormProps {
  defaultWorkType?: string;
  onSuccess?: () => void;
}

const QuoteForm = ({ defaultWorkType, onSuccess }: QuoteFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      city: "",
      workType: defaultWorkType || "",
      description: "",
      surface: "",
      deadline: "",
      consent: false,
      website: "",
    },
    mode: "onChange",
  });

  const totalSteps = 5;

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof QuoteFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "phone", "email", "city"];
        break;
      case 2:
        fieldsToValidate = ["workType"];
        break;
      case 3:
        fieldsToValidate = ["description"];
        break;
      case 4:
        // No validation needed for photos (optional)
        return true;
      case 5:
        fieldsToValidate = ["consent"];
        break;
    }
    
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    // Check honeypot
    if (data.website && data.website.length > 0) {
      console.log("Spam detected");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert photos to base64 for email
      const photoData: { name: string; data: string }[] = [];
      for (const photo of photos) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(photo);
        });
        photoData.push({
          name: photo.name,
          data: base64,
        });
      }

      const workTypeLabel = workTypes.find(t => t.value === data.workType)?.label || data.workType;

      const { error } = await supabase.functions.invoke("send-quote-request", {
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          city: data.city,
          workType: workTypeLabel,
          description: data.description,
          surface: data.surface,
          deadline: data.deadline,
          photos: photoData,
        },
      });

      if (error) throw error;

      toast({
        title: "Anfrage erfolgreich gesendet!",
        description: "Vielen Dank! Wir melden uns innerhalb von 24-48 Stunden bei Ihnen.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error sending quote request:", error);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <QuoteFormStep1 form={form} />;
      case 2:
        return <QuoteFormStep2 form={form} />;
      case 3:
        return <QuoteFormStep3 form={form} />;
      case 4:
        return <QuoteFormStep4 photos={photos} setPhotos={setPhotos} />;
      case 5:
        return <QuoteFormStep5 form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <QuoteFormProgress currentStep={currentStep} totalSteps={totalSteps} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg border border-border">
            {renderStep()}
          </div>

          <div className="flex justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex-1 h-12"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex-1 h-12"
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 bg-gradient-primary hover:opacity-90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Anfrage senden
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuoteForm;
