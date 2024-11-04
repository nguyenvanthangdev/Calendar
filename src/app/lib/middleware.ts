import NextAuth from "next-auth";
import authConfig from "@/app/lib/auth.config";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(" ROUTE", req.nextUrl.pathname);
  console.log("isLoggedIn", isLoggedIn);
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
