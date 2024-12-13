"use client";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
import { getNestedData } from "@/lib/getNestedData";
import { TVocabularyFormInputs } from "@/pages/dashboard/lesson/add-vocabularies";
import { TVocabulary } from "@/pages/dashboard/lesson/vocabulary-management-table";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { LessonSelect } from "../styled-components/lesson-select";
import ServerSubmitButton from "../styled-components/server-submit-button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TVocabularyEditFormInputs = TVocabularyFormInputs;

async function updateLesson(
  url: string,
  { arg }: { arg: { id: string; data: TVocabularyEditFormInputs } }
) {
  // Make the API call to update the lesson
  const res = await axiosAPI.patch(
    `${APIeEndPoints.vocabulary}/${arg.id}/update`,
    arg.data
  );
  return res;
}

export default function VocabEditForm({ vocab }: { vocab: TVocabulary }) {
  const { trigger, isMutating } = useSWRMutation("/vocabulary", updateLesson);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TVocabularyEditFormInputs>();

  console.log(errors);

  // ** Select lesson from the list
  const [selectLesson, setSelectLesson] = useState<string>(
    vocab.lesson._id || ""
  );

  // ** Select the lesson by on change
  const handleSelectLesson = (id: string) => {
    setSelectLesson(id);
  };

  const onSubmit: SubmitHandler<TVocabularyEditFormInputs> = async (data) => {
    try {
      const check = await trigger({
        id: vocab._id,
        data: { ...data, lesson: selectLesson },
      });
      mutate(APIeEndPoints.vocabulary); // Revalidate the vocabulary endpoint

      const { message, success } = getNestedData(check);
      if (!success) {
        toast(`${message || "Something went wrong!!"}`);
      }
      toast(`${message || "Vocabulary updated successfully!!"}`);
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message || "Something went wrong!!");
      } else {
        toast("An unknown error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="space-y-1">
          <Label htmlFor="Word" className="">
            Word
          </Label>
          <Input
            id="Word"
            defaultValue={vocab.word || ""}
            placeholder="Word"
            {...register("word", { required: true })}
            className=""
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="meaning" className="text-right">
            Vocabulary Meaning
          </Label>
          <Input
            id="meaning"
            defaultValue={vocab.meaning || ""}
            placeholder="Vocabulary Meaning"
            {...register("meaning", { required: true })}
          />
        </div>{" "}
        <div className="space-y-1">
          <Label htmlFor="pronunciation" className="text-right">
            Pronunciation
          </Label>
          <Input
            id="pronunciation"
            defaultValue={vocab.pronunciation || ""}
            placeholder="Vocabulary pronunciation"
            {...register("pronunciation", { required: true })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="whenToSay" className="text-right">
            When To Say
          </Label>
          <Input
            id="whenToSay"
            defaultValue={vocab.whenToSay || ""}
            placeholder="When To Say"
            {...register("whenToSay", { required: true })}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="lesson" className="text-right">
            Select Lesson
          </Label>
          <LessonSelect
            handleSelectChange={handleSelectLesson}
            currentLesson={vocab.lesson.lessonNo}
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
