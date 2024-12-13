export default function VideoComponent({
  src,
  title,
}: {
  title: string;
  src: string;
}) {
  const videoId = src.split("v=")[1]?.split("&")[0]; // Extract video ID
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      className="aspect-video w-full"
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
