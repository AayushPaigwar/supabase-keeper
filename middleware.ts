import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value ||
                request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Only verify JWT in middleware (Edge Runtime doesn't support Prisma)
  const payload = await verifyToken(token)
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Add user info to request headers for API routes
  const response = NextResponse.next()
  response.headers.set('x-user-id', payload.userId)
  response.headers.set('x-user-email', payload.email)

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/supabase/:path*']
}