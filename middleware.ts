import { NextRequest, NextResponse } from "next/server";





export function middleware(request:NextRequest) {
    // console.log(request.nextUrl.pathname, "middlewares ----")
    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/category/:path*"]
}