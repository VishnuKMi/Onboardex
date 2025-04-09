import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      isEmailVerified: boolean;
      role: {
        name: string;
        code: string;
        permissions: {
          name: string;
          code: string;
        };
      };
      tenant: {
        id: number;
        name: string;
        url: string;
      };
    };
  }
}
