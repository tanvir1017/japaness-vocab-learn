"use client";

import { TLessonList } from "@/app/dashboard/view-all-lessons/page";
import { APIeEndPoints } from "@/components/api/axios";
import { AlertModal } from "@/components/modal-toast/alert-modal";
import { LessonEditDialog } from "@/components/modal-toast/lesson-edit-modal";
import { getVocabCount } from "@/components/styled-components/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";
import { getNestedData } from "@/lib/getNestedData";
import { AxiosResponse } from "axios";
import useSWR from "swr";

type TResponseType = {
  message: string;
  success: boolean;
  data: TLessonList[];
};
export default function ViewAllLessonTable() {
  const {
    data: lessonList,
    error,
    isLoading,
  } = useSWR(`${APIeEndPoints.lesson}`, fetcher);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  const getLesson = getNestedData(lessonList as AxiosResponse);

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
        {getLesson?.data &&
          getLesson.data.map((lesson: TLessonList) => {
            return (
              <TableRow key={lesson._id}>
                <TableCell className="font-medium">{lesson.lessonNo}</TableCell>
                <TableCell className="">{lesson.title}</TableCell>
                <VocabularyTotal id={lesson._id} />
                <TableCell className="text-right">
                  <div className="space-x-2">
                    <LessonEditDialog lesson={lesson} />
                    <AlertModal
                      mainPathWithItemId={`${APIeEndPoints.lesson}/${lesson._id}`}
                      revalidationPath={APIeEndPoints.lesson}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export function VocabularyTotal({ id }: { id: string }) {
  const { data, isLoading, error } = getVocabCount(id);

  if (isLoading) return <TableCell>Loading...</TableCell>;

  if (error) return <TableCell>Failed to load data</TableCell>;

  const vocabList = getNestedData(data as AxiosResponse);
  return <TableCell>{vocabList.data || 0}</TableCell>;
}
