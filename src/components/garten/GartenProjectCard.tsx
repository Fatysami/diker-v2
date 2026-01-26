import { 
  Warehouse, Map, Grid3X3, Flower2, LayoutGrid, DoorOpen, 
  TreeDeciduous, Fence, LucideIcon, ImageIcon 
} from "lucide-react";

interface GartenProjectCardProps {
  title: string;
  description: string;
  imageUrl: string | null;
  imageUrl2: string | null;
  imageUrl3: string | null;
  imageUrl4: string | null;
  icon: string;
  index: number;
}

const iconMap: Record<string, LucideIcon> = {
  Warehouse,
  Map,
  Grid3X3,
  Flower2,
  LayoutGrid,
  DoorOpen,
  TreeDeciduous,
  Fence,
};

const GartenProjectCard = ({ 
  title, 
  description, 
  imageUrl, 
  imageUrl2, 
  imageUrl3, 
  imageUrl4, 
  icon, 
  index 
}: GartenProjectCardProps) => {
  const IconComponent = iconMap[icon] || Warehouse;
  const isEven = index % 2 === 0;

  // Check if we have any images
  const hasImages = imageUrl || imageUrl2 || imageUrl3 || imageUrl4;

  return (
    <div className={`group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl ${isEven ? '' : 'lg:[direction:rtl]'}`}>
      {/* Images Section - 2x2 Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-1 lg:[direction:ltr]">
        {/* Main large image - top left */}
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${title} - Bild 1`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
              <IconComponent className="w-12 h-12 text-primary/20" />
            </div>
          )}
        </div>

        {/* Image 2 - top right */}
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          {imageUrl2 ? (
            <img
              src={imageUrl2}
              alt={`${title} - Bild 2`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/80">
              <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Image 3 - bottom left */}
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          {imageUrl3 ? (
            <img
              src={imageUrl3}
              alt={`${title} - Bild 3`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/80">
              <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Image 4 - bottom right */}
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          {imageUrl4 ? (
            <img
              src={imageUrl4}
              alt={`${title} - Bild 4`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/80">
              <ImageIcon className="w-6 h-6 text-muted-foreground/30" />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center p-6 lg:p-10 lg:[direction:ltr]">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Projekt {index + 1}
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mt-1 leading-tight">
              {title}
            </h3>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GartenProjectCard;
