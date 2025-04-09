import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const response = await axios.post("/auth/tenants/login", credentials, {
          baseURL: process.env.NEXT_PUBLIC_API_URL,
        });
        if (response.status === 201) {
          const user = response.data.data;
          return {
            accessToken: user.accessToken,
            id: user.id,
            email: credentials.email,
            firstName: user.firstName,
            lastName: user.lastName,
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
