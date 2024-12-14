import { TTurialDataType } from "@/app/tutorials/page";
import YoutubeVideo from "@/components/video";
import { Suspense } from "react";

interface TutorialCardProps {
  tutorial: TTurialDataType[];
}

const TutorialCard = ({ tutorial }: TutorialCardProps) => {
  return (
    <div className="container w-full min-h-screen mt-20">
      <div className="grid place-items-center gap-3">
        {tutorial?.map((t) => (
          <div
            key={t._id}
            className="mx-auto max-w-full border overflow-hidden"
          >
            <Suspense fallback={<p>Loading video...</p>}>
              <YoutubeVideo url={t.url} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialCard;
