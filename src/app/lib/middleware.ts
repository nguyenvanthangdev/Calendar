//import { auth } from "@/app/lib/auth";

// export default auth((req) => {
//   if (!req.auth && req.nextUrl.pathname !== "/auth/sign-in") {
//     const newUrl = new URL("/auth/sign-in", req.nextUrl.origin);
//     return Response.redirect(newUrl);
//   }
// });
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
