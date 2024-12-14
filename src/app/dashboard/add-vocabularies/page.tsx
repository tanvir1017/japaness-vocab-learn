import { BASE_URL } from "@/components/api/axios";
import DashboardHeader from "@/components/dashboard-header";
import { UserSession } from "@/pages/dashboard/lesson/add-lessons";
import AddVocabularies from "@/pages/dashboard/lesson/add-vocabularies";
import { auth } from "auth";

async function AddVocabulariesPage() {
  const session = await auth();
  if (!session?.user) return null;

  const res = await fetch(`${BASE_URL}/users/email/${session?.user?.email}`);
  const result = (await res.json()) as UserSession;
  return (
    <DashboardHeader>
      <AddVocabularies user={result} />
    </DashboardHeader>
  );
}

export default AddVocabulariesPage;
