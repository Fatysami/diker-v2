import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, Loader2, MapPin, Tags, Image, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useGartenServiceTagsAdmin,
  useUpdateGartenServiceTag,
  useCreateGartenServiceTag,
  useDeleteGartenServiceTag,
  GartenServiceTag,
} from "@/hooks/useGartenServiceTags";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";

const AdminGartenSettingsTab = () => {
  const { toast } = useToast();
  const { data: tags, isLoading: tagsLoading } = useGartenServiceTagsAdmin();
  const { data: mapsContent, isLoading: mapsLoading } = useSiteContent("contact", "google_maps_url");
  const { data: faviconContent, isLoading: faviconLoading } = useSiteContent("branding", "favicon_url");
  
  const updateTag = useUpdateGartenServiceTag();
  const createTag = useCreateGartenServiceTag();
  const deleteTag = useDeleteGartenServiceTag();
  const updateSiteContent = useUpdateSiteContent();

  const [newTagName, setNewTagName] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [mapsUrlLoaded, setMapsUrlLoaded] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState("");
  const [faviconLoaded, setFaviconLoaded] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // Initialize maps URL when data loads
  if (mapsContent && !mapsUrlLoaded) {
    setMapsUrl(mapsContent.value);
    setMapsUrlLoaded(true);
  }

  // Initialize favicon URL when data loads
  if (faviconContent && !faviconLoaded) {
    setFaviconUrl(faviconContent.value);
    setFaviconLoaded(true);
  }

  const handleFaviconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie eine Bilddatei aus.",
        variant: "destructive",
      });
      return;
    }

    setUploadingFavicon(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `favicon-${Date.now()}.${fileExt}`;
      const filePath = `branding/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath);

      setFaviconUrl(publicUrl);

      // Save to database
      await updateSiteContent.mutateAsync({
        section: "branding",
        key: "favicon_url",
        value: publicUrl,
      });

      toast({
        title: "Erfolg",
        description: "Favicon wurde hochgeladen und gespeichert.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Fehler",
        description: "Favicon konnte nicht hochgeladen werden.",
        variant: "destructive",
      });
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleSaveFaviconUrl = async () => {
    try {
      await updateSiteContent.mutateAsync({
        section: "branding",
        key: "favicon_url",
        value: faviconUrl,
      });
      toast({
        title: "Erfolg",
        description: "Favicon URL wurde aktualisiert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Favicon URL konnte nicht gespeichert werden.",
        variant: "destructive",
      });
    }
  };

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

  if (tagsLoading || mapsLoading || faviconLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Favicon Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Favicon
          </CardTitle>
          <CardDescription>
            Das Favicon erscheint im Browser-Tab und in Lesezeichen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-6">
            {/* Favicon Preview */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden">
                {faviconUrl ? (
                  <img 
                    src={faviconUrl} 
                    alt="Favicon Vorschau" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">Vorschau</span>
            </div>

            {/* Upload and URL input */}
            <div className="flex-1 space-y-4">
              <div className="flex gap-2">
                <Input
                  value={faviconUrl}
                  onChange={(e) => setFaviconUrl(e.target.value)}
                  placeholder="https://... oder /favicon.png"
                />
                <Button onClick={handleSaveFaviconUrl} disabled={updateSiteContent.isPending}>
                  {updateSiteContent.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">oder</span>
                <input
                  ref={faviconInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFaviconUpload}
                />
                <Button
                  variant="outline"
                  onClick={() => faviconInputRef.current?.click()}
                  disabled={uploadingFavicon}
                >
                  {uploadingFavicon ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Bild hochladen
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Google Maps Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Google Maps
          </CardTitle>
          <CardDescription>
            URL des Google Maps iFrame, das im Kontaktbereich angezeigt wird
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
