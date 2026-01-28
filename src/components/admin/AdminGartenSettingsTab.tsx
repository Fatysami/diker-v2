import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, Loader2, MapPin, Tags } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useGartenServiceTagsAdmin,
  useUpdateGartenServiceTag,
  useCreateGartenServiceTag,
  useDeleteGartenServiceTag,
  GartenServiceTag,
} from "@/hooks/useGartenServiceTags";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";

const AdminGartenSettingsTab = () => {
  const { toast } = useToast();
  const { data: tags, isLoading: tagsLoading } = useGartenServiceTagsAdmin();
  const { data: mapsContent, isLoading: mapsLoading } = useSiteContent("contact", "google_maps_url");
  
  const updateTag = useUpdateGartenServiceTag();
  const createTag = useCreateGartenServiceTag();
  const deleteTag = useDeleteGartenServiceTag();
  const updateSiteContent = useUpdateSiteContent();

  const [newTagName, setNewTagName] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [mapsUrlLoaded, setMapsUrlLoaded] = useState(false);

  // Initialize maps URL when data loads
  if (mapsContent && !mapsUrlLoaded) {
    setMapsUrl(mapsContent.value);
    setMapsUrlLoaded(true);
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie einen Namen ein.",
        variant: "destructive",
      });
      return;
    }

    try {
      const maxOrder = tags?.reduce((max, t) => Math.max(max, t.display_order), 0) || 0;
      await createTag.mutateAsync({ name: newTagName.trim(), display_order: maxOrder + 1 });
      setNewTagName("");
      toast({
        title: "Erfolg",
        description: "Tag wurde erstellt.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Tag konnte nicht erstellt werden.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTag = async (tag: GartenServiceTag, updates: Partial<GartenServiceTag>) => {
    try {
      await updateTag.mutateAsync({ id: tag.id, ...updates });
      toast({
        title: "Erfolg",
        description: "Tag wurde aktualisiert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Tag konnte nicht aktualisiert werden.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTag = async (id: string) => {
    try {
      await deleteTag.mutateAsync(id);
      toast({
        title: "Erfolg",
        description: "Tag wurde gelöscht.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Tag konnte nicht gelöscht werden.",
        variant: "destructive",
      });
    }
  };

  const handleSaveMapsUrl = async () => {
    try {
      await updateSiteContent.mutateAsync({
        section: "contact",
        key: "google_maps_url",
        value: mapsUrl,
      });
      toast({
        title: "Erfolg",
        description: "Google Maps URL wurde aktualisiert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "URL konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

  if (tagsLoading || mapsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Google Maps Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Google Maps
          </CardTitle>
          <CardDescription>
            URL de l'iframe Google Maps affichée dans la section Contact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={mapsUrl}
            onChange={(e) => setMapsUrl(e.target.value)}
            placeholder="https://www.google.com/maps/embed?pb=..."
            rows={4}
          />
          <div className="flex items-center gap-4">
            <Button onClick={handleSaveMapsUrl} disabled={updateSiteContent.isPending}>
              {updateSiteContent.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Speichern
            </Button>
            {mapsUrl && (
              <div className="flex-1 rounded-lg overflow-hidden border border-border h-32">
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Vorschau"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Garten Service Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tags className="w-5 h-5" />
            Garten-Leistungen Tags
          </CardTitle>
          <CardDescription>
            Tags wie "Terrassenbau", "Pflasterarbeiten", etc. die auf der Garten-Seite angezeigt werden
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add new tag */}
          <div className="flex gap-2 mb-6">
            <Input
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Neuer Tag-Name..."
              onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
            />
            <Button onClick={handleCreateTag} disabled={createTag.isPending}>
              {createTag.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Tags table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="w-24">Reihenfolge</TableHead>
                <TableHead className="w-24">Aktiv</TableHead>
                <TableHead className="w-20">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags?.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <Input
                      defaultValue={tag.name}
                      onBlur={(e) => {
                        if (e.target.value !== tag.name) {
                          handleUpdateTag(tag, { name: e.target.value });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue={tag.display_order}
                      className="w-20"
                      onBlur={(e) => {
                        const newOrder = parseInt(e.target.value);
                        if (newOrder !== tag.display_order) {
                          handleUpdateTag(tag, { display_order: newOrder });
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={tag.is_active}
                      onCheckedChange={(checked) => handleUpdateTag(tag, { is_active: checked })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTag(tag.id)}
                      disabled={deleteTag.isPending}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGartenSettingsTab;
