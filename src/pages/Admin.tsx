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
  FileText, Wrench, Image, Phone, Loader2, Leaf 
} from "lucide-react";
import { toast } from "sonner";
import AdminProjectsTab from "@/components/admin/AdminProjectsTab";
import AdminGartenProjectsTab from "@/components/admin/AdminGartenProjectsTab";

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
  icon: string;
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

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/admin/login");
      } else if (!isAdmin) {
        toast.error("Accès refusé. Vous n'êtes pas administrateur.");
        navigate("/");
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchData = async () => {
    setLoading(true);
    
    const [contentRes, servicesRes, contactRes, projectsRes, gartenRes] = await Promise.all([
      supabase.from("site_content").select("*"),
      supabase.from("services").select("*").order("display_order"),
      supabase.from("contact_info").select("*").order("display_order"),
      supabase.from("projects").select("*").order("display_order"),
      supabase.from("garten_projects").select("*").order("display_order"),
    ]);

    if (contentRes.data) setContent(contentRes.data);
    if (servicesRes.data) setServices(servicesRes.data);
    if (contactRes.data) setContactInfo(contactRes.data);
    if (projectsRes.data) setProjects(projectsRes.data);
    if (gartenRes.data) setGartenProjects(gartenRes.data);

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
        toast.error("Erreur lors de la sauvegarde");
        setSaving(false);
        return;
      }
    }

    toast.success("Contenu sauvegardé!");
    setSaving(false);
  };

  const handleServiceChange = (id: string, field: keyof Service, value: string | boolean) => {
    setServices(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const saveServices = async () => {
    setSaving(true);
    
    for (const service of services) {
      const { error } = await supabase
        .from("services")
        .update({
          title: service.title,
          description: service.description,
          icon: service.icon,
          is_active: service.is_active,
        })
        .eq("id", service.id);
      
      if (error) {
        toast.error("Erreur lors de la sauvegarde");
        setSaving(false);
        return;
      }
    }

    toast.success("Services sauvegardés!");
    setSaving(false);
  };

  const handleContactChange = (id: string, field: keyof ContactInfo, value: string) => {
    setContactInfo(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const saveContactInfo = async () => {
    setSaving(true);
    
    for (const info of contactInfo) {
      const { error } = await supabase
        .from("contact_info")
        .update({ value: info.value })
        .eq("id", info.id);
      
      if (error) {
        toast.error("Erreur lors de la sauvegarde");
        setSaving(false);
        return;
      }
    }

    toast.success("Informations de contact sauvegardées!");
    setSaving(false);
  };

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

  const groupedContent = content.reduce((acc, item) => {
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
              Retour au site
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
              Déconnexion
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
              Contenu
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Wrench className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Image className="w-4 h-4" />
              Projekte
            </TabsTrigger>
            <TabsTrigger value="garten" className="gap-2">
              <Leaf className="w-4 h-4" />
              Garten
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Phone className="w-4 h-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Contenu du site</h2>
              <Button onClick={saveContent} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>

            {Object.entries(groupedContent).map(([section, items]) => (
              <div key={section} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 capitalize">
                  Section: {section}
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
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Services</h2>
              <Button onClick={saveServices} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>

            <div className="grid gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-card rounded-xl p-6 border border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Titre
                      </label>
                      <Input
                        value={service.title}
                        onChange={(e) => handleServiceChange(service.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Icône (Lucide)
                      </label>
                      <Input
                        value={service.icon}
                        onChange={(e) => handleServiceChange(service.id, "icon", e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Description
                      </label>
                      <Textarea
                        value={service.description}
                        onChange={(e) => handleServiceChange(service.id, "description", e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`active-${service.id}`}
                        checked={service.is_active}
                        onChange={(e) => handleServiceChange(service.id, "is_active", e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor={`active-${service.id}`} className="text-sm text-muted-foreground">
                        Actif (visible sur le site)
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Informations de contact</h2>
              <Button onClick={saveContactInfo} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.id}>
                    <label className="block text-sm font-medium text-muted-foreground mb-2 capitalize">
                      {info.type}
                    </label>
                    <Input
                      value={info.value}
                      onChange={(e) => handleContactChange(info.id, "value", e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
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
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
