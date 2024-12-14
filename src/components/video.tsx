"use client";
import { getYouTubeVideoId } from "@/lib/getYTVideoID";
import YouTube from "react-youtube";

const YoutubeVideo = ({ url }: { url: string }) => {
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: any) => {
    event.target.pauseVideo();
  };

  const videoId = getYouTubeVideoId(url as string);

  return <YouTube videoId={videoId as string} opts={opts} onReady={onReady} />;
};

export default YoutubeVideo;
