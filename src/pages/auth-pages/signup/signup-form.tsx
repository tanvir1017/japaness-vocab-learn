"use client";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
type TInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();

  const [gender, setGender] = useState("male");

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    console.log(errors);
    const bodyData = {
      lerner: {
        name: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        password: data.password,
        email: data.email,
        gender,
      },
    };

    try {
      const response = await axiosAPI.post(
        APIeEndPoints.signUpUrl,
        JSON.stringify(bodyData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { success, message } = response.data;
      if (success) {
        toast(message);
      } else {
        toast("something went wrong!!");
      }

      // Redirect to the home page after successful signup
      // window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast(`Failed to create user: ${error}`);
    }
  };

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>Fill the following field ✨</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName")}
                required
              />{" "}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                type="text"
                placeholder="Doe"
                required
              />
            </div>
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
              </div>
              <Input
                id="password"
                {...register("password")}
                type="password"
                required
              />
            </div>
            <div className="grid gap-2">
              <RadioGroup
                defaultValue="male"
                onValueChange={(value) => setGender(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="r1" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="others" id="others" />
                  <Label htmlFor="others">Others</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/authwall/signin" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
