import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "Wittkuller Str. 161, 42719 Solingen",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "0212 22 66 39 31",
    href: "tel:+4921222663931",
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: "info@dikerstrassenbau.de",
    href: "mailto:info@dikerstrassenbau.de",
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    content: "Mo–Fr: 7:00–17:00 Uhr",
  },
];

const Contact = () => {
  return (
    <section id="kontakt" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              Anfrage senden
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Name *
                  </label>
                  <Input placeholder="Ihr vollständiger Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    E-Mail *
                  </label>
                  <Input type="email" placeholder="ihre@email.de" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Telefon
                  </label>
                  <Input type="tel" placeholder="Ihre Telefonnummer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Betreff
                  </label>
                  <Input placeholder="z.B. Straßenbau Projekt" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Nachricht *
                </label>
                <Textarea
                  placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                  rows={5}
                />
              </div>
              <Button size="lg" className="w-full md:w-auto group">
                Nachricht senden
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
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
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="bg-muted rounded-xl h-48 flex items-center justify-center border border-border overflow-hidden">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
