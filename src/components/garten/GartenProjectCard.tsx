import { 
  Warehouse, Map, Grid3X3, Flower2, LayoutGrid, DoorOpen, 
  TreeDeciduous, Fence, LucideIcon, ImageIcon 
} from "lucide-react";

interface GartenProjectCardProps {
  title: string;
  description: string;
  imageUrl: string | null;
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

const GartenProjectCard = ({ title, description, imageUrl, icon, index }: GartenProjectCardProps) => {
  const IconComponent = iconMap[icon] || Warehouse;
  const isEven = index % 2 === 0;

  return (
    <div 
      className={`group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center ${
        !isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image Section */}
      <div className={`relative ${!isEven ? 'lg:order-2' : ''}`}>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
              <IconComponent className="w-20 h-20 text-primary/30" />
            </div>
          )}
        </div>
        
        {/* Floating badge */}
        <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
          <IconComponent className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Content Section */}
      <div className={`space-y-4 ${!isEven ? 'lg:order-1 lg:text-right' : ''}`}>
        <div className={`inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium ${!isEven ? 'lg:ml-auto' : ''}`}>
          <IconComponent className="w-4 h-4" />
          Projekt {index + 1}
        </div>
        
        <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GartenProjectCard;
