import { auth } from "auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  console.log("🚀 ~ Home ~ session:", session?.user);
  if (!session?.user) redirect("/authwall/signin");

  return (
    <div className="bg-primary h-screen flex flex-col items-center justify-center">
      <h1 className="bg-black text-primary  flex items-center justify-center text-xl font-bold p-10">
        This is a Home Component
      </h1>
    </div>
  );
};

export default Home;
