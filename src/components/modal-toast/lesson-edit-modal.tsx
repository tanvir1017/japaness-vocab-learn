import { TLessonList } from "@/app/(admin)/dashboard/(lesson-management)/view-all-lessons/page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditLessonForm from "../forms/edit-lesson-form";

export function LessonEditDialog({ lesson }: { lesson: TLessonList }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Edit Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit the lesson from here</DialogTitle>
          <DialogDescription>
            Make changes to your lesson here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <EditLessonForm lesson={lesson} />
      </DialogContent>
    </Dialog>
  );
}
