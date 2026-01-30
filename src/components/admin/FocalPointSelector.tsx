import { cn } from "@/lib/utils";

// Simplified focal point - only 5 safe options to prevent extreme cropping
export type FocalPoint = 
  | "top" 
  | "left" 
  | "center" 
  | "right" 
  | "bottom";

const focalPointPositions: { value: FocalPoint; label: string; description: string }[] = [
  { value: "top", label: "↑", description: "Oben" },
  { value: "left", label: "←", description: "Links" },
  { value: "center", label: "●", description: "Mitte" },
  { value: "right", label: "→", description: "Rechts" },
  { value: "bottom", label: "↓", description: "Unten" },
];

interface FocalPointSelectorProps {
  value: FocalPoint;
  onChange: (value: FocalPoint) => void;
  disabled?: boolean;
}

export const FocalPointSelector = ({ value, onChange, disabled }: FocalPointSelectorProps) => {
  // Normalize old 9-point values to new 5-point system
  const normalizedValue = normalizeOldFocalPoint(value);
  
  return (
    <div className="flex items-center gap-1">
      {focalPointPositions.map((position) => (
        <button
          key={position.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(position.value)}
          className={cn(
            "w-7 h-7 rounded text-sm font-medium transition-all flex items-center justify-center",
            normalizedValue === position.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted hover:bg-muted-foreground/20 text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          title={position.description}
        >
          {position.label}
        </button>
      ))}
    </div>
  );
};

// Convert old 9-point values to new 5-point system for backwards compatibility
const normalizeOldFocalPoint = (focalPoint: string | null | undefined): FocalPoint => {
  if (!focalPoint) return "center";
  
  // Map old corner values to nearest cardinal direction
  const mapping: Record<string, FocalPoint> = {
    "top-left": "top",
    "top": "top",
    "top-right": "top",
    "left": "left",
    "center": "center",
    "right": "right",
    "bottom-left": "bottom",
    "bottom": "bottom",
    "bottom-right": "bottom",
  };
  
  return mapping[focalPoint] || "center";
};

// Convert focal point to CSS object-position value with balanced positioning
// Uses percentage values to prevent extreme cropping
export const focalPointToObjectPosition = (focalPoint: FocalPoint | string | null | undefined): string => {
  const normalizedPoint = normalizeOldFocalPoint(focalPoint);
  
  // Balanced positions that keep images visually centered while respecting focal point
  // Values are kept moderate (25%/75%) to prevent cutting off important parts
  const positions: Record<FocalPoint, string> = {
    "top": "center 25%",
    "left": "25% center",
    "center": "center center",
    "right": "75% center",
    "bottom": "center 75%",
  };
  
  return positions[normalizedPoint] || "center center";
};

export default FocalPointSelector;
