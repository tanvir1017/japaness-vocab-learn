"use client";
import { getYouTubeVideoId } from "@/lib/getYTVideoID";
import YouTube from "react-youtube";

const YoutubeVideo = ({ url }: { url: string }) => {
  const opts = {
    height: "500",
    width: "850",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: any) => {
    event.target.pauseVideo();
  };

  const videoId = getYouTubeVideoId(url as string);

  return (
    <div>
      <YouTube videoId={videoId as string} opts={opts} onReady={onReady} />
    </div>
  );
};

export default YoutubeVideo;
