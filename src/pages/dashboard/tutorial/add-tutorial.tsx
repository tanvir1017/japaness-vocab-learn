"use client";
import { APIeEndPoints, axiosAPI } from "@/api/axios";
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
import { Loader } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export type TTutorialFormInputs = {
  title: string;
  url: string;
};

async function addTutorial(url: string, { arg }: { arg: TTutorialFormInputs }) {
  try {
    const response = await axiosAPI.post(
      `${APIeEndPoints.tutorial}/create-tutorial`,
      arg // Data sent to the backend
    );
    return response.data; // Return data for further processing if needed
  } catch (error) {
    console.error("Error posting data to backend:", error);
    throw error; // Rethrow error for error handling
  }
}
const AddTutorialComponent = () => {
  const { trigger, isMutating } = useSWRMutation("/tutorial", addTutorial);
  const { register, handleSubmit } = useForm<TTutorialFormInputs>();

  const onSubmit: SubmitHandler<TTutorialFormInputs> = async (data) => {
    console.log(data);
    try {
      // Send data to backend
      await trigger(data);
      toast("Tutorial added successfully!");
    } catch (error) {
      console.error("Error adding Tutorial:", error);
      toast("Error adding Tutorial.");
    }
  };
  return (
    <div className="px-10">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Add Tutorial</CardTitle>
          <CardDescription>
            New tutorial will be created by fill up the following information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Tutorial Title</Label>
                <Input
                  id="title"
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Learn how to say goodby in conversation"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">Tutorial URL</Label>
                <Input
                  type="text"
                  id="url"
                  {...register("url", { required: true })}
                  placeholder="e.g https://youtube.com/watch?v=2adkf3"
                />
              </div>

              <ServerSubmitButton type="submit" aria-disabled={isMutating}>
                {isMutating ? (
                  <span>
                    <Loader className="animate transition-all" /> processing...
                  </span>
                ) : (
                  "Add Tutorial"
                )}
              </ServerSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTutorialComponent;
