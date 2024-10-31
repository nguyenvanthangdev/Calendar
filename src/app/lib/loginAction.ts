"use server";

import { signIn } from "@/app/lib/auth";

export async function loginUser(values: { email: string; password: string }) {
  const res = await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  });

  return res;
}
