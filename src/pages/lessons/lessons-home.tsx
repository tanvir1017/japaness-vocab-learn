"use client";
import { TLesson } from "@/app/(users)/lessons/page";
import HoverCard from "@/components/styled-components/hover-card";
import Link from "next/link";

function LessonCards({ lesson }: { lesson: TLesson[] }) {
  return (
    <div className="container border w-full h-screen pt-10">
      <div className="grid md:grid-cols-3 gap-3">
        {lesson.map((ls) => (
          <Link href={`/lessons/${ls.lessonNo}`} className="" key={ls._id}>
            <HoverCard lesson={ls} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LessonCards;
