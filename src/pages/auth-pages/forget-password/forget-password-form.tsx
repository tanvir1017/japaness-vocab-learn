"use client";
import { APIeEndPoints, axiosAPI } from "@/components/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
type TInputs = {
  email: string;
};
export function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    console.log(errors);
    try {
      const response = await axiosAPI.post(
        APIeEndPoints.signUpUrl,
        JSON.stringify({ email: data.email }),
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
        <CardTitle className="text-2xl">Forget Password</CardTitle>
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
