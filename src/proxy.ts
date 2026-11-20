import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/register"];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude api routes and static assets from protection (better auth handles its own api routes)
  if (
    pathname.startsWith("/api") || 
    pathname.startsWith("/_next") || 
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".") // static files like icons or og images
  ) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  // Check if session token cookie exists
  const hasSessionCookie = 
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  // Protect internal workspace routes (e.g. /dashboard, /projects, /tasks, /notes, /snippets, /settings, /extensions)
  if (!hasSessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in and visiting login/register, redirect to dashboard
  if (hasSessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
