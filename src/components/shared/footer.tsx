"use client";

import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathName = usePathname();
  if (pathName?.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className="bg-gradient-to-t from-black to-[#020817]  text-gray-300">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col items-center justify-between space-y-8 lg:flex-row lg:space-y-0">
          <div className="flex flex-col items-center lg:items-start space-y-4 lg:w-1/3">
            <h2 className="text-2xl font-bold text-gray-100">
              Connect With Us
            </h2>
            <p className="text-center lg:text-left text-gray-400">
              Join our community and stay updated with the latest news and
              offers.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 lg:w-1/3">
            <Link
              href="https://twitter.com/tanvi1017"
              className="group"
              target="_blank"
              aria-label="X (Twitter)"
            >
              <div className="bg-blue-600 p-3 rounded-full transition-all duration-200 group-hover:scale-110 group-hover:bg-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                <Twitter className="h-6 w-6 text-white" />
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/in/tanvir1017/"
              className="group"
              target="_blank"
              aria-label="LinkedIn"
            >
              <div className="bg-blue-800 p-3 rounded-full transition-all duration-200 group-hover:scale-110 group-hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-700/50">
                <Linkedin className="h-6 w-6 text-white" />
              </div>
            </Link>
            <Link
              href="https://github.com/tanvir1017?tab=repositories"
              className="group"
              target="_blank"
              aria-label="GitHub"
            >
              <div className="bg-gray-700 p-3 rounded-full transition-all duration-200 group-hover:scale-110 group-hover:bg-gray-600 group-hover:shadow-lg group-hover:shadow-gray-600/50">
                <Github className="h-6 w-6 text-white" />
              </div>
            </Link>
          </div>
          <div className="lg:w-1/3 text-center lg:text-right">
            <p className="text-sm text-gray-400">
              &copy; 2024 Design & Developed By{" "}
              <Link
                target="_blank"
                href="https://github.com/tanvir1017?tab=repositories"
                className="underline"
              >
                Tanvir
              </Link>
            </p>
            <p className="text-sm text-gray-400 mt-1">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WaveSeparator() {
  return (
    <div className="w-full overflow-hidden">
      <svg
        className="relative block w-full h-[60px] sm:h-[100px] lg:h-[120px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-[#1c3478]"
        ></path>
      </svg>
    </div>
  );
}

export default Footer;
