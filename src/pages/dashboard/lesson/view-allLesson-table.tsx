"use client";
import { TLessonList } from "@/app/(admin)/dashboard/(lesson-management)/view-all-lessons/page";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
import { AlertModal } from "@/components/modal-toast/alert-modal";
import { LessonEditDialog } from "@/components/modal-toast/lesson-edit-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";

type TResponseType = {
  message: string;
  success: boolean;
  data: TLessonList[];
};

const fetcher = (url: string) => axiosAPI.get(url);
export function ViewAllLessonTable() {
  const {
    data: lessonList,
    error,
    isLoading,
  } = useSWR(`${APIeEndPoints.base_url}${APIeEndPoints.lesson}`, fetcher);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
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
        {lessonList?.data &&
          lessonList?.data.data.map((lesson: TLessonList) => (
            <TableRow key={lesson._id}>
              <TableCell className="font-medium">{lesson.lessonNo}</TableCell>
              <TableCell className="">{lesson.title}</TableCell>
              <TableCell>3</TableCell>
              <TableCell className="text-right">
                <div className="space-x-2">
                  <LessonEditDialog lesson={lesson} />
                  <AlertModal />
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
