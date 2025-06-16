import { NextResponse } from "next/server";
import { getAuthUserFromMiddleware } from "@/lib/getAuthUser";
import { v4 as uuidv4 } from "uuid";

const homePage = "/";

const protectedAdminRoutes = [
  "/admin",
  "/auth/register"
];

const protectedRestaurantRoutes = [
  "/client",
];

const authRoutes = [
  "/auth/login"
]

const publicRoutes = [
  "/restaurant",
]

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isAdminProtectedRoute = protectedAdminRoutes.some(route => path.startsWith(route));
  const isRestaurantProtectedRoute = protectedRestaurantRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  const user = await getAuthUserFromMiddleware(req);;
  const isAuthenticated = user?.userId;
  const isAdmin = user?.userType === 'admin';
  const isRestaurantOwner = user?.userType === 'rest_owner';

  // If the user is not authenticated and trying to access a protected route (admin or restaurant)
  if ((isAdminProtectedRoute || isRestaurantProtectedRoute) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // If the user is authenticated and trying to access an login route
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // If the user is rest_owner and try to access admin path
  if (isAuthenticated && isRestaurantOwner && isAdminProtectedRoute) {
    return NextResponse.redirect(new URL(path.replace("admin", "client"), req.nextUrl));
  }

  // handle home page redirection
  if (homePage === path) {
    if (isAuthenticated && isAdmin)
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    else if (isAuthenticated && isRestaurantOwner)
      return NextResponse.redirect(new URL("/client/dashboard", req.nextUrl));
    else
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // if user is anonymous and trying to access public path
  if (isPublicRoute) {
    const sessionId = req.cookies.get("sessionId")?.value;
    if (!sessionId) {
      const newSessionId = uuidv4();
      const response = NextResponse.next();
      response.cookies.set('sessionId', newSessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      "/admin/:path*", 
      "/client/:path*", 
      "/restaurant/:path*",
      "/auth/:path*",
      "/"
    ]
};
