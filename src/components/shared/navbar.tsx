"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationData } from "../app-sidebar";

const ignorePathName = (arrIndex: number) => {
  return navigationData.navMain[arrIndex].items.map((item) => item?.url);
};
const ignoreRoute = [
  ...ignorePathName(0),
  ...ignorePathName(1),
  ...ignorePathName(2),
  "/dashboard",
  "/authwall/signup",
  "/authwall/signin",
  "/authwall/forget-password",
];

const Navbar = () => {
  const pathName = usePathname();

  if (ignoreRoute.includes(pathName || "/dashboard")) {
    return null;
  }
  return (
    <header className={cn(" sticky top-0 z-20")}>
      <nav className="container bg-[#1d273a] flex items-center justify-between py-1.5">
        <ul className="">
          <li>
            <Link
              href={"/"}
              className=" block w-full h-full py-2 px-6 rounded-md "
            >
              <LayoutDashboard />
            </Link>
          </li>
        </ul>
        <ul className="flex items-center space-x-6">
          <li className="">
            <Link
              href={"/lessons"}
              className="hover:tracking-wider duration-200 transition-all block w-full h-full py-2 px-6 rounded-md"
            >
              Lessons
            </Link>
          </li>
          <li>
            <Link
              className="hover:tracking-wider duration-200 transition-all block w-full h-full py-2 px-6 rounded-md"
              href={"/tutorials"}
            >
              Tutorials
            </Link>
          </li>
          <li>
            <Link
              className="hover:tracking-wider duration-200 transition-all block w-full h-full py-2 px-6 rounded-md"
              href={"/authwall/signin"}
            >
              Sign in
            </Link>
          </li>
          <button onClick={() => signOut()}>Sign Out</button>
          <li>
            <Link
              className="hover:tracking-wider duration-200 transition-all block w-full h-full py-2 px-6 rounded-md"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
