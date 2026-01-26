import { useState, useMemo } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useContactInfo } from "@/hooks/useContactInfo";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-50px" });
  
  const { data: contactData } = useContactInfo();

  // Build contact info array from dynamic data
  const contactInfo = useMemo(() => {
    if (!contactData) return [];
    
    return [
      {
        icon: MapPin,
        title: "Adresse",
        content: contactData.address,
      },
      {
        icon: Phone,
        title: "Telefon",
        content: contactData.phone,
        href: contactData.phoneHref,
      },
      {
        icon: Mail,
        title: "E-Mail",
        content: contactData.email,
        href: contactData.emailHref,
      },
      {
        icon: Clock,
        title: "Öffnungszeiten",
        content: contactData.hours,
      },
    ];
  }, [contactData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Pflichtfelder fehlen",
        description: "Bitte füllen Sie Name, E-Mail und Nachricht aus.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-message", {
        body: formData,
      });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      toast({
        title: "Nachricht gesendet!",
        description: "Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen.",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending contact message:", error);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Lassen Sie uns sprechen
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Kontaktieren Sie uns für eine kostenlose Beratung. 
            Wir freuen uns auf Ihr Projekt!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-card rounded-2xl p-8 border border-border"
          >
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              Anfrage senden
            </h3>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </motion.div>
                <h4 className="text-xl font-semibold text-card-foreground mb-2">
                  Nachricht gesendet!
                </h4>
                <p className="text-muted-foreground">
                  Wir melden uns schnellstmöglich bei Ihnen.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Name *
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr vollständiger Name" 
                      required
                      className="transition-all duration-300 focus:scale-[1.01]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      E-Mail *
                    </label>
                    <Input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de" 
                      required
                      className="transition-all duration-300 focus:scale-[1.01]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Telefon
                    </label>
                    <Input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ihre Telefonnummer" 
                      className="transition-all duration-300 focus:scale-[1.01]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">
                      Betreff
                    </label>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="z.B. Straßenbau Projekt" 
                      className="transition-all duration-300 focus:scale-[1.01]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Nachricht *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                    rows={5}
                    required
                    className="transition-all duration-300 focus:scale-[1.01]"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Nachricht senden
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: -5 }}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors cursor-default"
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-1">
                      {item.title}
                    </h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-muted rounded-xl h-48 flex items-center justify-center border border-border overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.844899285567!2d7.0823!3d51.1657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d683b3e2d9e7%3A0x4e2c1c9c9c9c9c9c!2sWittkuller%20Str.%20161%2C%2042719%20Solingen!5e0!3m2!1sde!2sde!4v1699999999999!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Standort Diker Straßenbau"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
