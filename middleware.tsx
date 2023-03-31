import { getToken } from "next-auth/jwt"  //Function to get token from server
import { NextResponse } from "next/server"

export async function middleware(req) {
    // Token will exist if user logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    console.log(token)
    const { pathname } = req.nextUrl

    //  Allow requests if following is true...
    // 1. reequesting for next-auth session and provider fetching
    // 2. the token exists
    if (pathname.includes('/api/auth') || token) {
        // Continue on 👍
        return NextResponse.next()
        console.log(token)
    } 

    // If no token AND requesting protected route...
    // ...redirect to login page
    if(!token && pathname != '/login') {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }



   
}

export const config = {
    matcher: "/",
    };