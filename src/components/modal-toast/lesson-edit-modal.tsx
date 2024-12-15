"use client";
import { TLessonList } from "@/app/dashboard/view-all-lessons/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import EditLessonForm from "../forms/edit-lesson-form";

export function LessonEditDialog({ lesson }: { lesson: TLessonList }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Edit Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle>Edit the lesson from here</DialogTitle>
          <DialogDescription>
            Make changes to your lesson here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <EditLessonForm setIsOpen={setOpen} lesson={lesson} />
      </DialogContent>
    </Dialog>
  );
}
