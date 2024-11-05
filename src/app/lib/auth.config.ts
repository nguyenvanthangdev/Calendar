import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/app/lib/zod";
import { getUserByEmail } from "@/app/data/user";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export default {
  providers: [
    Google,
    Github,
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compareSync(
            password,
            user.password
          );
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  //trustHost: true,
} satisfies NextAuthConfig;
