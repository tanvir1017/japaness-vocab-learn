"use client";
import { APIeEndPoints, axiosAPI } from "@/api/axios";
import ErrorMessageComp from "@/components/styled-components/error-message-comp";
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
import React from "react";
import { toast } from "sonner";

export type UserSession = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: {
      firstName: string;
      lastName: string;
      _id: string;
    };
    email: string;
    role: "admin" | "lerner";
    profileImg: string;
    gender: "male" | "female" | "other";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};
export default function AddLesson({ user }: { user: UserSession }) {
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const title = formData.get("title");
    const lessonNo = formData.get("lessonNo");

    try {
      // write a axios post to backend
      const response = await axiosAPI.post(
        `${APIeEndPoints.lesson}/create-lesson`,
        JSON.stringify({ title, lessonNo, user: user.data._id }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast(response.data.message);
      } else {
        toast("something went wrong!");
      }
    } catch (error: unknown) {
      toast(JSON.stringify((error as Error)?.message as string));
    }
  };

  return (
    <div className="px-10">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Add Lessons</CardTitle>
          <CardDescription>
            New lesson will be created by fill up the following information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitHandler}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Lesson Name</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Basic Greetings"
                  required
                />{" "}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastNo">Lesson No</Label>
                <Input
                  type="text"
                  id="lastNo"
                  name="lessonNo"
                  placeholder="e.g 1, 2"
                  required
                />
              </div>

              <ServerSubmitButton type="submit" aria-disabled={isPending}>
                {isPending ? (
                  <span>
                    <Loader className="animate transition-all" />
                  </span>
                ) : (
                  "Add Lesson"
                )}
              </ServerSubmitButton>
            </div>

            <ErrorMessageComp
              errorMessage={errorMessage as string | FormData}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
