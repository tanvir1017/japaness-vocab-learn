"use client";

import { TLessonList } from "@/app/dashboard/view-all-lessons/page";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import ServerSubmitButton from "../styled-components/server-submit-button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TInputs = {
  title: string;
  lessonNo: string;
};

async function updateLesson(
  url: string,
  { arg }: { arg: { lessonId: string; data: TInputs } }
) {
  // Make the API call to update the lesson
  await axiosAPI.patch(
    `${APIeEndPoints.lesson}/${arg.lessonId}/update`,
    arg.data
  );
}

export default function EditLessonForm({
  lesson,
  setIsOpen,
}: {
  lesson: TLessonList;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { trigger, isMutating } = useSWRMutation("/lesson", updateLesson);

  // ** destructing the react-hook-method
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();

  // ** Getting the form sumption
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    try {
      await trigger({ lessonId: lesson._id, data });
      mutate(APIeEndPoints.lesson); // Revalidate the lesson list
      setIsOpen(false); // Close the modal after successful update
      toast("Lesson updated successfully");
    } catch (error) {
      toast(`Error updating lesson: ${JSON.stringify(error)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="space-y-1">
          <Label htmlFor="title" className="">
            Lesson Title
          </Label>
          <Input
            id="title"
            defaultValue={lesson.title || ""}
            placeholder="Title"
            {...register("title", { required: true })}
            className=""
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lessonNo" className="text-right">
            Lesson Number
          </Label>
          <Input
            id="lessonNo"
            defaultValue={lesson.lessonNo || ""}
            placeholder="Lesson Number"
            {...register("lessonNo", { required: true })}
          />
        </div>
      </div>
      <DialogFooter>
        <ServerSubmitButton
          className="text-white"
          disabled={isMutating}
          aria-disabled={isMutating}
        >
          Save Changes
        </ServerSubmitButton>
      </DialogFooter>{" "}
    </form>
  );
}
