import { useState, useMemo } from "react";
import { GalleryImage, GalleryCategory, categories } from "./GalleryData";
import GalleryLightbox from "./GalleryLightbox";

interface GalleryGridProps {
  images: GalleryImage[];
  showFilters?: boolean;
  maxItems?: number;
}

const GalleryGrid = ({ images, showFilters = true, maxItems }: GalleryGridProps) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Alle");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    const filtered =
      activeCategory === "Alle"
        ? images
        : images.filter((img) => img.category === activeCategory);
    return maxItems ? filtered.slice(0, maxItems) : filtered;
  }, [images, activeCategory, maxItems]);

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <>
      {/* Filter Buttons */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full mb-2">
                  {image.category}
                </span>
                <h4 className="text-white font-semibold text-lg">{image.title}</h4>
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        image={selectedImage}
        images={filteredImages}
        onClose={() => setSelectedImage(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};

export default GalleryGrid;
