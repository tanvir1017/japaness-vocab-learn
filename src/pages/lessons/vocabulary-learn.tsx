"use client";

import ErrorPage from "@/components/styled-components/error-page";
import { PaginationWithLinks } from "@/components/styled-components/pagination-with-links";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePronounceWord } from "@/hooks/pronounce";
import { TMetaApiResponse } from "@/types/global";
import { ChevronRightIcon, Info, Languages, Mic, Volume2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "usehooks-ts";

const VocabularyLearn = ({
  result,
  currPage,
}: {
  currPage: number;
  result: TMetaApiResponse;
}) => {
  const router = useRouter();
  const { pronounceWord } = usePronounceWord();
  const { width = 0, height = 0 } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (showConfetti) {
      timeoutId = setTimeout(() => {
        router.push("/lessons");
      }, 5000);
    }
    return () => (timeoutId ? clearTimeout(timeoutId) : undefined);
  }, [showConfetti, router]);
  // const totalPages = result.data.meta.totalPage;
  if (!result?.data?.result.length) {
    return <ErrorPage />;
  }

  return (
    <div>
      {showConfetti ? (
        <Confetti width={width - 100} height={height - 100} />
      ) : null}
      {result?.data?.result.map((vocabLesson) => (
        <Card
          key={vocabLesson._id}
          className="backdrop-blur-xl bg-black/30 border-0 shadow-2xl"
        >
          <div className="p-6 md:p-8">
            {/* Japanese Word Section */}
            <div className="space-y-8">
              <div className="flex flex-col items-center space-y-6">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                  <Info className="w-4 h-4 mr-2" />
                  Word in Japanese
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
                  {vocabLesson.word}
                </h1>

                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => pronounceWord(vocabLesson.word)}
                    className="rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                  >
                    <Volume2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium">
                  <Info className="w-4 h-4 mr-2" />
                  Translate to
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
                  {vocabLesson.meaning}
                </h1>

                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                  >
                    <Languages className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Pronunciation Section */}
              <div className="flex flex-col items-center space-y-6 pt-8">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium">
                  <Mic className="w-4 h-4 mr-2" />
                  Pronunciation Guide
                </div>
                <h2 className="text-3xl md:text-4xl text-white/90 font-medium">
                  {vocabLesson.pronunciation}
                </h2>
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Usage Section */}
              <div className="flex flex-col items-center space-y-6 pt-8">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                  <Info className="w-4 h-4 mr-2" />
                  When to Use
                </div>
                <p className="text-xl text-white/80 text-center max-w-lg">
                  {vocabLesson.whenToSay}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
              {result.data.meta.countDocs !== currPage ? (
                <PaginationWithLinks
                  page={currPage}
                  pageSize={1}
                  totalCount={result.data.meta.countDocs}
                />
              ) : (
                <div className="flex items-center justify-between w-full">
                  <Button
                    size="lg"
                    disabled={result.data.meta.countDocs === currPage}
                    onClick={() => router.back()}
                    className="text-white/70 rounded-full"
                  >
                    Previous
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setShowConfetti(true)}
                    className="text-white bg-blue-500 rounded-full"
                  >
                    Complete <ChevronRightIcon />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VocabularyLearn;
