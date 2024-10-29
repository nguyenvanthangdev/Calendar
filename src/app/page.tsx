import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen text-center gap-6 max-w-5xl mx-auto">
      <div className="flex justify-center gap-1">
        <Image src="./logo.svg" width={50} height={50} alt="Logo" />
        <h1 className="text-5xl font-bold">Calendar</h1>
      </div>
      <div>
        <Button asChild className="text-xl">
          <Link href="/dashboard">Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
