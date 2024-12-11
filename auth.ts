import { APIeEndPoints, axiosAPI } from "@/api/axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { authConfig } from "./auth.config";

// async function getUser(email: string) {
//   try {
//     const user = await axiosAPI.get(`${APIeEndPoints.lerner}/email/${email}`);
//     return user.data.data;
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        console.log("🚀 ~ authorize ~ parsedCredentials:", parsedCredentials);

        if (parsedCredentials.success) {
          const user = await axiosAPI.post(
            APIeEndPoints.signInUrl,
            JSON.stringify(parsedCredentials.data),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true, // This  allows cookies to be sent
            }
          );
          if (user.data.success) {
            return user.data.data;
          } else {
            throw new Error("Invalid credentials.");
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
