import { useEffect, useCallback, useRef } from "react";
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  // Prevent touch move on the overlay to stop background scrolling on mobile
  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (image) {
      // Save current scroll position
      scrollY.current = window.scrollY;
      
      // Lock body scroll - more robust for mobile
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      
      window.addEventListener("keydown", handleKeyDown);
      
      // Add touch prevention
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.addEventListener("touchmove", handleTouchMove, { passive: false });
      }
    }
    
    return () => {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      
      // Restore scroll position
      if (scrollY.current > 0) {
        window.scrollTo(0, scrollY.current);
      }
      
      window.removeEventListener("keydown", handleKeyDown);
      
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [image, handleKeyDown, handleTouchMove]);

  if (!image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in touch-none"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
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
        className="absolute left-2 md:left-4 z-50 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 md:right-4 z-50 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[80vh] md:max-h-[85vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
          draggable={false}
        />
        
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 rounded-b-lg">
          <h3 className="text-white text-lg md:text-xl font-semibold">{image.title}</h3>
          <p className="text-white/70 text-xs md:text-sm mt-1">
            {image.category} • {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryLightbox;
