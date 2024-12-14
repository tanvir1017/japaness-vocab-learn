"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  message?: string;
}

export default function ErrorPage({
  message = "No ovulary found",
}: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white/90 italic mb-8">
          {message}
        </h1>
        <Button
          onClick={() => router.back()}
          className="bg-[#4A9DFF]/10 hover:bg-[#4A9DFF]/20 text-[#4A9DFF] px-8 py-6 text-lg transition-all duration-200 hover:scale-105"
        >
          Go Back
        </Button>
      </motion.div>
    </div>
  );
}
