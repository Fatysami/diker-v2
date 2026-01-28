import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut, Save, ArrowLeft, 
  FileText, Wrench, Image, Phone, Loader2, Leaf, Pipette, HardHat, Construction, MessageSquare, Info, Settings
} from "lucide-react";
import { toast } from "sonner";
import AdminProjectsTab from "@/components/admin/AdminProjectsTab";
import AdminGartenProjectsTab from "@/components/admin/AdminGartenProjectsTab";
import AdminKanalbauTab from "@/components/admin/AdminKanalbauTab";
import AdminTiefbauTab from "@/components/admin/AdminTiefbauTab";
import AdminStrassenbauTab from "@/components/admin/AdminStrassenbauTab";
import AdminServicesTab from "@/components/admin/AdminServicesTab";
import AdminContactTab from "@/components/admin/AdminContactTab";
import AdminTestimonialsTab from "@/components/admin/AdminTestimonialsTab";
import AdminAboutTab from "@/components/admin/AdminAboutTab";
import AdminGartenSettingsTab from "@/components/admin/AdminGartenSettingsTab";

interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image_url: string | null;
  features: string[];
  link: string | null;
  display_order: number;
  is_active: boolean;
}

interface ContactInfo {
  id: string;
  type: string;
  value: string;
  icon: string | null;
  display_order: number;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

interface GartenProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  icon: string;
  display_order: number;
  is_active: boolean;
}

interface KanalbauSection {
  id: string;
  title: string;
  paragraphs: string[];
  icon: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  display_order: number;
  is_active: boolean;
}

interface TiefbauSection {
  id: string;
  title: string;
  paragraphs: string[];
  icon: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  display_order: number;
  is_active: boolean;
}

interface StrassenbauSection {
  id: string;
  title: string;
  paragraphs: string[];
  icon: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  display_order: number;
  is_active: boolean;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [content, setContent] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [gartenProjects, setGartenProjects] = useState<GartenProject[]>([]);
  const [kanalbauSections, setKanalbauSections] = useState<KanalbauSection[]>([]);
  const [tiefbauSections, setTiefbauSections] = useState<TiefbauSection[]>([]);
  const [strassenbauSections, setStrassenbauSections] = useState<StrassenbauSection[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [aboutStats, setAboutStats] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/admin/login");
      } else if (!isAdmin) {
        toast.error("Zugriff verweigert. Sie sind kein Administrator.");
        navigate("/");
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    
    const [contentRes, servicesRes, contactRes, projectsRes, gartenRes, kanalbauRes, tiefbauRes, strassenbauRes, testimonialsRes, aboutStatsRes] = await Promise.all([
      supabase.from("site_content").select("*"),
      supabase.from("services").select("*").order("display_order"),
      supabase.from("contact_info").select("*").order("display_order"),
      supabase.from("projects").select("*").order("display_order"),
      supabase.from("garten_projects").select("*").order("display_order"),
      supabase.from("kanalbau_sections").select("*").order("display_order"),
      supabase.from("tiefbau_sections").select("*").order("display_order"),
      supabase.from("strassenbau_sections").select("*").order("display_order"),
      supabase.from("testimonials").select("*").order("display_order"),
      supabase.from("about_stats").select("*").order("display_order"),
    ]);

    if (contentRes.data) setContent(contentRes.data);
    if (servicesRes.data) setServices(servicesRes.data);
    if (contactRes.data) setContactInfo(contactRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
    if (gartenRes.data) setGartenProjects(gartenRes.data);
    if (kanalbauRes.data) setKanalbauSections(kanalbauRes.data);
    if (tiefbauRes.data) setTiefbauSections(tiefbauRes.data);
    if (strassenbauRes.data) setStrassenbauSections(strassenbauRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    if (aboutStatsRes.data) setAboutStats(aboutStatsRes.data);

    setLoading(false);
  };

  const handleContentChange = (id: string, value: string) => {
    setContent(prev => 
      prev.map(item => item.id === id ? { ...item, value } : item)
    );
  };

  const saveContent = async () => {
    setSaving(true);
    
    for (const item of content) {
      const { error } = await supabase
        .from("site_content")
        .update({ value: item.value })
        .eq("id", item.id);
      
      if (error) {
        toast.error("Fehler beim Speichern");
        setSaving(false);
        return;
      }
    }

    toast.success("Inhalt gespeichert!");
    setSaving(false);
  };

  // Service and contact handling is now done by dedicated components

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const groupedContent = content
    .filter(item => item.section !== 'contact') // Exclude contact section (handled in Contact tab)
    .reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    }, {} as Record<string, SiteContent[]>);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Webseite
            </a>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span className="font-bold text-card-foreground">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="bg-card border border-border flex-wrap">
            <TabsTrigger value="content" className="gap-2">
              <FileText className="w-4 h-4" />
              Inhalt
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Wrench className="w-4 h-4" />
              Leistungen
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Image className="w-4 h-4" />
              Projekte
            </TabsTrigger>
            <TabsTrigger value="garten" className="gap-2">
              <Leaf className="w-4 h-4" />
              Garten
            </TabsTrigger>
            <TabsTrigger value="kanalbau" className="gap-2">
              <Pipette className="w-4 h-4" />
              Kanalbau
            </TabsTrigger>
            <TabsTrigger value="tiefbau" className="gap-2">
              <HardHat className="w-4 h-4" />
              Tiefbau
            </TabsTrigger>
            <TabsTrigger value="strassenbau" className="gap-2">
              <Construction className="w-4 h-4" />
              Straßenbau
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="w-4 h-4" />
              Kontakt
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2">
              <Info className="w-4 h-4" />
              Über Uns
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Einstellungen
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Bewertungen
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Website-Inhalt</h2>
              <Button onClick={saveContent} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Speichern..." : "Speichern"}
              </Button>
            </div>

            {Object.entries(groupedContent).map(([section, items]) => (
              <div key={section} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 capitalize">
                  Bereich: {section}
                </h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id}>
                      <label className="block text-sm font-medium text-muted-foreground mb-2 capitalize">
                        {item.key.replace(/_/g, " ")}
                      </label>
                      {item.value.length > 100 ? (
                        <Textarea
                          value={item.value}
                          onChange={(e) => handleContentChange(item.id, e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Input
                          value={item.value}
                          onChange={(e) => handleContentChange(item.id, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <AdminServicesTab
              services={services}
              setServices={setServices}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <AdminContactTab
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <AdminProjectsTab
              projects={projects}
              setProjects={setProjects}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Garten Projects Tab */}
          <TabsContent value="garten">
            <AdminGartenProjectsTab
              projects={gartenProjects}
              setProjects={setGartenProjects}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Kanalbau Tab */}
          <TabsContent value="kanalbau">
            <AdminKanalbauTab
              sections={kanalbauSections}
              setSections={setKanalbauSections}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Tiefbau Tab */}
          <TabsContent value="tiefbau">
            <AdminTiefbauTab
              sections={tiefbauSections}
              setSections={setTiefbauSections}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Strassenbau Tab */}
          <TabsContent value="strassenbau">
            <AdminStrassenbauTab
              sections={strassenbauSections}
              setSections={setStrassenbauSections}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <AdminAboutTab
              stats={aboutStats}
              setStats={setAboutStats}
              content={content}
              setContent={setContent}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>

          {/* Settings Tab - Google Maps & Garten Tags */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Einstellungen</h2>
              <AdminGartenSettingsTab />
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <AdminTestimonialsTab
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              saving={saving}
              setSaving={setSaving}
              onRefresh={fetchData}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
