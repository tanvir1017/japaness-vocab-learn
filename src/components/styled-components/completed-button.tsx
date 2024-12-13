"use client";
import { useState } from "react";
import Confetti from "../confettin-component";
import { Button } from "../ui/button";

interface CompletedButtonProps {}

const CompletedButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setIsVisible((prev) => !prev)}>Completed</Button>
      {isVisible && <Confetti />}
    </>
  );
};

export default CompletedButton;
