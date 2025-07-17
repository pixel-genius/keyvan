import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth-token")?.value;
  const pendingTokenStr = request.cookies.get("pendingToken")?.value;

  const isAuthPage = pathname.startsWith("/auth");
  const isPendingApprovalPage = pathname === "/auth/pend-approved";
  const isAuthenticated = Boolean(authToken);

  // Handle pending approval logic
  if (isPendingApprovalPage && pendingTokenStr) {
    try {
      const pendingToken = JSON.parse(pendingTokenStr);
      const timeElapsed = Date.now() - pendingToken.timestamp;

      if (timeElapsed >= 20000) {
        // Approve the token, set auth-token, clear pendingToken, redirect to home
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.set("auth-token", pendingToken.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
        response.cookies.delete("pendingToken");
        return response;
      }
    } catch (error) {
      // If parsing fails, just let them stay on the page
    }
    // Let them stay on the pending approval page
    return NextResponse.next();
  }

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isAuthPage && !isPendingApprovalPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // If the user is authenticated and trying to access auth pages (except logout and pending approval)
  if (
    isAuthenticated &&
    isAuthPage &&
    !pathname.startsWith("/auth/logout") &&
    !isPendingApprovalPage
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
