import { auth } from "auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  if (!session?.user) redirect("/authwall/signin");
  if (session?.user.role !== "admin") {
    return redirect("/lessons");
  } else {
    return redirect("/dashboard");
  }
};

export default Home;
