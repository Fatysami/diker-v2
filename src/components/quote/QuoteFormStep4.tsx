import { useState, useCallback } from "react";
import { Camera, X, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";

interface QuoteFormStep4Props {
  photos: File[];
  setPhotos: (photos: File[]) => void;
}

const QuoteFormStep4 = ({ photos, setPhotos }: QuoteFormStep4Props) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
    );
    
    const newPhotos = [...photos, ...files].slice(0, 5);
    setPhotos(newPhotos);
  }, [photos, setPhotos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        file => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024
      );
      const newPhotos = [...photos, ...files].slice(0, 5);
      setPhotos(newPhotos);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">Fotos (optional)</h3>
        <p className="text-muted-foreground">Fügen Sie bis zu 5 Fotos hinzu</p>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="photo-upload"
          className="hidden"
          accept="image/jpeg,image/png"
          multiple
          onChange={handleFileChange}
          disabled={photos.length >= 5}
        />
        <label 
          htmlFor="photo-upload" 
          className={`cursor-pointer flex flex-col items-center ${photos.length >= 5 ? 'opacity-50' : ''}`}
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <span className="text-foreground font-medium mb-2">
            {photos.length >= 5 
              ? "Maximum erreicht (5 Fotos)" 
              : "Klicken oder Fotos hierher ziehen"
            }
          </span>
          <span className="text-sm text-muted-foreground">
            JPG, PNG • max. 5 MB pro Bild
          </span>
        </label>
      </div>

      {photos.length > 0 && (
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-foreground">
            <Camera className="w-4 h-4 text-primary" />
            Hochgeladene Fotos ({photos.length}/5)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="absolute bottom-1 left-1 text-xs bg-black/50 text-white px-1.5 py-0.5 rounded">
                  {(photo.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tipp:</strong> Fotos helfen uns, Ihr Projekt besser einzuschätzen und ein genaueres Angebot zu erstellen.
        </p>
      </div>
    </div>
  );
};

export default QuoteFormStep4;
