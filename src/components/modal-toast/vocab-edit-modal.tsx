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
import EditVocabForm from "../forms/edit-vocab-form";

export function VocabEditDialog({ vocab }: { vocab: TVocabulary }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Edit Vocabulary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle>Edit the vicarly from here</DialogTitle>
          <DialogDescription>
            Make changes to your lesson here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditVocabForm vocab={vocab} />
      </DialogContent>
    </Dialog>
  );
}
