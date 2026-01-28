import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, Award, CheckCircle, Users, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

interface AboutStat {
  id: string;
  stat_key: string;
  stat_value: string;
  stat_suffix: string;
  label: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
}

interface AdminAboutTabProps {
  stats: AboutStat[];
  setStats: React.Dispatch<React.SetStateAction<AboutStat[]>>;
  content: SiteContent[];
  setContent: React.Dispatch<React.SetStateAction<SiteContent[]>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  CheckCircle,
  Users,
  ThumbsUp,
};

const AdminAboutTab = ({
  stats,
  setStats,
  content,
  setContent,
  saving,
  setSaving,
  onRefresh,
}: AdminAboutTabProps) => {
  const [uploading, setUploading] = useState(false);

  const aboutContent = content.filter((c) => c.section === "about");
  const aboutTitle = aboutContent.find((c) => c.key === "title");
  const aboutDescription = aboutContent.find((c) => c.key === "description");
  const aboutImage = aboutContent.find((c) => c.key === "image_url");

  const handleContentChange = (id: string, value: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleStatChange = (id: string, field: keyof AboutStat, value: string | number) => {
    setStats((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      // Save content
      for (const item of aboutContent) {
        const { error } = await supabase
          .from("site_content")
          .update({ value: item.value })
          .eq("id", item.id);
        if (error) throw error;
      }

      // Save stats
      for (const stat of stats) {
        const { error } = await supabase
          .from("about_stats")
          .update({
            stat_value: stat.stat_value,
            stat_suffix: stat.stat_suffix,
            label: stat.label,
            display_order: stat.display_order,
          })
          .eq("id", stat.id);
        if (error) throw error;
      }

      toast.success("Bereich 'Über Uns' gespeichert!");
      onRefresh();
    } catch (error) {
      console.error("Error saving about section:", error);
      toast.error("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !aboutImage) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `about/about-image-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      // Update state and database
      handleContentChange(aboutImage.id, urlData.publicUrl);
      
      await supabase
        .from("site_content")
        .update({ value: urlData.publicUrl })
        .eq("id", aboutImage.id);

      toast.success("Bild hochgeladen!");
      onRefresh();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Fehler beim Hochladen");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Section "Über Uns"</h2>
        <Button onClick={saveAll} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Speichern..." : "Alles speichern"}
        </Button>
      </div>

      {/* Content Section */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Textinhalt
        </h3>
        <div className="space-y-4">
          {aboutTitle && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Titre
              </label>
                <Input
                  value={aboutTitle.value}
                  onChange={(e) => handleContentChange(aboutTitle.id, e.target.value)}
                  placeholder="Titel des Bereichs"
              />
            </div>
          )}
          {aboutDescription && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Beschreibung
              </label>
              <Textarea
                value={aboutDescription.value}
                onChange={(e) => handleContentChange(aboutDescription.id, e.target.value)}
                rows={4}
                placeholder="Beschreibung des Unternehmens"
              />
            </div>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Bereichsbild
        </h3>
        <div className="flex items-start gap-6">
          <div className="w-48 h-32 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            {aboutImage?.value ? (
              <img
                src={aboutImage.value}
                alt="About section"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-sm">Kein Bild</span>
            )}
          </div>
          <div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
              <Button variant="outline" asChild disabled={uploading}>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? "Hochladen..." : "Bild ändern"}
                </span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground mt-2">
              Empfohlenes Format: 800x600px, JPG oder PNG
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Statistiques
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || Award;
            return (
              <div
                key={stat.id}
                className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={stat.stat_value}
                      onChange={(e) =>
                        handleStatChange(stat.id, "stat_value", e.target.value)
                      }
                      placeholder="Wert"
                      className="w-24"
                    />
                    <Input
                      value={stat.stat_suffix}
                      onChange={(e) =>
                        handleStatChange(stat.id, "stat_suffix", e.target.value)
                      }
                      placeholder="Suffix (+, %, etc.)"
                      className="w-20"
                    />
                  </div>
                  <Input
                    value={stat.label}
                    onChange={(e) =>
                      handleStatChange(stat.id, "label", e.target.value)
                    }
                    placeholder="Label (ex: Jahre Erfahrung)"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAboutTab;
