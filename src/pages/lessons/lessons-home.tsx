"use client";

import HoverCard from "@/components/styled-components/hover-card";
import { TLesson } from "@/types/global";
import Link from "next/link";

function LessonCards({ lesson }: { lesson: TLesson[] }) {
  return (
    <div className="container w-full min-h-screen">
      <div className="grid md:grid-cols-3 gap-3">
        {lesson &&
          lesson?.length &&
          lesson?.map((ls) => (
            <Link href={`/lessons/${ls.lessonNo}`} className="" key={ls._id}>
              <HoverCard lesson={ls} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default LessonCards;
