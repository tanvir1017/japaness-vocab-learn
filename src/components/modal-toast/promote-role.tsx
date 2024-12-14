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
import { cn } from "@/lib/utils";
import { TUserResponse } from "@/pages/dashboard/user/view-all-user-table";
import { Loader, Shield, ShieldMinus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import ServerSubmitButton from "../styled-components/server-submit-button";

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
  const [open, setOpen] = useState(false);
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
        setOpen(false);
      } else {
        toast(res.message);
        setOpen(false);
      }
    } catch (error) {
      toast(`Error updating lesson: ${JSON.stringify(error)}`);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn("text-white", {
            "bg-red-500 hover:bg-red-500": user.role === "admin",
            "bg-primary ": user.role !== "admin",
          })}
        >
          {user.role === "admin" ? "Demote" : "Promote"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle className="mx-auto mb-5 font-medium pt-3">
            By clicking on yes you will make this user role into{" "}
          </DialogTitle>
          <DialogDescription className="bg-blue-800/15 text-blue-100  rounded">
            {user.role === "admin" ? (
              <span className="flex items-center justify-center ">
                <ShieldMinus className="text-red-500" />
                <span className="text-2xl text-center font-bold ml-2.5 py-2">
                  Lerner
                </span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Shield />
                <span className="text-2xl text-center font-bold py-2 ml-2.5">
                  Admin
                </span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end space-x-2">
          <Button
            onClick={() => setOpen((prev) => !prev)}
            className="text-white rounded-full bg-secondary hover:bg-secondary"
          >
            Cancel
          </Button>

          <ServerSubmitButton
            onClick={handleMutationData}
            aria-disabled={isMutating}
            type="submit"
            className="text-white rounded-full"
          >
            {isMutating ? (
              <>
                <Loader className="animate transition-all" /> processing...
              </>
            ) : (
              "Yes"
            )}
          </ServerSubmitButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
