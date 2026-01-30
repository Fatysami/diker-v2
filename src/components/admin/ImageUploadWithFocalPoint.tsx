import { useState } from "react";
import { Upload, Loader2, Image as ImageIcon, Info } from "lucide-react";
import { FocalPointSelector, FocalPoint, focalPointToObjectPosition } from "./FocalPointSelector";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  showHint?: boolean;
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
  showHint = true,
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

  // Use consistent 4:3 aspect ratio for all project images
  const aspectRatioClass = isLarge ? "aspect-[4/3]" : "aspect-[4/3]";

  return (
    <div className="space-y-2">
      <div className={`relative ${aspectRatioClass}`}>
        <div className="w-full h-full rounded-lg overflow-hidden bg-muted">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={label}
              className="w-full h-full object-cover"
              style={{ objectPosition: focalPointToObjectPosition(focalPoint) }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
              <ImageIcon
                className="w-8 h-8 text-muted-foreground/30"
              />
              {showHint && (
                <p className="text-xs text-muted-foreground/60 text-center">
                  Querformat empfohlen
                </p>
              )}
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
      
      {/* Focal point selector with help tooltip */}
      {imageUrl && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Fokus:</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3 h-3 text-muted-foreground/60 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px]">
                  <p className="text-xs">
                    Wählen Sie, welcher Teil des Bildes im Vordergrund stehen soll.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FocalPointSelector
            value={(focalPoint as FocalPoint) || "center"}
            onChange={handleFocalPointChange}
          />
        </div>
      )}
      
      {/* Format recommendation */}
      {showHint && isLarge && !imageUrl && (
        <p className="text-xs text-muted-foreground/70 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Querformat-Bilder (16:9 oder 4:3) funktionieren am besten
        </p>
      )}
    </div>
  );
};

export default ImageUploadWithFocalPoint;
