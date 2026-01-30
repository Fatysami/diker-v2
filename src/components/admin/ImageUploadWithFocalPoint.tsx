import { useState } from "react";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { FocalPointSelector, FocalPoint, focalPointToObjectPosition } from "./FocalPointSelector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadWithFocalPointProps {
  id: string;
  imageUrl: string | null;
  focalPoint: string | null;
  onImageChange: (url: string) => void;
  onFocalPointChange: (focalPoint: FocalPoint) => void;
  label: string;
  isLarge?: boolean;
  storagePath: string;
  tableName: string;
  imageField: string;
  focalPointField: string;
}

const ImageUploadWithFocalPoint = ({
  id,
  imageUrl,
  focalPoint,
  onImageChange,
  onFocalPointChange,
  label,
  isLarge = false,
  storagePath,
  tableName,
  imageField,
  focalPointField,
}: ImageUploadWithFocalPointProps) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${storagePath}/${id}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      toast.error("Fehler beim Hochladen des Bildes");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("site-images").getPublicUrl(fileName);

    const { error } = await supabase
      .from(tableName as any)
      .update({ [imageField]: publicUrl })
      .eq("id", id);

    if (error) {
      toast.error("Fehler beim Aktualisieren");
    } else {
      onImageChange(publicUrl);
      toast.success("Bild aktualisiert!");
    }

    setUploading(false);
  };

  const handleFocalPointChange = async (newFocalPoint: FocalPoint) => {
    const { error } = await supabase
      .from(tableName as any)
      .update({ [focalPointField]: newFocalPoint })
      .eq("id", id);

    if (error) {
      toast.error("Fehler beim Aktualisieren des Fokuspunkts");
    } else {
      onFocalPointChange(newFocalPoint);
    }
  };

  return (
    <div className="space-y-2">
      <div className={`relative ${isLarge ? "aspect-[4/3]" : "aspect-square"}`}>
        <div className="w-full h-full rounded-lg overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={label}
              className="w-full h-full object-cover"
              style={{ objectPosition: focalPointToObjectPosition(focalPoint) }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon
                className={`${
                  isLarge ? "w-12 h-12" : "w-6 h-6"
                } text-muted-foreground/30`}
              />
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
              if (file) handleUpload(file);
            }}
          />
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2">
            {uploading ? (
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
      {imageUrl && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Fokus:</span>
          <FocalPointSelector
            value={(focalPoint as FocalPoint) || "center"}
            onChange={handleFocalPointChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadWithFocalPoint;
