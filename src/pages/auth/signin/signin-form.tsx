"use client";
import Link from "next/link";

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
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

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
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const loginInfo = { email: data.email, password: data.password };
    console.log(loginInfo);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        loginInfo,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Important: This allows cookies to be sent
        }
      );
      console.log("Signin successful:", response.data);
    } catch (error) {
      console.error("Signin failed:", error.response?.data || error.message);
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
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
                  href="#"
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
