"use client";
import Link from "next/link";

import { APIeEndPoints, axiosAPI } from "@/api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TInputs = {
  email: string;
  password: string;
};
export function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();

  // TODO => Getting all data into onSubmit handler
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    console.log(errors);
    try {
      const response = await axiosAPI.post(
        APIeEndPoints.signInUrl,
        JSON.stringify({ email: data.email, password: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // This  allows cookies to be sent
        }
      );
      const { success, message } = response.data;
      if (success) {
        toast(message);
      } else {
        toast("something went wrong!!");
      }
    } catch (error) {
      toast(`Signin failed: ${error}`);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
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
                {...register("password")}
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
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
