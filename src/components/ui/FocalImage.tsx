import { focalPointToObjectPosition, FocalPoint } from "@/components/admin/FocalPointSelector";
import { cn } from "@/lib/utils";

interface FocalImageProps {
  src: string;
  alt: string;
  focalPoint?: FocalPoint | string | null;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
}

/**
 * An image component that respects focal point settings.
 * The image uses object-fit: cover and positions based on the focal point.
 */
const FocalImage = ({ 
  src, 
  alt, 
  focalPoint = "center", 
  className,
  containerClassName,
  onClick 
}: FocalImageProps) => {
  const objectPosition = focalPointToObjectPosition(focalPoint);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        style={{ objectPosition }}
        onClick={onClick}
      />
    </div>
  );
};

export default FocalImage;
