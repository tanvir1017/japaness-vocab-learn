import GradientBg from "@/components/styled-components/gradient-bg";
import TutorialCard from "@/pages/tutorial/tutorial-card";

function TutorialPage() {
  return (
    <GradientBg className="p-4 md:p-8 min-h-screen">
      <div className="mb-20 text-center mt-20">
        <h2 className="text-2xl md:text-4xl text-white font-bold">
          LEARN JAPANESE BY TUTORIALS
        </h2>
        <p className="text-base md:text-xl text-gray-300 mt-4 max-w-xl mx-auto">
          Discover and follow expert Japanese language tutors to help you grow
          your Japanese skills.
        </p>
      </div>
      <div className="container">
        <TutorialCard />
      </div>
    </GradientBg>
  );
}

export default TutorialPage;
