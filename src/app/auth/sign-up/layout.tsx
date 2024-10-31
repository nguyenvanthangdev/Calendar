"use client";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
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
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { registerSchema } from "@/app/lib/schemas";
export default function SignUpPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toast } = useToast();
  type FormData = z.infer<typeof registerSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: FormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast({
          title: "Notification",
          description: "User created successfully !",
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
        form.reset();
      } else {
        const errorData = await response.json();
        toast({
          variant: "destructive",
          title: "Something went wrong !",
          description: errorData.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong !",
        variant: "destructive",
        description: "An unexpected error occurred",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      console.error(err);
    }
  };
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center text-center justify-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to out{" "}
          <Link href="/privacy">
            <span className="text-blue-700">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-blue-700">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
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
          Already have an account?
          <Link href="/auth/sign-in">
            <span className="text-blue-700">&nbsp;Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
