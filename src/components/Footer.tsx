import { Phone, Mail, MapPin } from "lucide-react";
import { useContactInfo } from "@/hooks/useContactInfo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: contactData } = useContactInfo();

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#leistungen", label: "Leistungen" },
    { href: "#ueber-uns", label: "Über Uns" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  const services = [
    "Straßenbau",
    "Straßentiefbau",
    "Kanalbau",
    "Garten- & Landschaftsbau",
  ];

  // Parse address into lines
  const addressLines = contactData?.address?.split(",").map(s => s.trim()) || [
    "Wittkuller Str. 161",
    "42719 Solingen"
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="text-secondary-foreground font-bold text-lg leading-tight">
                  Diker
                </span>
                <span className="text-secondary-foreground/60 text-xs leading-tight">
                  Bau
                </span>
              </div>
            </div>
            <p className="text-secondary-foreground/70 text-sm mb-6">
              Ihr zuverlässiger Partner für Straßenbau, Tiefbau und 
              Landschaftsbau in Solingen und Umgebung.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">
              Leistungen
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#leistungen"
                    className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-secondary-foreground mb-4">
              Kontakt
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-secondary-foreground/70 text-sm">
                  {addressLines[0]}
                  {addressLines.length > 1 && (
                    <>
                      <br />
                      {addressLines.slice(1).join(", ")}
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href={contactData?.phoneHref || "tel:+4921222663931"}
                  className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  {contactData?.phone || "0212 22 66 39 31"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href={contactData?.emailHref || "mailto:info@diker-bau.de"}
                  className="text-secondary-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  {contactData?.email || "info@diker-bau.de"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {currentYear} Diker Bau. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
              >
                Impressum
              </a>
              <a
                href="#"
                className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
              >
                Datenschutz
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
