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

export default function AddVocabularies() {
  return (
    <div className="px-10">
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Create Vocabulary For Specific Lesson
          </CardTitle>
          <CardDescription>Vocabularies</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="word">Word</Label>
                <Input
                  id="word"
                  type="text"
                  placeholder="Basic Greetings"
                  required
                />{" "}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pronunciation">Pronunciation</Label>
                <Input
                  id="pronunciation"
                  type="text"
                  placeholder="e.g 1, 2"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meaning">Meaning</Label>
                <Input
                  id="meaning"
                  type="text"
                  placeholder="e.g 1, 2"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whenToSay">When To Say</Label>
                <Input
                  id="meaning"
                  type="text"
                  placeholder="e.g 1, 2"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lessonId">Select Lesson</Label>
                <Input
                  id="lessonId"
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
