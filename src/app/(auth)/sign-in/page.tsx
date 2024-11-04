"use client";
import {
  GitHubAuthButton,
  GoogleAuthButton,
} from "@/components/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
//import { useToast } from "@/hooks/use-toast";
//import { ToastAction } from "@/components/ui/toast";
import { DottedSeparator } from "@/components/dotted-separator";
import { signInSchema } from "@/app/lib/zod";
import LoadingButton from "@/components/loading-button";
import {
  handleCredentialsSignin,
  handleSignInGithub,
  handleSignInGoogle,
} from "@/app/actions/authAction";
import { useState } from "react";
export default function SignInPage() {
  //const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [, setGlobalError] = useState<string>("");
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const result = await handleCredentialsSignin(values);
      console.log("check result", result);
      if (result?.message) {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <Card className="w-full md:w-[487px] border-none shadow-md">
      <CardHeader className="flex items-center text-center justify-center p-7">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton pending={form.formState.isSubmitting} />
          </form>
        </Form>
      </CardContent>
      <div className="p-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <form action={handleSignInGoogle}>
          <GoogleAuthButton />
        </form>
        <form action={handleSignInGithub}>
          <GitHubAuthButton />
        </form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          Don&apos;t have an account?
          <Link href="/sign-up">
            <span className="text-blue-700 hover:underline">&nbsp;Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
