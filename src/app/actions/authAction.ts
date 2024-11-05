"use server";
import { signIn, signOut } from "@/app/lib/auth";
import * as z from "zod";
import { loginSchema, registerSchema } from "../lib/zod";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/db";
import { getUserByEmail } from "@/app/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/app/lib/routes";
import { AuthError } from "next-auth";

export const handleSignUp = async (values: z.infer<typeof registerSchema>) => {
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
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid Fields!" };
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Incorrect email or password" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
};

export async function handleSignInGoogle() {
  await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
}

export async function handleSignInGithub() {
  await signIn("github", { redirectTo: DEFAULT_LOGIN_REDIRECT });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
