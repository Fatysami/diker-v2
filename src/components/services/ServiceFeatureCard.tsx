import { LucideIcon, ImageIcon } from "lucide-react";
import ClickableImage from "@/components/ui/ClickableImage";

interface ServiceFeatureCardProps {
  title: string;
  paragraphs: string[];
  icon: LucideIcon;
  imageUrl?: string | null;
  imageUrl2?: string | null;
  imageUrl3?: string | null;
  imageUrl4?: string | null;
  index: number;
}

const ImagePlaceholder = ({ icon: Icon, size = "large" }: { icon: LucideIcon; size?: "large" | "small" }) => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
    <Icon className={size === "large" ? "w-16 h-16 text-primary/20" : "w-8 h-8 text-muted-foreground/30"} />
  </div>
);

const ServiceFeatureCard = ({ 
  title, 
  paragraphs, 
  icon: IconComponent, 
  imageUrl,
  imageUrl2,
  imageUrl3,
  imageUrl4,
  index 
}: ServiceFeatureCardProps) => {
  const isEven = index % 2 === 0;

  const ImagesSection = () => (
    <div className="flex h-full">
      {/* Large main image */}
      <div className="w-2/3 relative overflow-hidden bg-muted">
        {imageUrl ? (
          <ClickableImage
            src={imageUrl}
            alt={`${title} - Hauptbild`}
            className="w-full h-full object-cover"
            containerClassName="w-full h-full"
          />
        ) : (
          <ImagePlaceholder icon={IconComponent} size="large" />
        )}
      </div>

      {/* 3 small images stacked vertically */}
      <div className="w-1/3 flex flex-col">
        <div className="flex-1 relative overflow-hidden bg-muted border-l border-b border-border/30">
          {imageUrl2 ? (
            <ClickableImage
              src={imageUrl2}
              alt={`${title} - Bild 2`}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          ) : (
            <ImagePlaceholder icon={ImageIcon} size="small" />
          )}
        </div>
        <div className="flex-1 relative overflow-hidden bg-muted border-l border-b border-border/30">
          {imageUrl3 ? (
            <ClickableImage
              src={imageUrl3}
              alt={`${title} - Bild 3`}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          ) : (
            <ImagePlaceholder icon={ImageIcon} size="small" />
          )}
        </div>
        <div className="flex-1 relative overflow-hidden bg-muted border-l border-border/30">
          {imageUrl4 ? (
            <ClickableImage
              src={imageUrl4}
              alt={`${title} - Bild 4`}
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
            />
          ) : (
            <ImagePlaceholder icon={ImageIcon} size="small" />
          )}
        </div>
      </div>
    </div>
  );

  const ContentSection = () => (
    <div className="flex flex-col justify-center p-6 lg:p-10 h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            Leistung {index + 1}
          </span>
          <h3 className="text-xl lg:text-2xl font-bold text-foreground mt-1 leading-tight">
            {title}
          </h3>
        </div>
      </div>
      <div className="space-y-3">
        {paragraphs.map((paragraph, pIndex) => (
          <p key={pIndex} className="text-muted-foreground leading-relaxed text-sm">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px]">
        {isEven ? (
          <>
            <div className="order-1 lg:order-1 h-64 lg:h-auto">
              <ImagesSection />
            </div>
            <div className="order-2 lg:order-2">
              <ContentSection />
            </div>
          </>
        ) : (
          <>
            <div className="order-1 lg:order-2 h-64 lg:h-auto">
              <ImagesSection />
            </div>
            <div className="order-2 lg:order-1">
              <ContentSection />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceFeatureCard;
