import { TLessonList } from "@/app/(admin)/dashboard/(lesson-management)/view-all-lessons/page";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

export function ViewAllLessonTable({
  lessonList,
}: {
  lessonList: TLessonList[];
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Lesson Number</TableHead>
          <TableHead>Lesson Title</TableHead>
          <TableHead>Vocab Count</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lessonList.map((lesson) => (
          <TableRow key={lesson._id}>
            <TableCell className="font-medium">{lesson.lessonNo}</TableCell>
            <TableCell className="">{lesson.title}</TableCell>
            <TableCell>3</TableCell>
            <TableCell className="text-right">
              <div>
                <Button className="text-xs font-medium text-white ">
                  <Pencil /> Edit
                </Button>
                <Button className="bg-red-500 ml-2 text-xs font-medium text-white ">
                  <Trash></Trash>Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">3</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
