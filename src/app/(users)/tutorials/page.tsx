import { APIeEndPoints } from "@/components/api/axios";
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
  return <TutorialCard tutorial={data} />;
  console.log("🚀 ~ TutorialPage ~ data:", data);
}

export default TutorialPage;
