import { cn } from "@/lib/utils";

export type FocalPoint = 
  | "top-left" 
  | "top" 
  | "top-right" 
  | "left" 
  | "center" 
  | "right" 
  | "bottom-left" 
  | "bottom" 
  | "bottom-right";

const focalPointPositions: { value: FocalPoint; label: string }[] = [
  { value: "top-left", label: "↖" },
  { value: "top", label: "↑" },
  { value: "top-right", label: "↗" },
  { value: "left", label: "←" },
  { value: "center", label: "●" },
  { value: "right", label: "→" },
  { value: "bottom-left", label: "↙" },
  { value: "bottom", label: "↓" },
  { value: "bottom-right", label: "↘" },
];

interface FocalPointSelectorProps {
  value: FocalPoint;
  onChange: (value: FocalPoint) => void;
  disabled?: boolean;
}

export const FocalPointSelector = ({ value, onChange, disabled }: FocalPointSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-1 w-fit">
      {focalPointPositions.map((position) => (
        <button
          key={position.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(position.value)}
          className={cn(
            "w-6 h-6 rounded text-xs font-medium transition-all flex items-center justify-center",
            value === position.value
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted-foreground/20 text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          title={`Fokus: ${position.value}`}
        >
          {position.label}
        </button>
      ))}
    </div>
  );
};

// Convert focal point to CSS object-position value
export const focalPointToObjectPosition = (focalPoint: FocalPoint | string | null | undefined): string => {
  const positions: Record<FocalPoint, string> = {
    "top-left": "top left",
    "top": "top center",
    "top-right": "top right",
    "left": "center left",
    "center": "center center",
    "right": "center right",
    "bottom-left": "bottom left",
    "bottom": "bottom center",
    "bottom-right": "bottom right",
  };
  
  return positions[(focalPoint as FocalPoint) || "center"] || "center center";
};

export default FocalPointSelector;
