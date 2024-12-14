import { cn } from "@/lib/utils";
import React from "react";

interface GradientBgProps {
  children: React.ReactNode; // the child components to render within the gradient background
  className?: string;
}

const GradientBg = ({ children, className }: GradientBgProps) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GradientBg;
