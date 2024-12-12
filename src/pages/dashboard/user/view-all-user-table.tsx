"use client";
import { APIeEndPoints, axiosAPI } from "@/api/axios";
import { AlertModal } from "@/components/modal-toast/alert-modal";
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
import { getNestedData } from "@/lib/getNestedData";
import { AxiosResponse } from "axios";
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

// async function updateLesson(
//   url: string,
//   { arg }: { arg: { id: string; data:  } }
// ) {
//   // Make the API call to update the lesson
//   const res = await axiosAPI.patch(
//     `${APIeEndPoints.vocabulary}/${arg.id}/update`,
//     arg.data
//   );
//   return res;
// }

const fetcher = (url: string) => axiosAPI.get(url);
export function ViewAllUserTable() {
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
          <TableHead className="w-[200px]">User Name</TableHead>
          <TableHead className="w-[200px]">User Email</TableHead>
          <TableHead>User Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Users.length &&
          Users.map((user: TUserResponse) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="font-medium">
                {user.name.firstName}
              </TableCell>
              <TableCell className="font-medium">{user.role}</TableCell>
              <TableCell className="text-right">
                <div className="space-x-2">
                  <PromoteRole user={user} />
                  <AlertModal />
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">3</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
