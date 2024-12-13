"use client";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TUserResponse } from "@/pages/dashboard/user/view-all-user-table";
import { Settings, User } from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

async function promoteUser(
  url: string,
  { arg }: { arg: { userId: string; data: { role: string } } }
) {
  // Make the API call to update the lesson
  const res = await axiosAPI.patch(
    `${APIeEndPoints.users}/${arg.userId}/update`,
    arg.data
  );
  return res.data;
}
export function PromoteRole({ user }: { user: TUserResponse }) {
  const data = {
    role: user.role === "admin" ? "lerner" : "admin",
  };
  const { trigger, isMutating } = useSWRMutation(
    APIeEndPoints.users,
    promoteUser
  );

  const handleMutationData = async () => {
    try {
      const res = await trigger({ userId: user._id, data });
      mutate(APIeEndPoints.users + "/all"); // Revalidate the users list
      if (!res.success) {
        toast("something went wrong!");
      } else {
        toast(res.message);
      }
    } catch (error) {
      toast(`Error updating lesson: ${JSON.stringify(error)}`);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Promote</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle>By clicking on save you will make the user </DialogTitle>
          <DialogDescription className="">
            {user.role === "admin" ? (
              <span className="flex items-center justify-center">
                <User />
                <span className="text-2xl text-center font-bold py-2">
                  Lerner
                </span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Settings />
                <span className="text-2xl text-center font-bold py-2">
                  Admin
                </span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-10">
          <Button variant="secondary">Cancel</Button>
          <Button
            variant="destructive"
            onClick={handleMutationData}
            aria-disabled={isMutating}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
