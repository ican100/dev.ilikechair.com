import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    // TODO: 处理用户未激活 || 用户菜单等
    // https://blog.openreplay.com/how-to--authentication-middleware-in-nextjs/

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/assessments']
}
