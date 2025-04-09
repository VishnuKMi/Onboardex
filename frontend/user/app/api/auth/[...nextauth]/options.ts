import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const callbackURL = `${process.env.NEXT_PUBLIC_API_URL}/auth/users/login/callback?token=${credentials.password}`;
        const response = await axios.get(callbackURL, {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
        });
        if (response.status === 200) {
          const user = response.data.data;
          return {
            accessToken: user.accessToken,
            ...user,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        // @ts-ignore
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user = token.user;
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
