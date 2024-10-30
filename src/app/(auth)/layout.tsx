"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/assets/logo.svg";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl">
        <nav className="flex justify-between items-center">
          <div className="flex gap-3 mx-2 my-5">
            <Image src={Logo} width={50} height={50} alt="Logo" />
            <h3 className="text-4xl font-bold">Calendar</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild className="text-xl" variant="default">
              <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                {isSignIn ? "Sign Up" : "Login"}
              </Link>
            </Button>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center py-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
