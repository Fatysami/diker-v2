import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useContactInfo } from "@/hooks/useContactInfo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { data: contactData } = useContactInfo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: isHomePage ? "#home" : "/", label: "Home", isAnchor: isHomePage },
    { href: isHomePage ? "#leistungen" : "/#leistungen", label: "Leistungen", isAnchor: isHomePage },
    { href: "/projekte", label: "Projekte", isAnchor: false },
    { href: isHomePage ? "#ueber-uns" : "/#ueber-uns", label: "Über Uns", isAnchor: isHomePage },
    { href: isHomePage ? "#kontakt" : "/#kontakt", label: "Kontakt", isAnchor: isHomePage },
  ];

  const handleNavClick = (href: string, isAnchor: boolean) => {
    setIsMobileMenuOpen(false);
    if (isAnchor) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary-foreground font-bold text-lg leading-tight">
                Diker
              </span>
              <span className="text-muted-foreground text-xs leading-tight">
                Straßenbau
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, true);
                  }}
                  className="text-primary-foreground/80 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-primary-foreground/80 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={contactData?.phoneHref || "tel:+4921222663931"}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">{contactData?.phone || "0212 22 66 39 31"}</span>
            </a>
            <Button variant="default" size="sm" asChild>
              <Link to="/anfrage">Jetzt Angebot anfordern</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-primary-foreground/10">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href, true);
                    }}
                    className="text-primary-foreground/80 hover:text-primary transition-colors font-medium cursor-pointer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-primary-foreground/80 hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Button variant="default" size="sm" className="w-fit" asChild>
                <Link to="/anfrage">Jetzt Angebot anfordern</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
