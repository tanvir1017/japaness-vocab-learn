"use client";
import { APIeEndPoints } from "@/components/api/axios";
import { PromoteRole } from "@/components/modal-toast/promote-role";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";
import { getNestedData } from "@/lib/getNestedData";
import { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

export type TUserResponse = {
  _id: string;
  email: string;
  gender: string;
  isDeleted: boolean;
  name: {
    firstName: string;
    lastName: string;
  };
  profileImg: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function ViewAllUserTable() {
  const session = useSession();

  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`${APIeEndPoints.users}/all`, fetcher);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  const { data: Users } = getNestedData(users as AxiosResponse);

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">User Email</TableHead>
          <TableHead className="w-[200px]">User Name</TableHead>
          <TableHead>User Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Users.length &&
          Users.filter(
            (user: TUserResponse) => user.email !== session?.data?.user.email
          ).map((user: TUserResponse) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="font-medium">
                {user.name.firstName}
              </TableCell>
              <TableCell className="font-medium">{user.role}</TableCell>
              <TableCell className="text-right">
                <div className="space-x-2">
                  <PromoteRole user={user} />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{Users.length - 1}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
