import { BASE_URL } from "@/components/api/axios";
import DashboardHeader from "@/components/dashboard-header";
import ErrorPage from "@/components/styled-components/error-page";
import AddLesson, { UserSession } from "@/pages/dashboard/lesson/add-lessons";
import { auth } from "auth";

// bun .lo

const AddLessonPage = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const res = await fetch(`${BASE_URL}/users/email/${session?.user?.email}`);
  const result = (await res.json()) as UserSession;

  if (!result.success) {
    return <ErrorPage message={result.message} />;
  }

  return (
    <DashboardHeader>
      <AddLesson user={result} />
    </DashboardHeader>
  );
};

export default AddLessonPage;
