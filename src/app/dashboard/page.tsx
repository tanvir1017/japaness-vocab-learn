import DashboardHeader from "@/components/dashboard-header";
import ButtonHover from "@/components/styled-components/button-hover";
import GradientBg from "@/components/styled-components/gradient-bg";
import { SidebarInset } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <SidebarInset>
      <DashboardHeader>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <GradientBg className="h-[220px] p-10 rounded-2xl">
              <div className="">
                <h1 className="text-2xl font-semibold">Add Lessons</h1>
                <p className="text-sm mb-5">
                  Admins can create, edit, and manage lessons to provide users
                  with updated and structured learning materials.
                </p>
                <ButtonHover
                  buttonText="Go Add Lesson Page"
                  link="/dashboard/add-lessons"
                />
              </div>
            </GradientBg>{" "}
            <GradientBg className="h-[220px] p-10 rounded-2xl">
              <div className="">
                <h1 className="text-2xl font-semibold">Add Vocabulary</h1>
                <p className="text-sm mb-5">
                  Admins can add, edit, and organize vocabulary lessons to help
                  users expand their language skills effectively.
                </p>

                <ButtonHover
                  buttonText="Go Add Vocabulary Page"
                  link="/dashboard/add-vocabularies"
                />
              </div>
            </GradientBg>{" "}
            <GradientBg className="h-[220px] p-10 rounded-2xl">
              <div className="">
                <h1 className="text-2xl font-semibold">Add Tutorials</h1>
                <p className="text-sm mb-5">
                  Admins can create, edit, and manage tutorials to provide users
                  with updated and structured learning materials.
                </p>
                <ButtonHover
                  buttonText="Go Add Lesson Page"
                  link="/dashboard/view-all-tutorials"
                />
              </div>
            </GradientBg>{" "}
            <GradientBg className="h-[220px] p-10 rounded-2xl">
              <div className="">
                <h1 className="text-2xl font-semibold">Promote / Demote</h1>
                <p className="text-sm mb-5">
                  Admins can promote users to higher roles or demote them to
                  standard users.
                </p>

                <ButtonHover
                  buttonText="Go user management"
                  link="/dashboard/view-all-users"
                />
              </div>
            </GradientBg>{" "}
          </div>
        </div>
      </DashboardHeader>
    </SidebarInset>
  );
};

export default Page;
