"use client";
import Link from "next/link";

import ServerSubmitButton from "@/components/styled-components/server-submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";

import type { SignInResponse } from "next-auth/react";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TSignInInputs = {
  email: string;
  password: string;
};
export function SigninForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { register, handleSubmit } = useForm<TSignInInputs>();

  async function autSignIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const callbackUrl = searchParams && searchParams.get("callbackUrl");
    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res: SignInResponse | undefined) => {
      if (!res) {
        toast("No response!");
        return;
      }
      if (!res.ok) alert("Something went wrong!");
      else if (res.error) {
        console.log("🚀 ~ SigninForm ~ res:", res);
        if (res.error == "CallbackRouteError")
          toast("Could not login! Please check your credentials.");
        else toast(`Internal Server Error: ${res.error}`);
      } else {
        if (callbackUrl) router.push(callbackUrl as any);
        else router.push("/");
      }
    });
  }

  const handleOnSubmitForm: SubmitHandler<TSignInInputs> = async (data) => {
    console.log(data);
    await autSignIn({ email: data.email, password: data.password });
  };

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleOnSubmitForm)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email", { required: true })}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/authwall/forget-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                {...register("password", { required: true })}
                type="password"
              />
            </div>
            <ServerSubmitButton>Sign in</ServerSubmitButton>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/authwall/signup" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
