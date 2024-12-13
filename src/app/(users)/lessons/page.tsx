import { APIeEndPoints } from "@/components/api/axios";
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
  const res = await fetch(process.env.API_BASE_URL + APIeEndPoints.lesson);
  const result = (await res.json()) as LessonApiResponse;

  return <LessonCards lesson={result && result.data} />;
}

export default LessonPage;
