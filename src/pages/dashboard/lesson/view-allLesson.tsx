import { TLessonList } from "@/app/(admin)/dashboard/(lesson-management)/view-all-lessons/page";
import { ViewAllLessonTable } from "./view-allLesson-table";

const ViewAllLesson = ({ lessonList }: { lessonList: TLessonList[] }) => {
  return (
    <div className="px-10">
      <div className="border p-1.5">
        <div className="px-1.5 pt-5 pb-8">
          <h2 className="text-xl font-bold">View All Lessons</h2>
          <p className="italic text-zinc-500">
            All lessons are be listed here available on database.
          </p>
        </div>
        <ViewAllLessonTable lessonList={lessonList} />
      </div>
    </div>
  );
};

export default ViewAllLesson;
