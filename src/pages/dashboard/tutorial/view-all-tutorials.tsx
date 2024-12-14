"use client";
import { APIeEndPoints } from "@/components/api/axios";
import { VideoHoverAbleCard } from "@/components/styled-components/video-card-hoverable";
import { fetcher } from "@/lib/fetcher";
import { getNestedData } from "@/lib/getNestedData";
import { TTutorialDataType } from "@/types/global";
import { AxiosResponse } from "axios";
import useSWR from "swr";

const ViewAllTutorialsComponent = () => {
  const { data, error, isLoading } = useSWR(APIeEndPoints.tutorial, fetcher);

  const tutorials = getNestedData(data as AxiosResponse);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
    <div className="px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 w-full">
        {tutorials.data.length ? (
          tutorials.data.map((tutorial: TTutorialDataType) => (
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
