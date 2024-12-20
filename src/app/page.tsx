import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/app/assets/logo.svg";
import { auth } from "@/app/lib/auth";
export default async function Home() {
  const session = await auth();
  return (
    <main
      className="flex flex-col items-center justify-center h-screen gap-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-500
      to-white"
    >
      <div className="flex justify-center gap-1">
        <Image src={Logo} width={50} height={50} alt="Logo" />
        <h1 className="text-5xl font-bold">Calendar</h1>
      </div>
      <div>
        <Button asChild className="text-xl">
          <Link href={!session?.user ? "/sign-in" : "/dashboard"}>
            {!session?.user ? "Sign In" : "Dashboard"}
          </Link>
        </Button>
      </div>
    </main>
  );
}
