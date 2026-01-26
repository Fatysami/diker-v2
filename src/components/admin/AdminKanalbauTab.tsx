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
import { Save, Plus, Trash2, Upload, Loader2, Image as ImageIcon, Pipette } from "lucide-react";
import { toast } from "sonner";

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

type ImageField = 'image_url' | 'image_url_2' | 'image_url_3' | 'image_url_4';

const AdminKanalbauTab = ({ 
  sections, 
  setSections, 
  saving, 
  setSaving,
  onRefresh 
}: AdminKanalbauTabProps) => {
  const [uploading, setUploading] = useState<string | null>(null);
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

  const uploadImage = async (file: File, sectionId?: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `kanalbau/${sectionId || crypto.randomUUID()}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      toast.error("Fehler beim Hochladen des Bildes");
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleImageUpload = async (sectionId: string, file: File, imageField: ImageField) => {
    setUploading(`${sectionId}-${imageField}`);
    
    const publicUrl = await uploadImage(file, sectionId);
    
    if (publicUrl) {
      const { error } = await supabase
        .from('kanalbau_sections')
        .update({ [imageField]: publicUrl })
        .eq('id', sectionId);

      if (error) {
        toast.error("Fehler beim Aktualisieren");
      } else {
        setSections(prev =>
          prev.map(item => item.id === sectionId ? { ...item, [imageField]: publicUrl } : item)
        );
        toast.success("Bild aktualisiert!");
      }
    }
    
    setUploading(null);
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

  const ImageUploadSlot = ({ 
    sectionId, 
    imageUrl, 
    imageField, 
    label,
    isLarge = false 
  }: { 
    sectionId: string; 
    imageUrl: string | null; 
    imageField: ImageField;
    label: string;
    isLarge?: boolean;
  }) => (
    <div className={`relative ${isLarge ? 'aspect-[4/3]' : 'aspect-square'}`}>
      <div className="w-full h-full rounded-lg overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className={`${isLarge ? 'w-12 h-12' : 'w-6 h-6'} text-muted-foreground/30`} />
          </div>
        )}
      </div>
      <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/0 hover:bg-black/40 transition-colors group">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(sectionId, file, imageField);
          }}
        />
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2">
          {uploading === `${sectionId}-${imageField}` ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {imageUrl ? "Ändern" : "Hochladen"}
        </div>
      </label>
      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
        {label}
      </span>
    </div>
  );

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
                {/* Images Grid - 4 slots */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Bilder (1 groß + 3 klein)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Main large image */}
                    <div className="col-span-2 row-span-3">
                      <ImageUploadSlot 
                        sectionId={section.id}
                        imageUrl={section.image_url}
                        imageField="image_url"
                        label="Hauptbild"
                        isLarge
                      />
                    </div>
                    {/* Small image 1 */}
                    <ImageUploadSlot 
                      sectionId={section.id}
                      imageUrl={section.image_url_2}
                      imageField="image_url_2"
                      label="Bild 2"
                    />
                    {/* Small image 2 */}
                    <ImageUploadSlot 
                      sectionId={section.id}
                      imageUrl={section.image_url_3}
                      imageField="image_url_3"
                      label="Bild 3"
                    />
                    {/* Small image 3 */}
                    <ImageUploadSlot 
                      sectionId={section.id}
                      imageUrl={section.image_url_4}
                      imageField="image_url_4"
                      label="Bild 4"
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
