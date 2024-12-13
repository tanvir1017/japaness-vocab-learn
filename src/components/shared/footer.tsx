"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedText from "../styled-components/cursor-follow";

function Footer() {
  return (
    <>
      <footer
        className="footer-bg relative border 2xl:h-[550px] h-fit lg:pb-20 w-[95%] mx-auto mb-8 rounded-lg overflow-hidden radial-gradient-bg
                   [--gradient-center:#f3f4f6] [--gradient-edge:#f3f4f6]
                   dark:[--gradient-center:#02081765] dark:[--gradient-edge:#020817]"
      >
        <div className="gap-10 sm:flex justify-between p-5 2xl:py-10 py-5 dark:bg-[#4c61ff]   bg-blue-500 rounded-sm rounded-b-none text-white">
          <div className="w-fit flex-col  flex  justify-center">
            <div className="2xl:w-24 2xl:h-24 w-20 h-20 ml-3 bg-white  rounded-sm before:absolute relative before:w-full before:h-full before:bg-white/50  before:rounded-md before:-top-3 before:-left-3"></div>
            <article className="py-2  2xl:w-80 w-64  space-y-1">
              <h1 className="newFont text-3xl font-bold">Learn Japanese</h1>
              <p className="text-sm  leading-[120%] ">
                Learn Japanese effectively by mastering essential vocabulary.
                Our platform helps you build a strong foundation in the Japanese
                language through carefully curated word lists, making learning
                fun and engaging. Start your journey to fluency today!
              </p>
            </article>
          </div>

          <div className="sm:block flex sm:mt-0 mt-4  gap-2 sm:w-auto w-full sm:space-y-2 relative z-[1]">
            <ul>
              <Link href={"/lessons"}>
                <li className="text-2xl mb-2 hover:underline transition-all duration-300 flex  items-center">
                  Home
                  <ArrowRight className="ml-2" />
                </li>
              </Link>
              <Link href={"/tutorials"}>
                <li className="text-2xl mb-2 hover:underline transition-all duration-300 flex items-center">
                  Tutorials
                  <ArrowRight className="ml-2" />
                </li>
              </Link>
              <li className="text-2xl mb-2 hover:underline transition-all duration-300 flex items-center">
                Dashboard
                <ArrowRight className="ml-2" />
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:flex hidden">
          <AnimatedText
            text="Learn Japanese"
            className="2xl:text-[11rem] text-[12vw]"
          />
        </div>
      </footer>
    </>
  );
}

export default Footer;
