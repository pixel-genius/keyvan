import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth-token")?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const isAuthenticated = Boolean(authToken);

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/authenticate", request.url));
  }

  // If the user is authenticated and trying to access auth pages (except logout and pending approval)
  if (isAuthenticated && isAuthPage && !pathname.startsWith("/auth/logout")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
