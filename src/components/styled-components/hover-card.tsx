"use client";

import { APIeEndPoints } from "@/components/api/axios";
import { fetcher } from "@/lib/fetcher";
import { getNestedData } from "@/lib/getNestedData";
import { TLesson } from "@/types/global";
import { AxiosResponse } from "axios";
import { Book } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import mash from "../../assets/images/mash.png";
import { Button } from "../ui/button";

export const getVocabCount = (lessonId: string) => {
  const { data, isLoading, error } = useSWR(
    `${APIeEndPoints.vocabulary}/${lessonId}/vocab-list`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
};

function HoverCard({ lesson }: { lesson: TLesson }) {
  const { data, isLoading, error } = getVocabCount(lesson._id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  const vocabList = getNestedData(data as AxiosResponse);

  return (
    <>
      <div className="w-full max-w-[422px] mx-auto [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border">
        <div className="relative text-center z-10 px-0 pt-12 rounded-2xl  w-fit  h-full mx-auto">
          <>
            <Image
              src={mash}
              alt="A mash gradient thumbnail"
              width={600}
              className="mx-auto w-[85%] rounded-xl"
              height={600}
            />
            <div className="my-6 text-left px-6">
              <h1 className="text-xl font-semibold tracking-tight text-white mb-2">
                {lesson.title}
              </h1>
              <div className="text-white">
                Total Vocabulary: {vocabList.data}
              </div>

              <div className="mt-4">
                <Button className="rounded-full" variant="secondary">
                  <Book className="size-4" />
                  Take Lesson
                </Button>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default HoverCard;
