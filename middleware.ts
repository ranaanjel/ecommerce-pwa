import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export default async function middleware(request: NextRequest) {
    //session check -- if the __Secure-authjs.session-token 
    const AllowedOrigins = ["https://cart.quikcrats.com"]

    if (process.env.NODE_ENV == "development") {
        AllowedOrigins.push("http://localhost:3000");
        // AllowedOrigins.push(request.nextUrl.origin);

    }
    const corsOption = {
        "Access-Control-Allowed-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allowed-Headers": "Content-Type, Authorization",
    }
    //ADDING CORS
    const origin = request.nextUrl.origin ?? "";
    const isAllowedOrigin= AllowedOrigins.includes(origin);

    //console.log(origin, isAllowedOrigin);


    if(!isAllowedOrigin) {
        return NextResponse.json({
            message:"CORS origin not allowed",
        }, {status:403})
    }
    //preflight 
    const isPreflight = request.method == "OPTIONS"

    if(isPreflight) {
        return Response.json({}, {
            headers: {
                ...(isAllowedOrigin && {"Access-Control-Allow-Origin":origin}),
                ...corsOption
            }
        })
    }

    // session check

    // let { auth } = NextAuth(AuthOptions)
    let session = await auth();

    if (!session) {
        console.log("session redirected", session)
        return NextResponse.redirect(request.nextUrl.origin + "/login")
    } 

    const response = NextResponse.next();
    if(isAllowedOrigin) {
        response.headers.set("Access-Control-Allow-Origin", origin)
    }


    return response;
}

export const config = {
    runtime: "nodejs",
    matcher: ["/api/v1/:path*", "/dashboard/:path*", "/category/:path*", "/item/:path*", "/lib/:path*", "/query/:path*", "/registration/:path*", "/seed/:path*", "/test/:path*", "/ui/:path*", "/users/:path*",]
}