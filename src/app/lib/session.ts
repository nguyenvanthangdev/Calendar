import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

export async function requireUser() {
  const session = await auth();
  console.log("Session in requireUser:", session);
  if (!session?.user) {
    return redirect("/");
  }

  return session;
}
