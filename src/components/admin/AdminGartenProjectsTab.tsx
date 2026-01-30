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
import { Save, Plus, Trash2, Loader2, Image as ImageIcon, Leaf } from "lucide-react";
import { toast } from "sonner";
import ImageUploadWithFocalPoint from "./ImageUploadWithFocalPoint";
import { FocalPoint } from "./FocalPointSelector";

interface GartenProject {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  image_focal_point: string | null;
  image_focal_point_2: string | null;
  image_focal_point_3: string | null;
  image_focal_point_4: string | null;
  icon: string;
  display_order: number;
  is_active: boolean;
}

interface AdminGartenProjectsTabProps {
  projects: GartenProject[];
  setProjects: React.Dispatch<React.SetStateAction<GartenProject[]>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
}

const iconOptions = [
  { value: "Warehouse", label: "Geräteschuppen" },
  { value: "Map", label: "Wege" },
  { value: "Grid3X3", label: "Terrasse" },
  { value: "Flower2", label: "Garten" },
  { value: "LayoutGrid", label: "Außenanlage" },
  { value: "DoorOpen", label: "Eingang" },
  { value: "TreeDeciduous", label: "Baum" },
  { value: "Fence", label: "Zaun" },
];

const AdminGartenProjectsTab = ({ 
  projects, 
  setProjects, 
  saving, 
  setSaving,
  onRefresh 
}: AdminGartenProjectsTabProps) => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    icon: "Warehouse",
  });
  const [addingNew, setAddingNew] = useState(false);

  const handleProjectChange = (id: string, field: keyof GartenProject, value: string | boolean | number) => {
    setProjects(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const saveProjects = async () => {
    setSaving(true);
    
    for (const project of projects) {
      const { error } = await supabase
        .from('garten_projects')
        .update({
          title: project.title,
          description: project.description,
          icon: project.icon,
          display_order: project.display_order,
          is_active: project.is_active,
        })
        .eq('id', project.id);
      
      if (error) {
        toast.error("Fehler beim Speichern");
        setSaving(false);
        return;
      }
    }

    toast.success("Projekte gespeichert!");
    setSaving(false);
  };

  const addProject = async () => {
    if (!newProject.title) {
      toast.error("Titel ist erforderlich");
      return;
    }

    setAddingNew(true);

    const { data, error } = await supabase
      .from('garten_projects')
      .insert({
        title: newProject.title,
        description: newProject.description,
        icon: newProject.icon,
        display_order: projects.length + 1,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      toast.error("Fehler beim Erstellen");
    } else if (data) {
      setProjects(prev => [...prev, data as GartenProject]);
      setNewProject({ title: "", description: "", icon: "Warehouse" });
      toast.success("Projekt hinzugefügt!");
    }

    setAddingNew(false);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Dieses Projekt löschen?")) return;

    const { error } = await supabase
      .from('garten_projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Fehler beim Löschen");
    } else {
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success("Projekt gelöscht!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Leaf className="w-6 h-6 text-primary" />
          Garten- & Landschaftsbau Projekte
        </h2>
        <Button onClick={saveProjects} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Speichern..." : "Speichern"}
        </Button>
      </div>

      {/* Add new project */}
      <div className="bg-card rounded-xl p-6 border border-border border-dashed">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Neues Projekt
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Titel *
            </label>
            <Input
              value={newProject.title}
              onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Projektname"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Icon
            </label>
            <Select
              value={newProject.icon}
              onValueChange={(value) => setNewProject(prev => ({ ...prev, icon: value }))}
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
              Beschreibung *
            </label>
            <Textarea
              value={newProject.description}
              onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Projektbeschreibung"
              rows={3}
            />
          </div>
          <div className="md:col-span-2">
            <Button onClick={addProject} disabled={addingNew || !newProject.title}>
              {addingNew ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Wird hinzugefügt...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Projekt hinzufügen (Bilder danach)
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Existing projects */}
      <div className="grid gap-6">
        {projects.length === 0 ? (
          <div className="bg-card rounded-xl p-12 border border-border text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Keine Projekte vorhanden</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-card rounded-xl p-6 border border-border">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Images Grid - 4 slots with focal point */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-3">
                    Bilder (1 groß + 3 klein) – Klicken Sie auf das 3x3 Raster um den Fokuspunkt zu setzen
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Main large image */}
                    <div className="col-span-2 row-span-3">
                      <ImageUploadWithFocalPoint
                        id={project.id}
                        imageUrl={project.image_url}
                        focalPoint={project.image_focal_point}
                        onImageChange={(url) => handleProjectChange(project.id, "image_url", url)}
                        onFocalPointChange={(fp) => handleProjectChange(project.id, "image_focal_point", fp)}
                        label="Hauptbild"
                        isLarge
                        storagePath="garten"
                        tableName="garten_projects"
                        imageField="image_url"
                        focalPointField="image_focal_point"
                      />
                    </div>
                    {/* Small image 1 */}
                    <ImageUploadWithFocalPoint
                      id={project.id}
                      imageUrl={project.image_url_2}
                      focalPoint={project.image_focal_point_2}
                      onImageChange={(url) => handleProjectChange(project.id, "image_url_2", url)}
                      onFocalPointChange={(fp) => handleProjectChange(project.id, "image_focal_point_2", fp)}
                      label="Bild 2"
                      storagePath="garten"
                      tableName="garten_projects"
                      imageField="image_url_2"
                      focalPointField="image_focal_point_2"
                    />
                    {/* Small image 2 */}
                    <ImageUploadWithFocalPoint
                      id={project.id}
                      imageUrl={project.image_url_3}
                      focalPoint={project.image_focal_point_3}
                      onImageChange={(url) => handleProjectChange(project.id, "image_url_3", url)}
                      onFocalPointChange={(fp) => handleProjectChange(project.id, "image_focal_point_3", fp)}
                      label="Bild 3"
                      storagePath="garten"
                      tableName="garten_projects"
                      imageField="image_url_3"
                      focalPointField="image_focal_point_3"
                    />
                    {/* Small image 3 */}
                    <ImageUploadWithFocalPoint
                      id={project.id}
                      imageUrl={project.image_url_4}
                      focalPoint={project.image_focal_point_4}
                      onImageChange={(url) => handleProjectChange(project.id, "image_url_4", url)}
                      onFocalPointChange={(fp) => handleProjectChange(project.id, "image_focal_point_4", fp)}
                      label="Bild 4"
                      storagePath="garten"
                      tableName="garten_projects"
                      imageField="image_url_4"
                      focalPointField="image_focal_point_4"
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
                        value={project.title}
                        onChange={(e) => handleProjectChange(project.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Icon
                      </label>
                      <Select
                        value={project.icon}
                        onValueChange={(value) => handleProjectChange(project.id, "icon", value)}
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
                      Beschreibung
                    </label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`active-garten-${project.id}`}
                          checked={project.is_active}
                          onChange={(e) => handleProjectChange(project.id, "is_active", e.target.checked)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`active-garten-${project.id}`} className="text-sm text-muted-foreground">
                          Aktiv
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Reihenfolge:</label>
                        <Input
                          type="number"
                          value={project.display_order}
                          onChange={(e) => handleProjectChange(project.id, "display_order", parseInt(e.target.value) || 0)}
                          className="w-20"
                        />
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
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

export default AdminGartenProjectsTab;
