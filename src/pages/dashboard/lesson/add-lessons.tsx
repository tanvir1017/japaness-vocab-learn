"use client";

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

export default function AddLesson() {
  return (
    <div className="px-10">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Create A New Lesson</CardTitle>
          <CardDescription>
            New lesson will be created by fill up the following information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lessonName">Lesson Name</Label>
                <Input
                  id="lessonName"
                  type="text"
                  placeholder="Basic Greetings"
                  required
                />{" "}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Lesson No</Label>
                <Input
                  id="lastNo"
                  type="text"
                  placeholder="e.g 1, 2"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Add lesson
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
