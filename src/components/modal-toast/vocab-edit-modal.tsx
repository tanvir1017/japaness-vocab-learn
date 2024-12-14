import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TVocabulary } from "@/pages/dashboard/lesson/vocabulary-management-table";
import { useState } from "react";
import EditVocabForm from "../forms/edit-vocab-form";

export function VocabEditDialog({ vocab }: { vocab: TVocabulary }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Edit Vocabulary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle>Edit the vocabulary from here</DialogTitle>
          <DialogDescription>
            Make changes to your lesson here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditVocabForm setIsOpen={setIsOpen} vocab={vocab} />
      </DialogContent>
    </Dialog>
  );
}
