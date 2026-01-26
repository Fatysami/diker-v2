import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Trash2, Star, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  client_name: string;
  company: string | null;
  role: string | null;
  content: string;
  rating: number;
  image_url: string | null;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
}

interface AdminTestimonialsTabProps {
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
}

const AdminTestimonialsTab = ({
  testimonials,
  setTestimonials,
  saving,
  setSaving,
  onRefresh,
}: AdminTestimonialsTabProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (id: string, field: keyof Testimonial, value: string | number | boolean) => {
    setTestimonials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const saveTestimonial = async (testimonial: Testimonial) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({
          client_name: testimonial.client_name,
          company: testimonial.company,
          role: testimonial.role,
          content: testimonial.content,
          rating: testimonial.rating,
          is_featured: testimonial.is_featured,
          is_active: testimonial.is_active,
          display_order: testimonial.display_order,
        })
        .eq("id", testimonial.id);

      if (error) throw error;

      toast.success("Témoignage sauvegardé !");
      setEditingId(null);
      onRefresh();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const addTestimonial = async () => {
    setSaving(true);
    try {
      const newOrder = testimonials.length > 0 
        ? Math.max(...testimonials.map((t) => t.display_order)) + 1 
        : 1;

      const { data, error } = await supabase
        .from("testimonials")
        .insert({
          client_name: "Nouveau Client",
          content: "Entrez le témoignage ici...",
          rating: 5,
          display_order: newOrder,
          is_featured: false,
          is_active: true,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success("Nouveau témoignage ajouté !");
      onRefresh();
      if (data) setEditingId(data.id);
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Erreur lors de l'ajout");
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Supprimer ce témoignage ?")) return;

    setSaving(true);
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);

      if (error) throw error;

      toast.success("Témoignage supprimé !");
      onRefresh();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Erreur lors de la suppression");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Témoignages Clients</h2>
        <Button onClick={addTestimonial} disabled={saving}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un témoignage
        </Button>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-start gap-4">
              <GripVertical className="w-5 h-5 text-muted-foreground mt-2 cursor-grab" />

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Nom du client
                    </label>
                    <Input
                      value={testimonial.client_name}
                      onChange={(e) =>
                        handleChange(testimonial.id, "client_name", e.target.value)
                      }
                      placeholder="Nom du client"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Rôle / Titre
                    </label>
                    <Input
                      value={testimonial.role || ""}
                      onChange={(e) =>
                        handleChange(testimonial.id, "role", e.target.value)
                      }
                      placeholder="Ex: Geschäftsführer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">
                      Entreprise
                    </label>
                    <Input
                      value={testimonial.company || ""}
                      onChange={(e) =>
                        handleChange(testimonial.id, "company", e.target.value)
                      }
                      placeholder="Nom de l'entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Témoignage
                  </label>
                  <Textarea
                    value={testimonial.content}
                    onChange={(e) =>
                      handleChange(testimonial.id, "content", e.target.value)
                    }
                    rows={3}
                    placeholder="Le contenu du témoignage..."
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Note:
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleChange(testimonial.id, "rating", star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 transition-colors ${
                              star <= testimonial.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={testimonial.is_featured}
                      onCheckedChange={(checked) =>
                        handleChange(testimonial.id, "is_featured", checked)
                      }
                    />
                    <label className="text-sm text-muted-foreground">Mis en avant</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={testimonial.is_active}
                      onCheckedChange={(checked) =>
                        handleChange(testimonial.id, "is_active", checked)
                      }
                    />
                    <label className="text-sm text-muted-foreground">Actif</label>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Ordre:</label>
                    <Input
                      type="number"
                      value={testimonial.display_order}
                      onChange={(e) =>
                        handleChange(testimonial.id, "display_order", parseInt(e.target.value) || 0)
                      }
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  onClick={() => saveTestimonial(testimonial)}
                  disabled={saving}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteTestimonial(testimonial.id)}
                  disabled={saving}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucun témoignage. Cliquez sur "Ajouter un témoignage" pour commencer.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonialsTab;
