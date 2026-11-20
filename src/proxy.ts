import { NextResponse, type NextRequest } from "next/server";

const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Exclude api routes and static assets from protection (better auth handles its own api routes)
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.includes(pathname);

  // We can check if session token cookie exists
  // Since better-auth supports multiple environments, cookie name could be "better-auth.session_token"
  // For edge middleware we can just fetch the session from the server using better-fetch
  
  // Note: better-fetch is automatically configured by better-auth or you can check cookie directly.
  // We'll check the cookie first to avoid unnecessary requests.
  const hasSessionCookie = 
    request.cookies.has("better-auth.session_token") ||
    request.cookies.has("__Secure-better-auth.session_token");

  if (!hasSessionCookie && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
