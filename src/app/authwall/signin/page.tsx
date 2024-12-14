import SigninForm from "@/pages/auth-pages/signin/signin-form";
import { auth } from "auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <SigninForm />
    </div>
  );
}
