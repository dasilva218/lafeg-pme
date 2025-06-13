"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type DeleteConfirmationDialogProps = {
  onConfirm: () => Promise<void>;
  trigger: React.ReactNode;
};

export function DeleteConfirmationDialog({
  onConfirm,
  trigger,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          Êtes-vous sûr de vouloir supprimer cette publicité ? Cette action est irréversible.
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await onConfirm();
                  toast.success("Publicité supprimée avec succès");
                } catch (err) {
                  console.error(err);
                  toast.error("Erreur lors de la suppression");
                }
              }}
            >
              Supprimer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
