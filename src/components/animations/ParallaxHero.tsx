import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxHeroProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
  overlayClassName?: string;
  speed?: number;
}

const ParallaxHero = ({
  children,
  backgroundImage,
  className = "",
  overlayClassName = "bg-gradient-to-b from-black/70 via-black/50 to-black/70",
  speed = 0.5,
}: ParallaxHeroProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background */}
      {backgroundImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-20 -bottom-20"
        >
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>
      )}

      {/* Overlay */}
      <motion.div
        style={{ opacity }}
        className={`absolute inset-0 ${overlayClassName}`}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxHero;
