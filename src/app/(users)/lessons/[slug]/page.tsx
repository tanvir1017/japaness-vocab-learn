import { APIeEndPoints } from "@/api/axios";
import { PaginationWithLinks } from "@/components/styled-components/pagination-with-links";

type TLesson = {
  _id: string;
  user: string;
  title: string;
  lessonNo: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TVocabulary = {
  _id: string;
  user: string;
  lesson: TLesson;
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TMetaApiResponse = {
  data: {
    success: boolean;
    message: string;
    meta: { totalPage: number; countDocs: number; page: number; limit: number };
    result: TVocabulary[];
  };
};

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const slug = (await props.params).slug;
  const searchParams = await props.searchParams;

  const currPage = Number(searchParams.page) || 1;
  const res = await fetch(
    `${
      process.env.API_BASE_URL + APIeEndPoints.vocabulary
    }/${slug}/lesson-based?page=${currPage}`
  );
  const result = (await res.json()) as TMetaApiResponse;
  console.log("🚀 ~ result:", result.data.result);
  return (
    <div className="container w-full h-screen border">
      <div className="h-full w-full rounded-lg dark:bg-[#020101] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] overflow-hidden pt-8 p-8">
        {result.data.result.map((d) => (
          <div key={d._id}>
            {d.word}
            {d.meaning}
          </div>
        ))}
      </div>

      <PaginationWithLinks
        page={currPage}
        pageSize={1}
        totalCount={result.data.meta.countDocs}
      />
    </div>
  );
}
