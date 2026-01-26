import { useTestimonials } from "@/hooks/useTestimonials";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials(true);

  if (isLoading || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Erfahren Sie, warum unsere Kunden uns vertrauen und uns weiterempfehlen
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-6">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 mt-4 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Client info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {testimonial.image_url ? (
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.client_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {testimonial.client_name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.client_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
