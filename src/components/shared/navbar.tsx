"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const ignoreRoute = [
  "/dashboard",
  "/authwall/signup",
  "/authwall/signin",
  "/dashboard/add-lessons",
  "/dashboard/add-vocabularies",
  "/dashboard/vocabulary-management",
  "/dashboard/promote-demote-user",
];
const Navbar = () => {
  const pathName = usePathname();

  if (ignoreRoute.includes(pathName || "/dashboard")) {
    return null;
  }
  return (
    <header className={cn("bg-primary sticky top-0 w-full")}>
      <nav className="container flex items-center justify-between  py-1">
        <ul className="">
          <li>
            <Link
              href={"/"}
              className=" block w-full h-full py-2 px-6 rounded-md hover:bg-black hover:text-primary"
            >
              <LayoutDashboard />
            </Link>
          </li>
        </ul>
        <ul className="flex items-center space-x-6">
          <li className="">
            <Link
              href={"/lessons"}
              className="bg-white block w-full h-full py-2 px-6 rounded-md hover:bg-black hover:text-primary"
            >
              Lessons
            </Link>
          </li>
          <li>
            <Link
              className="bg-white block w-full h-full py-2 px-6 rounded-md hover:bg-black hover:text-primary"
              href={"/tutorials"}
            >
              Tutorials
            </Link>
          </li>
          <li>
            <Link
              className="bg-white block w-full h-full py-2 px-6 rounded-md hover:bg-black hover:text-primary"
              href={"/authwall/signin"}
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              className="bg-white block w-full h-full py-2 px-6 rounded-md hover:bg-black hover:text-primary"
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
