import { APIeEndPoints } from "@/components/api/axios";
import GradientBg from "@/components/styled-components/gradient-bg";
import TutorialCard from "@/pages/tutorial/tutorial-card";

export type TTurialDataType = {
  _id: string;
  url: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TTurialAPiResponse = {
  success: boolean;
  message: string;
  data: TTurialDataType[];
};

async function TutorialPage() {
  const res = await fetch(
    `${APIeEndPoints.base_url}/${APIeEndPoints.tutorial}`
  );
  const result = (await res.json()) as TTurialAPiResponse;
  const data = result.data;
  return (
    <GradientBg>
      <div className="mb-20 text-center mt-20">
        <h2 className="text-4xl text-white font-bold">
          LEARN JAPANESE BY TUTORIALS
        </h2>
        <p className="text-xl text-gray-300 mt-4 max-w-xl mx-auto">
          Discover and follow expert Japanese language tutors to help you grow
          your Japanese skills.
        </p>
      </div>
      <TutorialCard tutorial={data} />
    </GradientBg>
  );
}

export default TutorialPage;
