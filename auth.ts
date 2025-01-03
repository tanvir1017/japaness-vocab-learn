import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

interface MyUser extends User {
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL_FOR_DEV;

// ** Refresh token generation logic
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });
    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.data.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.data.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig = {
  trustHost: true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<MyUser | null> => {
        const { email, password } = credentials;
        const cookieStore = await cookies();
        const payload = {
          email,
          password,
        };

        const res = await fetch(`${BASE_URL}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const user = await res.json();

        if (!res.ok || !user) return null;

        const decodedIdToken = JSON.parse(
          Buffer.from(user.data.accessToken.split(".")[1], "base64").toString()
        );

        if (!res.ok) throw new Error(user.message);

        const prefix = process.env.NODE_ENV === "development" ? "__Dev-" : "";
        cookieStore.set({
          name: `${prefix}refresh-token`,
          value: user.data.refreshToken,
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return {
          email: decodedIdToken.userEmail,
          role: decodedIdToken.role,
          name: decodedIdToken.name,
          accessToken: user.data.accessToken,
          refreshToken: user.data.refreshToken,
        } as MyUser;
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: "/authwall/signin",
    error: "/authwall/signin",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000; //1 day expiration
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user;
      const currentPath = nextUrl.pathname;
      const lernerAllowedPaths = ["/tutorials", "/lessons"];
      // handling role  based access or authentication
      if (!isLoggedIn) {
        if (!currentPath.startsWith("/authwall")) {
          return Response.redirect(new URL(`/authwall/signin`, nextUrl));
        }
      } else if (isLoggedIn) {
        if (
          auth?.user?.role === "admin" &&
          !currentPath.startsWith("/dashboard")
        ) {
          return Response.redirect(new URL(`/dashboard`, nextUrl));
        } else if (
          auth?.user?.role === "lerner" &&
          !lernerAllowedPaths.some((path) => currentPath.startsWith(path))
        ) {
          return Response.redirect(new URL("/lessons", nextUrl));
        }
      }

      return true;
    },
    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { auth, signOut, handlers } = NextAuth(authConfig);
