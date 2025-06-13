"use client";

import React, { useState } from "react";
import {
  createPublicite
} from "@/app/services/publicite/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
export function FormCreerPublicite({ onSuccess }: { onSuccess: () => void }) {
  const [formValues, setFormValues] = useState({
    libelle: "",
    nom_structure: "",
    imageFile: null as File | null,
  });

   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("libelle", formValues.libelle);
    formData.append("nom_structure", formValues.nom_structure);
    if (formValues.imageFile) {
      formData.append("image", formValues.imageFile); // ✅ important : pas imageFile, juste image
    }

    await createPublicite(formData); // ✅ on envoie du FormData
    toast.success("Publicité créée avec succès !");
    setFormValues({ libelle: "", nom_structure: "", imageFile: null });
    onSuccess();
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors de la création de la publicité.");
  }
};


  return (
    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Libellé"
        required
        value={formValues.libelle}
        onChange={(e) =>
          setFormValues({ ...formValues, libelle: e.target.value })
        }
      />
      <Input
        type="text"
        placeholder="Nom de la structure"
        required
        value={formValues.nom_structure}
        onChange={(e) =>
          setFormValues({ ...formValues, nom_structure: e.target.value })
        }
      />
      <Input
        type="file"
        accept="image/png"
        onChange={(e) =>
          setFormValues({
            ...formValues,
            imageFile: e.target.files?.[0] || null,
          })
        }
      />
      <Button variant="default" type="submit" onClick={handleSubmit}>Créer</Button>
    </form>
  );
}
