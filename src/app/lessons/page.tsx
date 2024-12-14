import { APIeEndPoints } from "@/components/api/axios";
import GradientBg from "@/components/styled-components/gradient-bg";
import LessonCards from "@/pages/lessons/lessons-home";
export type TLesson = {
  _id: string;
  user: string;
  title: string;
  lessonNo: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type LessonApiResponse = {
  success: boolean;
  message: string;
  data: TLesson[];
};

async function LessonPage() {
  const res = await fetch(`${APIeEndPoints.base_url}${APIeEndPoints.lesson}`);
  const result = (await res.json()) as LessonApiResponse;

  return (
    <GradientBg className="p-4 md:p-8 min-h-screen">
      <div className="mb-20 text-center mt-20">
        <h2 className="text-4xl text-white font-bold">LEARN JAPANESE 🎌</h2>
        <p className="text-xl text-gray-300 mt-4">
          Start your journey to mastering the Japanese vocabulary.
        </p>
      </div>
      <LessonCards lesson={result && result.data} />
    </GradientBg>
  );
}

export default LessonPage;
