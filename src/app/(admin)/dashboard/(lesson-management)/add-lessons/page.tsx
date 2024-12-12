import DashboardHeader from "@/components/dashboard-header";
import AddLesson, { UserSession } from "@/pages/dashboard/lesson/add-lessons";
import { auth } from "auth";

const AddLessonPage = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const res = await fetch(
    `${process.env.API_BASE_URL}/users/email/${session?.user?.email}`
  );
  const result = (await res.json()) as UserSession;

  return (
    <DashboardHeader>
      <AddLesson user={result} />
    </DashboardHeader>
  );
};

export default AddLessonPage;
