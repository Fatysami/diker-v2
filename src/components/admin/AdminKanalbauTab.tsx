import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Save, Plus, Trash2, Loader2, Image as ImageIcon, Pipette, Info } from "lucide-react";
import { toast } from "sonner";
import ImageUploadWithFocalPoint from "./ImageUploadWithFocalPoint";
import { FocalPoint } from "./FocalPointSelector";

interface KanalbauSection {
  id: string;
  title: string;
  paragraphs: string[];
  icon: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  image_focal_point: string | null;
  image_focal_point_2: string | null;
  image_focal_point_3: string | null;
  image_focal_point_4: string | null;
  display_order: number;
  is_active: boolean;
}

interface AdminKanalbauTabProps {
  sections: KanalbauSection[];
  setSections: React.Dispatch<React.SetStateAction<KanalbauSection[]>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
}

const iconOptions = [
  { value: "AlertTriangle", label: "Warnung" },
  { value: "Shield", label: "Schutz" },
  { value: "Droplets", label: "Wasser" },
  { value: "Flame", label: "Gas" },
  { value: "Settings", label: "Einstellungen" },
  { value: "Scale", label: "Gesetz" },
  { value: "Calculator", label: "Kosten" },
  { value: "Wrench", label: "Werkzeug" },
];

const AdminKanalbauTab = ({ 
  sections, 
  setSections, 
  saving, 
  setSaving,
  onRefresh 
}: AdminKanalbauTabProps) => {
  const [newSection, setNewSection] = useState({
    title: "",
    paragraphs: "",
    icon: "Wrench",
  });
  const [addingNew, setAddingNew] = useState(false);

  const handleSectionChange = (id: string, field: keyof KanalbauSection, value: string | boolean | number | string[]) => {
    setSections(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const saveSections = async () => {
    setSaving(true);
    
    for (const section of sections) {
      const { error } = await supabase
        .from('kanalbau_sections')
        .update({
          title: section.title,
          paragraphs: section.paragraphs,
          icon: section.icon,
          display_order: section.display_order,
          is_active: section.is_active,
        })
        .eq('id', section.id);
      
      if (error) {
        toast.error("Fehler beim Speichern");
        setSaving(false);
        return;
      }
    }

    toast.success("Abschnitte gespeichert!");
    setSaving(false);
  };

  const addSection = async () => {
    if (!newSection.title) {
      toast.error("Titel ist erforderlich");
      return;
    }

    setAddingNew(true);

    const paragraphsArray = newSection.paragraphs
      .split('\n\n')
      .filter(p => p.trim());

    const { data, error } = await supabase
      .from('kanalbau_sections')
      .insert({
        title: newSection.title,
        paragraphs: paragraphsArray,
        icon: newSection.icon,
        display_order: sections.length + 1,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      toast.error("Fehler beim Erstellen");
    } else if (data) {
      setSections(prev => [...prev, data]);
      setNewSection({ title: "", paragraphs: "", icon: "Wrench" });
      toast.success("Abschnitt hinzugefügt!");
    }

    setAddingNew(false);
  };

  const deleteSection = async (id: string) => {
    if (!confirm("Diesen Abschnitt löschen?")) return;

    const { error } = await supabase
      .from('kanalbau_sections')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Fehler beim Löschen");
    } else {
      setSections(prev => prev.filter(s => s.id !== id));
      toast.success("Abschnitt gelöscht!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Pipette className="w-6 h-6 text-primary" />
          Kanalbau & Dichtheitsprüfung
        </h2>
        <Button onClick={saveSections} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Speichern..." : "Speichern"}
        </Button>
      </div>

      {/* Format hint */}
      <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          <strong>Tipp:</strong> Querformat-Bilder (16:9 oder 4:3) funktionieren am besten. 
          Nutzen Sie den Fokus-Selector, um den sichtbaren Bildbereich anzupassen.
        </p>
      </div>

      {/* Add new section */}
      <div className="bg-card rounded-xl p-6 border border-border border-dashed">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Neuer Abschnitt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Titel *
            </label>
            <Input
              value={newSection.title}
              onChange={(e) => setNewSection(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Abschnittsname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Icon
            </label>
            <Select
              value={newSection.icon}
              onValueChange={(value) => setNewSection(prev => ({ ...prev, icon: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Absätze (durch Leerzeilen getrennt) *
            </label>
            <Textarea
              value={newSection.paragraphs}
              onChange={(e) => setNewSection(prev => ({ ...prev, paragraphs: e.target.value }))}
              placeholder="Erster Absatz...\n\nZweiter Absatz...\n\nDritter Absatz..."
              rows={6}
            />
          </div>
          <div className="md:col-span-2">
            <Button onClick={addSection} disabled={addingNew || !newSection.title}>
              {addingNew ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Wird hinzugefügt...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Abschnitt hinzufügen (Bilder danach)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Existing sections */}
      <div className="grid gap-6">
        {sections.length === 0 ? (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Keine Abschnitte vorhanden</p>
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.id} className="bg-card rounded-xl p-6 border border-border">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Images Grid - 4 slots with focal point */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Bilder (1 groß + 3 klein)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {/* Main large image */}
                    <div className="col-span-2 row-span-3">
                      <ImageUploadWithFocalPoint
                        id={section.id}
                        imageUrl={section.image_url}
                        focalPoint={section.image_focal_point}
                        onImageChange={(url) => handleSectionChange(section.id, "image_url", url)}
                        onFocalPointChange={(fp) => handleSectionChange(section.id, "image_focal_point", fp)}
                        label="Hauptbild"
                        isLarge
                        storagePath="kanalbau"
                        tableName="kanalbau_sections"
                        imageField="image_url"
                        focalPointField="image_focal_point"
                      />
                    </div>
                    {/* Small image 1 */}
                    <ImageUploadWithFocalPoint
                      id={section.id}
                      imageUrl={section.image_url_2}
                      focalPoint={section.image_focal_point_2}
                      onImageChange={(url) => handleSectionChange(section.id, "image_url_2", url)}
                      onFocalPointChange={(fp) => handleSectionChange(section.id, "image_focal_point_2", fp)}
                      label="Bild 2"
                      storagePath="kanalbau"
                      tableName="kanalbau_sections"
                      imageField="image_url_2"
                      focalPointField="image_focal_point_2"
                      showHint={false}
                    />
                    {/* Small image 2 */}
                    <ImageUploadWithFocalPoint
                      id={section.id}
                      imageUrl={section.image_url_3}
                      focalPoint={section.image_focal_point_3}
                      onImageChange={(url) => handleSectionChange(section.id, "image_url_3", url)}
                      onFocalPointChange={(fp) => handleSectionChange(section.id, "image_focal_point_3", fp)}
                      label="Bild 3"
                      storagePath="kanalbau"
                      tableName="kanalbau_sections"
                      imageField="image_url_3"
                      focalPointField="image_focal_point_3"
                      showHint={false}
                    />
                    {/* Small image 3 */}
                    <ImageUploadWithFocalPoint
                      id={section.id}
                      imageUrl={section.image_url_4}
                      focalPoint={section.image_focal_point_4}
                      onImageChange={(url) => handleSectionChange(section.id, "image_url_4", url)}
                      onFocalPointChange={(fp) => handleSectionChange(section.id, "image_focal_point_4", fp)}
                      label="Bild 4"
                      storagePath="kanalbau"
                      tableName="kanalbau_sections"
                      imageField="image_url_4"
                      focalPointField="image_focal_point_4"
                      showHint={false}
                    />
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Titel
                      </label>
                      <Input
                        value={section.title}
                        onChange={(e) => handleSectionChange(section.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Icon
                      </label>
                      <Select
                        value={section.icon}
                        onValueChange={(value) => handleSectionChange(section.id, "icon", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Absätze (durch Leerzeilen getrennt)
                    </label>
                    <Textarea
                      value={section.paragraphs.join('\n\n')}
                      onChange={(e) => handleSectionChange(
                        section.id, 
                        "paragraphs", 
                        e.target.value.split('\n\n').filter(p => p.trim())
                      )}
                      rows={6}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`active-kanalbau-${section.id}`}
                          checked={section.is_active}
                          onChange={(e) => handleSectionChange(section.id, "is_active", e.target.checked)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`active-kanalbau-${section.id}`} className="text-sm text-muted-foreground">
                          Aktiv
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Reihenfolge:</label>
                        <Input
                          type="number"
                          value={section.display_order}
                          onChange={(e) => handleSectionChange(section.id, "display_order", parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteSection(section.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Löschen
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminKanalbauTab;
