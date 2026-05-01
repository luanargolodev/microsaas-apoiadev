import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    username?: string;
    bio?: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}
