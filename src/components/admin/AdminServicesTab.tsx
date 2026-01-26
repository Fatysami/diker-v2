import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

interface AdminServicesTabProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  onRefresh: () => void;
}

const AdminServicesTab = ({
  services,
  setServices,
  saving,
  setSaving,
  onRefresh,
}: AdminServicesTabProps) => {
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  const handleServiceChange = (id: string, field: keyof Service, value: string | boolean | string[]) => {
    setServices(prev =>
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const handleFeaturesChange = (id: string, value: string) => {
    // Split by comma and trim each feature
    const features = value.split(',').map(f => f.trim()).filter(f => f.length > 0);
    handleServiceChange(id, 'features', features);
  };

  const handleImageUpload = async (serviceId: string, file: File) => {
    setUploadingImage(serviceId);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `service-${serviceId}-${Date.now()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('services')
        .update({ image_url: urlData.publicUrl })
        .eq('id', serviceId);

      if (updateError) throw updateError;

      handleServiceChange(serviceId, 'image_url', urlData.publicUrl);
      toast.success("Bild erfolgreich hochgeladen!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Fehler beim Hochladen des Bildes");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleRemoveImage = async (serviceId: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ image_url: null })
        .eq('id', serviceId);

      if (error) throw error;

      handleServiceChange(serviceId, 'image_url', '');
      toast.success("Bild entfernt!");
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error("Fehler beim Entfernen des Bildes");
    }
  };

  const saveServices = async () => {
    setSaving(true);

    try {
      for (const service of services) {
        const { error } = await supabase
          .from('services')
          .update({
            title: service.title,
            description: service.description,
            icon: service.icon,
            is_active: service.is_active,
            features: service.features,
            link: service.link,
          } as any)
          .eq('id', service.id);

        if (error) throw error;
      }

      toast.success("Services erfolgreich gespeichert!");
    } catch (error) {
      console.error('Error saving services:', error);
      toast.error("Fehler beim Speichern der Services");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Homepage Services</h2>
        <Button onClick={saveServices} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Speichern..." : "Speichern"}
        </Button>
      </div>

      <div className="grid gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-card rounded-xl p-6 border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Image Section */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Bild
                </label>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {service.image_url ? (
                    <>
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRemoveImage(service.id)}
                        className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                      {uploadingImage === service.id ? (
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Bild hochladen</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(service.id, file);
                        }}
                      />
                    </label>
                  )}
                </div>
                {service.image_url && (
                  <label className="mt-2 flex items-center justify-center gap-2 text-sm text-primary cursor-pointer hover:underline">
                    <Upload className="w-4 h-4" />
                    Bild ändern
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(service.id, file);
                      }}
                    />
                  </label>
                )}
              </div>

              {/* Content Section */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Titel
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Beschreibung
                  </label>
                  <Textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(service.id, "description", e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Features (durch Komma getrennt)
                  </label>
                  <Input
                    value={service.features?.join(', ') || ''}
                    onChange={(e) => handleFeaturesChange(service.id, e.target.value)}
                    placeholder="z.B. Asphaltierung, Pflasterarbeiten, Fahrradwege"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Link (Seite)
                  </label>
                  <Input
                    value={service.link || ''}
                    onChange={(e) => handleServiceChange(service.id, "link", e.target.value)}
                    placeholder="/strassenbau"
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
                    Aktiv (sichtbar auf der Homepage)
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServicesTab;
