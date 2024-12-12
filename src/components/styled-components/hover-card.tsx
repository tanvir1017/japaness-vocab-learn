"use client";
import { APIeEndPoints } from "@/api/axios";
// https://cruip-tutorials.vercel.app/cards-hover-effect/
import { TLesson } from "@/app/(users)/lessons/page";
import { fetcher } from "@/lib/fetcher";
import { getNestedData } from "@/lib/getNestedData";
import { AxiosResponse } from "axios";
import Image from "next/image";
import useSWR from "swr";

function HoverCard({ lesson }: { lesson: TLesson }) {
  const { data, isLoading, error } = useSWR(
    `${APIeEndPoints.vocabulary}/${lesson._id}/vocab-list`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load data</div>;

  const vocabList = getNestedData(data as AxiosResponse);

  return (
    <>
      <div className="w-full max-w-[422px] mx-auto [background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border ">
        <div className="relative text-center z-10 px-0 py-16 rounded-2xl  w-fit  h-full mx-auto">
          <>
            <Image
              src={"/images/video-thumbnail.jpg"}
              alt="grid"
              width={600}
              className="mx-auto w-[85%]"
              height={600}
            />
            <h1 className="text-xl font-semibold tracking-tight text-white">
              {lesson.title}
            </h1>
            <div className="text-white font-bold">
              Total Vocabulary {vocabList.data}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default HoverCard;
