import { auth } from "auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session?.user) redirect("/authwall/signin");
  if (session?.user) redirect("/lessons");

  return (
    <div className="bg-primary h-screen flex flex-col items-center justify-center">
      <h1 className="bg-black text-primary  flex items-center justify-center text-xl font-bold p-10">
        redirecting...
      </h1>
    </div>
  );
};

export default Home;
