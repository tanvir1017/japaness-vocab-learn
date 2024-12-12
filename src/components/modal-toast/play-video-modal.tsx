import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "../ui/aspect-ratio";

export function PlayVideoModal({ url }: { url: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Play Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] w-full ">
        <DialogTitle> </DialogTitle>
        <DialogHeader>
          <DialogTitle className="hidden" aria-hidden={true}>
            Edit the tutorial from here
          </DialogTitle>
          <DialogDescription>
            <div className="w-full">
              <video src={url} autoPlay controls />
              <AspectRatio ratio={12 / 5}></AspectRatio>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
