import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/lib/db";
import authConfig from "@/app/lib/auth.config";
import { getUserById } from "@/app/data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ token, session }) {
      console.log("check token", token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role === "ADMIN" || (token.role === "USER" && session.user)) {
        session.user.role = token.role;
      } else {
        session.user.role = "USER";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      console.log("check token123", token);
      return token;
    },
  },
});
