import DashboardHeader from "@/components/dashboard-header";
import { SidebarInset } from "@/components/ui/sidebar";

const Page = () => {
  return (
    <SidebarInset>
      <DashboardHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-primary/80 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Add Lessons</h1>
          </div>
          <div className="aspect-video rounded-xl bg-primary/80 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Add Lessons</h1>
          </div>
          <div className="aspect-video rounded-xl bg-primary/80 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Add Lessons</h1>
          </div>
          <div className="aspect-video rounded-xl bg-primary/80 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Add Lessons</h1>
          </div>
          <div className="aspect-video rounded-xl bg-primary/80 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Add Lessons</h1>
          </div>
          <div className="aspect-video rounded-xl bg-primary/80 flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Add Lessons</h1>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default Page;
