"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { BookOpen, LogIn, LogOut, Menu, Video } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    label: "Lessons",
    href: "/lessons",
    icon: BookOpen,
  },
  {
    label: "Tutorials",
    href: "/tutorials",
    icon: Video,
  },
];

export default function NavigationCenter({
  isLoggedIn,
}: {
  isLoggedIn: User | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname?.startsWith("/dashboard")) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-l  backdrop-blur-xl border-b border-white/5 ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            日本語
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-[#4A9DFF]/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <item.icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoggedIn && (
              <Button
                onClick={() => {
                  router.push("/authwall/signin");
                }}
                variant="ghost"
                className="bg-[#4A9DFF]/10 text-white hover:bg-[#4A9DFF]/20 rounded-full"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}

            {isLoggedIn && (
              <Button
                onClick={async () => {
                  await signOut();
                  router.push("/authwall/signin");
                }}
                className="bg-[#4A9DFF]/10 text-white hover:bg-[#4A9DFF]/20 rounded-full"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/70 hover:text-white hover:bg-white/5"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 bg-[#1B2342]/95 backdrop-blur-xl border-white/5"
            >
              <DialogTitle className="sr-only">Sidebar for navbar</DialogTitle>
              <div className="flex flex-col gap-6 mt-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${
                          isActive
                            ? "bg-[#4A9DFF]/10 text-[#4A9DFF]"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <item.icon
                        className={`w-4 h-4 ${
                          isActive ? "text-[#4A9DFF]" : "text-white/70"
                        }`}
                      />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="flex flex-col gap-2 mt-4">
                  {!isLoggedIn && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start bg-[#4A9DFF]/10 text-white rounded-full hover:bg-[#4A9DFF]/20"
                      onClick={() => router.push("/authwall/signin")}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  )}
                  {isLoggedIn && (
                    <Button
                      className="w-full justify-start bg-[#4A9DFF]/10 text-white rounded-full hover:bg-[#4A9DFF]/20"
                      onClick={async () => {
                        await signOut();
                        router.push("/authwall/signin");
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
