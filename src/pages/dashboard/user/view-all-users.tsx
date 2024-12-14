import { SessionProvider } from "next-auth/react";
import ViewAllUserTable from "./view-all-user-table";

const ViewAllUsersComponent = () => {
  return (
    <SessionProvider>
      <div className="px-10">
        <div className="border">
          <div className="px-2.5 pt-5 pb-8">
            <h2 className="text-xl font-bold">View All Available users</h2>
            <p className="italic text-zinc-500">
              All user are listed here available on database.
            </p>
          </div>
        </div>

        <ViewAllUserTable />
      </div>
    </SessionProvider>
  );
};

export default ViewAllUsersComponent;
