"use client";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getNestedData } from "@/lib/getNestedData";
import { AxiosResponse } from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axiosAPI.get(url);

export function LessonSelect({
  currentLesson,
  handleSelectChange,
}: {
  handleSelectChange?: (id: string) => void;
  currentLesson?: string;
}) {
  const { data, error, isLoading } = useSWR(
    APIeEndPoints.lesson + "/list",
    fetcher
  );
  const lessonList = getNestedData(data as AxiosResponse);

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={currentLesson || "Select a lesson"}
        ></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Lesson List</SelectLabel>

          {!isLoading &&
            lessonList?.data.map(
              (lesson: { _id: string; lessonNo: string }) => (
                <SelectItem
                  className="w-full"
                  key={lesson._id}
                  value={lesson._id || ""}
                  defaultValue={lesson.lessonNo || ""}
                >
                  {lesson.lessonNo}
                </SelectItem>
              )
            )}

          {isLoading && (
            <SelectItem value="loading..." aria-disabled={isLoading}>
              Loading...
            </SelectItem>
          )}
          {error && (
            <SelectItem
              value="something went wrong!"
              aria-disabled={isLoading}
              className="text-red-600"
            >
              error occurred
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
