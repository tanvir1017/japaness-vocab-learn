"use client";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { ButtonProps, buttonVariants } from "../ui/button";

const ServerSubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
      >
        {children} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Comp>
    );
  }
);
ServerSubmitButton.displayName = "ServerSubmitButton";

export default ServerSubmitButton;
