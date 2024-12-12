import DashboardHeader from "@/components/dashboard-header";
import ViewAllLesson from "@/pages/dashboard/lesson/view-allLesson";

export type TLessonList = {
  _id: string;
  user: string;
  title: string;
  lessonNo: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type TLessonResponse = {
  success: boolean;
  message: string;
  data: TLessonList[];
};

const ViewAllLessonPage = async () => {
  // const lesson = await fetch(env.API_BASE_URL + APIeEndPoints.lesson);
  // const { data } = (await lesson.json()) as TLessonResponse;

  return (
    <DashboardHeader>
      <ViewAllLesson />
    </DashboardHeader>
  );
};

export default ViewAllLessonPage;
