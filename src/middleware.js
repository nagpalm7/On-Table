import { NextResponse } from "next/server";
import getAuthUser from "@/lib/getAuthUser";

const homePage = "/";

const protectedRoutes = [
  "/admin",
];

const authRoutes = [
  "/auth"
]

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some(route => path.startsWith(route));  
  const isAuth = authRoutes.some(route => path.startsWith(route));

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtected && !userId) {
    // If the user is not authenticated and trying to access a protected route
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isAuth && userId) {
    // If the user is authenticated and trying to access an auth route
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  if (homePage === path) {
    if (userId)
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    else
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
