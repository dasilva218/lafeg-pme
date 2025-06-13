"use client";
import React, { useState } from "react";
import {
  updatePubliciteWithImage,

} from "@/app/services/publicite/api";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function FormModifierPublicite({
  publicite,
  onSuccess,
}: {
  publicite: any;
  onSuccess: () => void;
}) {

  const [formValues, setFormValues] = useState({
    libelle: publicite.libelle,
    nom_structure: publicite.nom_structure,
    imageFile: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("libelle", formValues.libelle);
    formData.append("nom_structure", formValues.nom_structure);
    if (formValues.imageFile) {
      formData.append("image", formValues.imageFile);
    }
    await updatePubliciteWithImage(publicite.id_publicite, formData);
    setLoading(false);
    toast.success("Publicité mise à jour avec succès !");
    onSuccess();
  };

  return (
    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
      
      <Select
        value={formValues.libelle}
        onValueChange={(value: string) =>
          setFormValues({ ...formValues, libelle: value })
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sélectionnez l’emplacement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HEADER">Entête (HEADER)</SelectItem>
          <SelectItem value="MIDDLE">Section Accueil (MIDDLE)</SelectItem>
          <SelectItem value="INSTITUTION">
            Page Institution Financière (INSTITUTION)
          </SelectItem>
          <SelectItem value="SEA">Page SEA (SEA)</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="text"
        value={formValues.nom_structure}
        onChange={(e) => setFormValues({ ...formValues, nom_structure: e.target.value })}
        required
      />
      <Input
        type="file"
        accept="image/png"
        onChange={(e) => setFormValues({ ...formValues, imageFile: e.target.files?.[0] || null })}
      />

      {publicite.image_url && (
        <img src={publicite.image_url} alt="Image existante" style={{ maxWidth: 200 }} />
      )}

      <Button variant="default" onClick={handleSubmit} type="submit">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Modification…
          </>
        ) : (
          "Modifier"
        )}
      </Button>
    </form>
  );
}
