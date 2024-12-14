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

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import type { SignInResponse } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TSignInInputs = {
  email: string;
  password: string;
};
export default function SigninForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm<TSignInInputs>();

  async function autSignIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setLoading(true);
    const callbackUrl = searchParams && searchParams.get("callbackUrl");
    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res: SignInResponse | undefined) => {
      if (!res) {
        toast("No response!");
        setLoading((prev) => !prev);
        return;
      }
      if (!res.ok) {
        toast("Something went wrong!");
        setLoading((prev) => !prev);
      } else if (res.error) {
        if (res.error == "CallbackRouteError") {
          toast("Could not login! Please check your credentials.");
          setLoading((prev) => !prev);
        } else {
          toast(`Internal Server Error: ${res.error}`);
          setLoading((prev) => !prev);
        }
      } else {
        if (callbackUrl) router.push(callbackUrl as any);
        else {
          setLoading((prev) => !prev);
          router.push("/lessons");
        }
      }
    });
  }

  const handleOnSubmitForm: SubmitHandler<TSignInInputs> = async (data) => {
    await autSignIn({ email: data.email, password: data.password });
  };

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader>
        <div className=" p-4 rounded-md bg-blue-500/10 text-blue-400 text-sm font-medium">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <div className="mt-5">
            <div className="inline-flex items-center">🔐 Admin for test</div>
            <div className="mt-2 space-y-0.5">
              <span className="inline-flex"> Email: admin@gmail.com</span>
              <p>pwd: admin123</p>
            </div>
          </div>
        </div>
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
              </div>
              <Input
                id="password"
                placeholder="*****"
                {...register("password", { required: true })}
                type="password"
              />
            </div>
            <ServerSubmitButton
              className="text-white"
              disabled={loading}
              aria-disabled
            >
              {loading ? (
                <span className="flex items-center space-x-3">
                  <LoaderCircle
                    className={cn("transition-all text-white mr-0", {
                      ["animate-spin mr-2 transition-transform"]: loading,
                    })}
                  />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </ServerSubmitButton>
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
