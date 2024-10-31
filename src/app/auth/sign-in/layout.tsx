"use client";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { loginSchema } from "@/app/lib/schemas";
//import { signIn } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { loginUser } from "@/app/lib/loginAction"; // Import Server Action
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res = await loginUser(values); // Gọi Server Action

    if (res?.ok) {
      // Redirect to the dashboard or desired page on successful login
      redirect("/dashboard");
      //router.push("/dashboard");
    } else {
      toast({
        title: "Something went wrong !",
        variant: "destructive",
        description: "An unexpected error occurred",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <div>
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center text-center justify-center p-7">
          <CardTitle className="text-2xl">Welcome back !</CardTitle>
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
              <Button disabled={false} size="lg" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="p-7">
          <DottedSeparator />
        </div>
        {children}
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="flex items-center justify-center p-7">
          <p>
            Don&apos;t have an account?
            <Link href="/auth/sign-up">
              <span className="text-blue-700">&nbsp;Sign Up</span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
