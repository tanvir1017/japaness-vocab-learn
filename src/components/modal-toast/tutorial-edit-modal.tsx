"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditTutorialForm, { TTutorialInputs } from "../forms/edit-tutorial-form";

export type TEditTutorial = TTutorialInputs & {
  _id: string;
};
export function TutorialEditModal({ tutorial }: { tutorial: TEditTutorial }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Edit Tutorial
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle>Edit the tutorial from here</DialogTitle>
          <DialogDescription>
            Make changes to your lesson here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <EditTutorialForm setIsOpen={setIsOpen} tutorial={tutorial} />
      </DialogContent>
    </Dialog>
  );
}
