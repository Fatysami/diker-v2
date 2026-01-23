import { Check } from "lucide-react";

interface QuoteFormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Kontakt" },
  { number: 2, label: "Leistung" },
  { number: 3, label: "Details" },
  { number: 4, label: "Fotos" },
  { number: 5, label: "Absenden" },
];

const QuoteFormProgress = ({ currentStep, totalSteps }: QuoteFormProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.number
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  currentStep >= step.number ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 lg:w-24 h-1 mx-2 rounded transition-colors ${
                  currentStep > step.number ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuoteFormProgress;
