"use client";
import { TTutorialDataType } from "@/types/global";
import Image from "next/image";
import natureImageJapan from "../../assets/images/nature.jpeg";
import { APIeEndPoints } from "../api/axios";
import { AlertModal } from "../modal-toast/alert-modal";
import { PlayVideoModal } from "../modal-toast/play-video-modal";
import { TutorialEditModal } from "../modal-toast/tutorial-edit-modal";

export function VideoHoverAbleCard({
  tutorial,
  isHoverAble = true,
}: {
  tutorial: TTutorialDataType;
  isHoverAble?: boolean;
}) {
  return (
    <>
      <div className="w-[90%] group mx-auto dark:bg-[#252525] p-2 bg-white dark:border-0 border overflow-hidden rounded-md dark:text-white text-black">
        <figure className="w-full h-80 group-hover:h-72 transition-all duration-300 dark:bg-[#0a121a] bg-[#f0f5fa] p-2 rounded-md relative overflow-hidden">
          <div
            style={{
              background:
                "linear-gradient(123.9deg, #0B65ED 1.52%, rgba(0, 0, 0, 0) 68.91%)",
            }}
            className="absolute top-0 left-0 w-full h-full  group-hover:opacity-100 opacity-0  transition-all duration-300"
          ></div>
          <Image
            src={natureImageJapan}
            alt="an anime boy reading or learning japanese"
            width={600}
            height={600}
            className="absolute -bottom-1 group-hover:-bottom-5 right-0 h-64 w-[80%] group-hover:border-4 border-4 group-hover:border-[#76aaf82d] rounded-lg object-cover transition-all duration-300"
          />
        </figure>
        <article className="px-4 pt-4 space-y-2">
          <PlayVideoModal title={tutorial.title} url={tutorial.url} />
          <h1 className="text-xl font-semibold capitalize text-ellipsis">
            {tutorial.title}
          </h1>

          {isHoverAble && (
            <div className="text-base dark:text-white text-blue-600 font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1  transition-all duration-300  ">
              <div className="flex items-center gap-2">
                <TutorialEditModal tutorial={tutorial} />
                <AlertModal
                  mainPathWithItemId={`${APIeEndPoints.tutorial}/${tutorial._id}`}
                  revalidationPath={APIeEndPoints.tutorial}
                />
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  );
}
