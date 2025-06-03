import { NextResponse } from "next/server";
// import getAuthUser from "@/lib/getAuthUser";

const protectedRoutes = [];
const publicRoutes = ["/order", "/review", "pay", "thank-you"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  console.log("Middleware path:", path);
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/posts/edit/");
  const isPublic = publicRoutes.includes(path);

  if (isProtected) {
    return NextResponse.redirect(new URL("/order", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
