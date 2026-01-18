import { Award, Clock, Users, Wrench } from "lucide-react";

const stats = [
  {
    icon: Clock,
    value: "20+",
    label: "Jahre Erfahrung",
  },
  {
    icon: Users,
    value: "500+",
    label: "Zufriedene Kunden",
  },
  {
    icon: Award,
    value: "100%",
    label: "Qualitätsgarantie",
  },
  {
    icon: Wrench,
    value: "50+",
    label: "Moderne Maschinen",
  },
];

const About = () => {
  return (
    <section id="ueber-uns" className="section-padding bg-secondary text-secondary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Über Uns
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ihr erster Ansprechpartner
              <br />
              <span className="text-gradient">in Solingen</span>
            </h2>
            <div className="space-y-4 text-secondary-foreground/80">
              <p>
                Wir als Firma Diker haben Ihre Bauvorhaben im Griff. Ob Parkplatz, 
                Straße, Fahrradweg oder Baugründung – wir arbeiten mit Herz und Können. 
                Vertrauen Sie uns Ihre Herausforderungen an.
              </p>
              <p>
                Wir bieten ein modernes Equipment, ein kompetentes Team und vor allem 
                Leidenschaft zur Sache. Wo immer es gilt, erstklassige Arbeit rund um 
                Solingen und Umgebung abzuliefern, sind wir Ihr Partner.
              </p>
              <p>
                Mit Hilfe von zertifizierten Bausachverständigen, Architekten, Ingenieuren 
                oder Spezialisten können wir Ihnen eine umfassende Beratung bei Neubau 
                oder Sanierung anbieten.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-secondary-foreground/10 hover:border-primary/50 transition-colors"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-secondary-foreground/60 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
