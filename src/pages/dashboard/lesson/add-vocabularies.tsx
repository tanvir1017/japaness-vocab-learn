"use client";
import { APIeEndPoints, axiosAPI } from "@/api/axios";
import { LessonSelect } from "@/components/styled-components/lesson-select";
import ServerSubmitButton from "@/components/styled-components/server-submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isJapanese } from "@/lib/isJapanese";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export type TVocabularyFormInputs = {
  lesson: string;
  meaning: string;
  pronunciation: string;
  whenToSay: string;
  word: string;
};

async function addVocabulary(
  url: string,
  { arg }: { arg: TVocabularyFormInputs }
) {
  try {
    const response = await axiosAPI.post(
      `${APIeEndPoints.vocabulary}/create-vocabulary`,
      arg // Data sent to the backend
    );
    return response.data; // Return data for further processing if needed
  } catch (error) {
    console.error("Error posting data to backend:", error);
    throw error; // Rethrow error for error handling
  }
}

export default function AddVocabularies() {
  const [lesson, setLesson] = useState(""); // Store selected lessonId

  const { trigger, isMutating } = useSWRMutation("/vocabulary", addVocabulary);
  const { register, handleSubmit } = useForm<TVocabularyFormInputs>();

  const handleSelectChange = (value: string) => {
    setLesson(value); // Updating on selection change
  };

  const onSubmit: SubmitHandler<TVocabularyFormInputs> = async (data) => {
    try {
      if (!lesson) {
        toast("Please select a lesson.");
        return;
      }

      if (!isJapanese(data.word)) {
        toast(`${data.word} is not a Japanese word.`);
        return;
      }

      // Send data to backend
      await trigger({
        ...data,
        lesson,
      });

      //mutate(APIeEndPoints.lesson); // Revalidate the lesson list
      toast("Vocabulary added successfully!");
    } catch (error) {
      console.error("Error adding vocabulary:", error);
      toast("Error adding vocabulary.");
    }
  };

  return (
    <div className="px-10">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Create Vocabulary For Specific Lesson
          </CardTitle>
          <CardDescription>Vocabularies</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="Word" className="">
                  Word
                </Label>
                <Input
                  id="Word"
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
                  placeholder="When To Say"
                  {...register("whenToSay", { required: true })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lesson" className="text-right">
                  Select Lesson
                </Label>
                <LessonSelect handleSelectChange={handleSelectChange} />
              </div>
            </div>

            <ServerSubmitButton aria-disabled={isMutating} className="w-full">
              Add Vocabulary
            </ServerSubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
