"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          variant={variant}
          type="submit"
          className={cn("w-fit", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button variant="outline" className="w-full" disabled>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login with Gihub
        </Button>
      )}
    </>
  );
}
