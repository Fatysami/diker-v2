import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: string;
}

interface AdminHomepageTabProps {
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHomepageTab = ({ saving, setSaving }: AdminHomepageTabProps) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .in("section", ["hero", "about", "services"])
        .order("section", { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error("Error fetching homepage content:", error);
      toast.error("Fehler beim Laden der Inhalte");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id: string, value: string) => {
    setContent((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const item of content) {
        const { error } = await supabase
          .from("site_content")
          .update({ value: item.value, updated_at: new Date().toISOString() })
          .eq("id", item.id);
        if (error) throw error;
      }
      
      // Invalidate queries to refresh the frontend
      queryClient.invalidateQueries({ queryKey: ["homepage-content"] });
      queryClient.invalidateQueries({ queryKey: ["homepage-content-all"] });
      
      toast.success("Alle Inhalte wurden gespeichert!");
    } catch (error) {
      console.error("Error saving homepage content:", error);
      toast.error("Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  };

  const getItemByKey = (section: string, key: string) =>
    content.find((item) => item.section === section && item.key === key);

  const renderInput = (
    section: string,
    key: string,
    label: string,
    isTextarea = false
  ) => {
    const item = getItemByKey(section, key);
    if (!item) return null;

    return (
      <div key={item.id}>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          {label}
        </label>
        {isTextarea ? (
          <Textarea
            value={item.value}
            onChange={(e) => handleChange(item.id, e.target.value)}
            rows={3}
            className="resize-none"
          />
        ) : (
          <Input
            value={item.value}
            onChange={(e) => handleChange(item.id, e.target.value)}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Startseite bearbeiten</h2>
        <Button onClick={saveAll} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Speichern..." : "Alles speichern"}
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Hero-Bereich (Banner)
        </h3>
        <div className="space-y-4">
          {renderInput("hero", "badge", "Badge-Text (oben)")}
          {renderInput("hero", "headline", "Hauptüberschrift")}
          {renderInput("hero", "subheadline", "Untertitel", true)}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderInput("hero", "highlight_1", "Highlight 1")}
            {renderInput("hero", "highlight_2", "Highlight 2")}
            {renderInput("hero", "highlight_3", "Highlight 3")}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Über Uns - Bereich
        </h3>
        <div className="space-y-4">
          {renderInput("about", "badge", "Badge-Text (oben)")}
          {renderInput("about", "headline", "Überschrift")}
          {renderInput("about", "paragraph_1", "Absatz 1", true)}
          {renderInput("about", "paragraph_2", "Absatz 2", true)}
          {renderInput("about", "paragraph_3", "Absatz 3", true)}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Hinweis: Die Statistiken (Jahre Erfahrung, Projekte, etc.) können im Tab "Über Uns" bearbeitet werden.
        </p>
      </div>

      {/* Services Section */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Leistungen - Bereich
        </h3>
        <div className="space-y-4">
          {renderInput("services", "badge", "Badge-Text (oben)")}
          {renderInput("services", "headline", "Überschrift")}
          {renderInput("services", "description", "Beschreibung", true)}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Hinweis: Die einzelnen Leistungskarten können im Tab "Services" bearbeitet werden.
        </p>
      </div>
    </div>
  );
};

export default AdminHomepageTab;
