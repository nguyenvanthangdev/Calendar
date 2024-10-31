import { CardContent } from "@/components/ui/card";
import { signIn } from "@/app/lib/auth";
import {
  GitHubAuthButton,
  GoogleAuthButton,
} from "@/app/components/SubmitButton";
export default function SignUpPage() {
  return (
    <CardContent className="p-7 flex flex-col gap-y-4">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <GoogleAuthButton />
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <GitHubAuthButton />
      </form>
    </CardContent>
  );
}
