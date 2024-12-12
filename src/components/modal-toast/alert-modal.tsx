import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AlertModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
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
        <div className="flex items-center justify-center space-x-10">
          <Button variant="secondary">Cancel</Button>
          <Button variant="destructive"> Yes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
