import DashboardHeader from "@/components/dashboard-header";
import ViewAllUsersComponent from "@/pages/dashboard/user/view-all-users";

interface PageProps {}

const ViewAllUsersPage = () => {
  return (
    <DashboardHeader>
      <ViewAllUsersComponent />
    </DashboardHeader>
  );
};

export default ViewAllUsersPage;
