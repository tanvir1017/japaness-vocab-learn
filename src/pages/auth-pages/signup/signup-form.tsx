"use client";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
type TInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type TUserArguments = {
  name: { firstName: string; lastName: string };
  email: string;
  password: string;
  gender: string;
};

async function addUser(url: string, { arg }: { arg: TUserArguments }) {
  try {
    const response = await axiosAPI.post(
      `${APIeEndPoints.users}/create-user`,
      arg // Data sent to the backend
    );
    return response.data; // Return data for further processing if needed
  } catch (error) {
    console.error("Error posting data to backend:", error);
    throw error; // Rethrow error for error handling
  }
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();

  const router = useRouter();

  const [gender, setGender] = useState("male");
  const { trigger, isMutating } = useSWRMutation("/users", addUser);

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    console.log(errors);

    try {
      // Send data to backend
      const result = await trigger({
        name: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        password: data.password,
        email: data.email,
        gender,
      });

      if (!result.success) {
        toast("Failed to create user!");
      } else {
        toast(result.message);
        router.push("/authwall/signin");
      }
    } catch (error) {
      console.error("Error adding vocabulary:", error);
      toast("Error adding vocabulary.");
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
                placeholder="***"
                type="password"
                required
              />
            </div>
            <div className="grid gap-2 py-1">
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
            <ServerSubmitButton
              className="text-white "
              disabled={isMutating}
              aria-disabled
            >
              {isMutating ? (
                <span className="flex items-center space-x-3">
                  <LoaderCircle
                    className={cn("transition-all text-white mr-0", {
                      ["animate-spin mr-2 transition-transform"]: isMutating,
                    })}
                  />
                  processing...
                </span>
              ) : (
                "Sign up"
              )}
            </ServerSubmitButton>
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
