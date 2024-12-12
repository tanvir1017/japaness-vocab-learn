import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditUser from "../forms/edit-user-form";

export function EditUserModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Edit User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle>Edit the lesson from here</DialogTitle>
          <DialogDescription>
            Make changes to your lesson here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <EditUser />
      </DialogContent>
    </Dialog>
  );
}
