"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { axiosAPI } from "../api/axios";
import ServerSubmitButton from "../styled-components/server-submit-button";

async function deleteDocs(url: string, { arg }: { arg: { path: string } }) {
  await axiosAPI.delete(`${arg.path}/delete`);
}

export function AlertModal({
  revalidationPath,
  mainPathWithItemId,
}: {
  revalidationPath: string;
  mainPathWithItemId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { trigger, isMutating } = useSWRMutation(revalidationPath, deleteDocs);

  const handleDelete = async () => {
    await trigger({ path: mainPathWithItemId });
    toast("Item data deleted ✅");
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-500 text-white">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle>Are you sure to delete this?</DialogTitle>
          <DialogDescription className="">
            Remember if you delete this item you won`&lsquo;`t be able to
            restore
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-end space-x-2">
          <Button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-white rounded-full bg-secondary hover:bg-secondary"
          >
            Cancel
          </Button>

          <ServerSubmitButton
            onClick={handleDelete}
            type="submit"
            className="text-white rounded-full"
            aria-disabled={isMutating}
          >
            {isMutating ? (
              <>
                <Loader className="animate transition-all" /> deleting...
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
