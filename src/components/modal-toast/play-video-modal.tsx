import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoComponent from "../styled-components/video-component";

export function PlayVideoModal({ url, title }: { url: string; title: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="border border-slate-200">
          Play Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] w-full ">
        <DialogTitle> {title}</DialogTitle>
        <DialogHeader>
          <DialogTitle className="hidden" aria-hidden={true}>
            Edit the tutorial from here
          </DialogTitle>
          <DialogDescription>
            <VideoComponent title={title} src={url} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
