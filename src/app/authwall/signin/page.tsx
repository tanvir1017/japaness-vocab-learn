import { SigninForm } from "@/pages/auth-pages/signin/signin-form";
import { auth } from "auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <SigninForm />
    </div>
  );
}
