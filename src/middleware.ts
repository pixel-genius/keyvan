import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('auth-token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isPendingApprovalPage = request.nextUrl.pathname === '/auth/pend-approved'
  
  // Check for pending token approval
  if (isPendingApprovalPage) {
    const pendingTokenStr = request.cookies.get('pendingToken')?.value
    if (pendingTokenStr) {
      try {
        const pendingToken = JSON.parse(pendingTokenStr)
        const timeElapsed = Date.now() - pendingToken.timestamp
        
        // If 20 seconds have passed, approve the token
        if (timeElapsed >= 20000) {
          console.log('Token approved, redirecting to landing page')
          
          // Create a response that redirects to the landing page
          const response = NextResponse.redirect(new URL('/', request.url))
          
          // Set the approved token
          response.cookies.set('auth-token', pendingToken.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 // 30 days
          })
          
          // Clear the pending token
          response.cookies.delete('pendingToken')
          
          return response
        } else {
          console.log(`Token pending, ${Math.ceil((20000 - timeElapsed) / 1000)} seconds remaining`)
        }
      } catch (error) {
        console.error('Error processing pending token:', error)
      }
    } else {
      console.log('No pending token found')
    }
  }

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If the user is authenticated and trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 