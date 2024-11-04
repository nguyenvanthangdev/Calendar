"use server";
import { signIn, signOut } from "@/app/lib/auth";
import * as z from "zod";
import { loginSchema, registerSchema } from "../lib/zod";
import bcrypt from "bcryptjs";
import prisma from "../lib/db";
import { getUserByEmail } from "../data/user";

export const handleSignUp = async (values: z.infer<typeof registerSchema>) => {
  console.log(values);
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields !" };
  const { name, email, password } = validatedFields.data;
  // Hash the password asynchronously
  const hashedPassword = await bcrypt.hashSync(password, 10);
  // Check for existing user
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use !" };
  // Create new user
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { success: "User created !" };
};

export const handleSignIn = async (values: z.infer<typeof loginSchema>) => {
  console.log(values);
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields !" };
  return { success: "Email sent" };
};

export async function handleSignInGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function handleSignInGithub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
