"use client";
import { APIeEndPoints, axiosAPI } from "@/api/axios";
import { TLessonList } from "@/app/(admin)/dashboard/(lesson-management)/view-all-lessons/page";
import { AlertModal } from "@/components/modal-toast/alert-modal";
import { VocabEditDialog } from "@/components/modal-toast/vocab-edit-modal";
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

export type TVocabulary = {
  _id: string;
  isDeleted: boolean;
  lesson: TLessonList;
  meaning: string;
  pronunciation: string;
  user: string;
  whenToSay: string;
  word: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const fetcher = (url: string) => axiosAPI.get(url);
export function VocabularyManagementTable() {
  const {
    data: vocabularies,
    error,
    isLoading,
  } = useSWR(APIeEndPoints.vocabulary, fetcher);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Word</TableHead>
          <TableHead>Meaning</TableHead>
          <TableHead>Pronunciation</TableHead>
          <TableHead>When To Say</TableHead>
          <TableHead>Lesson No</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vocabularies?.data &&
          vocabularies?.data.data.map((vocab: TVocabulary) => (
            <TableRow key={vocab._id}>
              <TableCell className="font-medium">{vocab.word}</TableCell>
              <TableCell className="">{vocab.meaning}</TableCell>
              <TableCell className="">{vocab.pronunciation}</TableCell>
              <TableCell className="">{vocab.whenToSay}</TableCell>
              <TableCell className="">{vocab.lesson.lessonNo}</TableCell>
              <TableCell className="text-right">
                <div className="space-x-2">
                  <VocabEditDialog vocab={vocab} />
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
