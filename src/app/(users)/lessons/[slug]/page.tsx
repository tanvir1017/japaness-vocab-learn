import { APIeEndPoints } from "@/components/api/axios";
import BgCommon from "@/components/styled-components/bg-border";
import CompletedButton from "@/components/styled-components/completed-button";
import { PaginationWithLinks } from "@/components/styled-components/pagination-with-links";
import { Info } from "lucide-react";
import Image from "next/image";

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

  return (
    <div className="container px-0 w-full h-screen border">
      <BgCommon>
        <div className="bg-blue-300/5 backdrop-filter rounded-lg p-4">
          {result?.data?.result.map((d) => (
            <div key={d._id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <div className="border bg-[#020817] size-64 w-full  rounded-lg p-5 flex items-center justify-center relative">
                  <div className="bg-white p-1 rounded-lg absolute bottom-0 right-0">
                    <Image
                      src="/images/wave-sound.png"
                      width={100}
                      height={100}
                      className="rounded-lg"
                      alt={`Pronunciation of ${d.word}`}
                    />
                  </div>
                  <div>
                    <div className="bg-primary rounded-full p-1 text-center flex items-center space-x-3 pr-5 pl-2 text-zinc-300">
                      <Info className="mr-2"></Info>
                      Word in japanese
                    </div>
                    <h4 className="text-4xl mt-2">{d.word}</h4>
                  </div>
                </div>
                <div className="border bg-[#020817] size-64 w-full  rounded-lg p-5 flex items-center justify-center relative">
                  <div className="bg-white p-1 rounded-lg absolute left-0 bottom-0">
                    <Image
                      src="/images/translate.png"
                      width={100}
                      height={100}
                      className="rounded-lg"
                      alt={`Pronunciation of ${d.word}`}
                    />
                  </div>
                  <div className="text-center">
                    <div className="bg-primary rounded-full p-1 text-center flex items-center space-x-3 pr-5 pl-2 text-zinc-300">
                      <Info className="mr-2"></Info>
                      Translate to
                    </div>
                    <h4 className="text-4xl mt-2">{d.meaning}</h4>
                  </div>
                </div>
                <div className="border bg-[#020817] size-64 w-full rounded-lg p-5 flex items-center justify-center relative">
                  <div className="bg-white p-1 rounded-lg absolute top-0 right-0">
                    <Image
                      src="/images/voice.png"
                      width={100}
                      height={100}
                      className="rounded-lg"
                      alt={`Pronunciation of ${d.word}`}
                    />
                  </div>
                  <div className="text-center">
                    <div className="bg-primary rounded-full p-1 text-center flex items-center space-x-3 pr-5 pl-2 text-zinc-300">
                      <Info className="mr-2"></Info>
                      To Pronoun like
                    </div>
                    <h4 className="text-4xl mt-2">{d.pronunciation}</h4>
                  </div>
                </div>
                <div className="border bg-[#020817] size-64 w-full rounded-lg p-5 flex items-center justify-center relative">
                  <div className="bg-white p-1 rounded-lg absolute top-0 left-0">
                    <Image
                      src="/images/easy-to-use.png"
                      width={100}
                      height={100}
                      className="rounded-lg"
                      alt={`Pronunciation of ${d.word}`}
                    />
                  </div>
                  <div className="text-center">
                    <div className="bg-primary rounded-full p-1 text-center flex items-center space-x-3 pr-5 pl-2 text-zinc-300">
                      <Info className="mr-2"></Info>
                      When should you use it
                    </div>
                    <h4 className="text-2xl mt-2">{d.whenToSay}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <PaginationWithLinks
          page={currPage}
          pageSize={1}
          totalCount={result.data.meta.countDocs}
        />

        {result.data.meta.countDocs === currPage && <CompletedButton />}
      </BgCommon>
    </div>
  );
}
