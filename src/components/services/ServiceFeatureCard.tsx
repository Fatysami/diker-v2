import { LucideIcon, ImageIcon } from "lucide-react";

interface ServiceFeatureCardProps {
  title: string;
  paragraphs: string[];
  icon: LucideIcon;
  imageUrl?: string;
  index: number;
}

const ImagePlaceholder = ({ icon: Icon }: { icon: LucideIcon }) => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
    <Icon className="w-16 h-16 text-primary/20" />
  </div>
);

const ServiceFeatureCard = ({ 
  title, 
  paragraphs, 
  icon: IconComponent, 
  imageUrl,
  index 
}: ServiceFeatureCardProps) => {
  const isEven = index % 2 === 0;

  const ImageSection = () => (
    <div className="h-full w-full relative overflow-hidden bg-muted">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <ImagePlaceholder icon={IconComponent} />
      )}
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
              <ImageSection />
            </div>
            <div className="order-2 lg:order-2">
              <ContentSection />
            </div>
          </>
        ) : (
          <>
            <div className="order-1 lg:order-2 h-64 lg:h-auto">
              <ImageSection />
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
