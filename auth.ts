import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

const privateRoutes = ["/dashboard"];

interface MyUser extends User {
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

// ** Refresh token generation logic
async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh-token`, {
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

        const res = await fetch(`${process.env.API_BASE_URL}/auth/signin`, {
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
          accessToken: user.data.accessToken,
          refreshToken: user.data.refreshToken,
        } as MyUser;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/authwall/signin",
    error: "/authwall/signin",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 24 * 60 * 60 * 1000; //1 day expiration
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { auth, signOut, handlers } = NextAuth(authConfig);
