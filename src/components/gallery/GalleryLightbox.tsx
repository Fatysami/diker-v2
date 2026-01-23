import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "./GalleryData";

interface GalleryLightboxProps {
  image: GalleryImage | null;
  images: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const GalleryLightbox = ({
  image,
  images,
  onClose,
  onNext,
  onPrev,
}: GalleryLightboxProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, handleKeyDown]);

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Schließen"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
          <h3 className="text-white text-xl font-semibold">{image.title}</h3>
          <p className="text-white/70 text-sm mt-1">
            {image.category} • {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryLightbox;
