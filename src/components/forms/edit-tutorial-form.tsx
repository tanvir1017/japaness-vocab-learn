"use client";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { TEditTutorial } from "../modal-toast/tutorial-edit-modal";
import ServerSubmitButton from "../styled-components/server-submit-button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export type TTutorialInputs = {
  title: string;
  url: string;
};

async function updateLesson(
  url: string,
  { arg }: { arg: { tutorialId: string; data: TTutorialInputs } }
) {
  // Make the API call to update the lesson
  await axiosAPI.patch(
    `${APIeEndPoints.tutorial}/${arg.tutorialId}/update`,
    arg.data
  );
}

export default function EditTutorialForm({
  tutorial,
}: {
  tutorial: TEditTutorial;
}) {
  const { trigger, isMutating } = useSWRMutation("/lesson", updateLesson);

  // ** destructing the react-hook-method
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTutorialInputs>();

  console.log(errors);

  // ** Getting the form sumption
  const onSubmit: SubmitHandler<TTutorialInputs> = async (data) => {
    try {
      await trigger({ tutorialId: tutorial._id, data });
      mutate(APIeEndPoints.tutorial); // Revalidate the lesson list
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
            defaultValue={tutorial.title || ""}
            placeholder="Title"
            {...register("title", { required: true })}
            className=""
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="url" className="text-right">
            Tutorial URL
          </Label>
          <Input
            id="url"
            defaultValue={tutorial.url || ""}
            placeholder="Tutorial URL"
            {...register("url", { required: true })}
          />
        </div>
      </div>
      <DialogFooter>
        <ServerSubmitButton aria-disabled={isMutating}>
          Save Changes
        </ServerSubmitButton>
      </DialogFooter>{" "}
    </form>
  );
}
