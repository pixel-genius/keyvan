import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth-token")?.value;

  // Bypass middleware for static assets and public files to prevent redirects on images/fonts/manifest
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/img") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/manifest.json") ||
    /\.[a-zA-Z0-9]+$/.test(pathname); // any file with an extension

  if (isStaticAsset) {
    return NextResponse.next();
  }

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
  matcher: [
    // Run middleware for all app routes except API; static assets are skipped in-code above
    "/((?!api).*)",
  ],
};
