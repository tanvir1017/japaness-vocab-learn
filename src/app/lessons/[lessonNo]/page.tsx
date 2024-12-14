import { APIeEndPoints } from "@/components/api/axios";
import VocabularyLearn from "@/pages/lessons/vocabulary-learn";
import { TMetaApiResponse } from "./sf";

type Params = Promise<{ lessonNo: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function LanguageCard(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 7;

  const lessonNo = (await props.params).lessonNo;
  const searchParams = await props.searchParams;

  const currPage = Number(searchParams.page) || 1;
  const res = await fetch(
    `${process.env.API_BASE_URL}${APIeEndPoints.vocabulary}/${lessonNo}/lesson-based?page=${currPage}`
  );
  const result = (await res.json()) as TMetaApiResponse;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto mt-20">
        <VocabularyLearn currPage={currPage} result={result} />
      </div>
    </div>
  );
}
