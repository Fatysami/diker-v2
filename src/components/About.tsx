import { Award, Clock, Users, Wrench, CheckCircle, ThumbsUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useAboutStats } from "@/hooks/useAboutStats";

// Icon mapping for dynamic icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Clock,
  Users,
  Wrench,
  CheckCircle,
  ThumbsUp,
};

// Fallback stats if database is empty
const fallbackStats = [
  { id: "1", stat_value: "20", stat_suffix: "+", label: "Jahre Erfahrung", icon: "Clock", display_order: 1 },
  { id: "2", stat_value: "500", stat_suffix: "+", label: "Zufriedene Kunden", icon: "Users", display_order: 2 },
  { id: "3", stat_value: "100", stat_suffix: "%", label: "Qualitätsgarantie", icon: "Award", display_order: 3 },
  { id: "4", stat_value: "50", stat_suffix: "+", label: "Moderne Maschinen", icon: "Wrench", display_order: 4 },
];

// Animated counter component
const Counter = ({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(value * easeOut));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { data: dbStats, isLoading } = useAboutStats();

  // Use database stats or fallback
  const stats = dbStats && dbStats.length > 0 ? dbStats : fallbackStats;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="ueber-uns" className="section-padding bg-secondary text-secondary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Über Uns
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ihr erster Ansprechpartner
              <br />
              <span className="text-gradient">in Solingen</span>
            </h2>
            <div className="space-y-4 text-secondary-foreground/80">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Wir als Firma Diker haben Ihre Bauvorhaben im Griff. Ob Parkplatz, 
                Straße, Fahrradweg oder Baugründung – wir arbeiten mit Herz und Können. 
                Vertrauen Sie uns Ihre Herausforderungen an.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Wir bieten ein modernes Equipment, ein kompetentes Team und vor allem 
                Leidenschaft zur Sache. Wo immer es gilt, erstklassige Arbeit rund um 
                Solingen und Umgebung abzuliefern, sind wir Ihr Partner.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Mit Hilfe von zertifizierten Bausachverständigen, Architekten, Ingenieuren 
                oder Spezialisten können wir Ihnen eine umfassende Beratung bei Neubau 
                oder Sanierung anbieten.
              </motion.p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat) => {
              const IconComponent = iconMap[stat.icon] || Award;
              const numericValue = parseInt(stat.stat_value) || 0;
              
              return (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-secondary-foreground/10 hover:border-primary/50 transition-colors cursor-default"
                >
                  <motion.div 
                    className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-1">
                    <Counter value={numericValue} suffix={stat.stat_suffix} />
                  </div>
                  <div className="text-secondary-foreground/60 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
