import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request){
    const secret = new TextEncoder().encode('secret');
    const jwt = request.cookies.get("myTokenName")?.value;
    
    if(jwt === undefined){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try{
        await jwtVerify(jwt, secret);
        return NextResponse.next();
    }catch(error){
        console.log(error)
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/", "/dashboard", "/admin/:path*"]
}