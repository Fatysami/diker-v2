import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useServiceTagsAdmin,
  useUpdateServiceTag,
  useCreateServiceTag,
  useDeleteServiceTag,
  ServiceTag,
} from "@/hooks/useServiceTags";

interface ServiceTagsManagerProps {
  service: "strassenbau" | "tiefbau" | "kanalbau";
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceTagsManager = ({ service, title, description, icon }: ServiceTagsManagerProps) => {
  const { toast } = useToast();
  const { data: tags, isLoading } = useServiceTagsAdmin(service);
  const updateTag = useUpdateServiceTag(service);
  const createTag = useCreateServiceTag(service);
  const deleteTag = useDeleteServiceTag(service);
  const [newTagName, setNewTagName] = useState("");

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

  const handleUpdateTag = async (tag: ServiceTag, updates: Partial<ServiceTag>) => {
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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
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
            {tags?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  Keine Tags vorhanden. Erstellen Sie einen neuen Tag.
                </TableCell>
              </TableRow>
            )}
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
  );
};

export default ServiceTagsManager;
