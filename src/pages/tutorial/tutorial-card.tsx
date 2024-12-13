import { TTurialDataType } from "@/app/(users)/tutorials/page";
import VideoComponent from "@/components/styled-components/video-component";
import { Suspense } from "react";

interface TutorialCardProps {
  tutorial: TTurialDataType[];
}

const TutorialCard = ({ tutorial }: TutorialCardProps) => {
  console.log("🚀 ~ TutorialCard ~ tutorial:", tutorial);
  return (
    <div className="container border w-full h-screen pt-10">
      <div className="grid md:grid-cols-3 gap-3">
        {tutorial?.map((t) => (
          <div key={t._id} className="bg-purple-300 aspect-video">
            <Suspense fallback={<p>Loading video...</p>}>
              <VideoComponent src={t.url} title={t.title} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialCard;
