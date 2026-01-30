import { ZoomIn } from "lucide-react";
import { useImageLightbox } from "@/hooks/useImageLightbox";
import { cn } from "@/lib/utils";

interface ClickableImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  showZoomIcon?: boolean;
  style?: React.CSSProperties;
}

const ClickableImage = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  showZoomIcon = true,
  style,
}: ClickableImageProps) => {
  const { openImage } = useImageLightbox();

  return (
    <div
      className={cn(
        "relative cursor-pointer group overflow-hidden",
        containerClassName
      )}
      onClick={() => openImage(src, alt)}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-transform duration-500 group-hover:scale-105",
          className
        )}
        style={style}
        loading="lazy"
      />
      {showZoomIcon && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
    </div>
  );
};

export default ClickableImage;
