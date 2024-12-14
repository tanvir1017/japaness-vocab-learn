import React from "react";

interface GradientBgProps {
  children: React.ReactNode; // the child components to render within the gradient background
}

const GradientBg = ({ children }: GradientBgProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      {children}
    </div>
  );
};

export default GradientBg;
