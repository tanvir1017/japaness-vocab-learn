"use client";
import { APIeEndPoints } from "@/components/api/axios";
import { VideoHoverAbleCard } from "@/components/styled-components/video-card-hoverable";
import { fetcher } from "@/lib/fetcher";
import { getNestedData } from "@/lib/getNestedData";
import { AxiosResponse } from "axios";
import useSWR from "swr";

export type TutorialApiResponse = {
  createdAt: string;
  title: string;
  updatedAt: string;
  url: string;
  __v: number;
  _id: string;
};

const ViewAllTutorialsComponent = () => {
  const { data, error, isLoading } = useSWR(APIeEndPoints.tutorial, fetcher);

  const tutorials = getNestedData(data as AxiosResponse);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div className="px-10">
      <div className="grid  grid-cols-1 md:grid-cols-3 ">
        {tutorials.data.length ? (
          tutorials.data.map((tutorial: TutorialApiResponse) => (
            <VideoHoverAbleCard tutorial={tutorial} key={tutorial._id} />
          ))
        ) : (
          <p>No tutorial found</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllTutorialsComponent;
