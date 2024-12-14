"use client";
import ServerSubmitButton from "../styled-components/server-submit-button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function EditUser() {
  return (
    <form>
      <div className="grid gap-4 py-4">
        <div className="space-y-1">
          <Label htmlFor="title" className="">
            Lesson Title
          </Label>
          <Input
            id="title"
            placeholder="Title"
            // defaultValue={lesson.title || ""}
            // {...register("title", { required: true })}
            className=""
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lessonNo" className="text-right">
            Lesson Number
          </Label>
          <Input
            id="lessonNo"
            placeholder="Lesson Number"
            // defaultValue={lesson.lessonNo || ""}
            // {...register("lessonNo", { required: true })}
          />
        </div>
      </div>
      <DialogFooter>
        <ServerSubmitButton aria-disabled>Save Changes</ServerSubmitButton>
      </DialogFooter>{" "}
    </form>
  );
}
