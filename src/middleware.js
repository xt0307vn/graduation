import { NextResponse, NextRequest } from 'next/server';
import modifyRouteProtected from "@/Utils/CustomFunction/ModifyRouteProtected";

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    
    /**
     * check login
     * @type {string[]}
     */
    const protectedRoutes = [
        `/profile`,
        '/admin'
    ]
    if (protectedRoutes.some(route => path.startsWith(route)) && !request.cookies.has("uat")) {
        return NextResponse.redirect(new URL(`/login`, request.url));
    }
    /**
     * check administrator
     */
    if (request.cookies.has("uat")) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${request.cookies.get("uat")?.value}`);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        let data = await (await fetch(process.env.API_URL + 'auth/profile', requestOptions))?.json();
        if (data?.status == 401 ) {
            return NextResponse.redirect(new URL(`/unauthorized`, request.url));
        }
        if (data?.status == 403 ) {
            return NextResponse.redirect(new URL(`/forbidden`, request.url));
        }
        if (data?.data?.role_id != 1 && protectedRoutes.some(route => 'admin'.startsWith(route))) {
            return NextResponse.redirect(new URL(`/forbidden`, request.url));
        }
    }
    return NextResponse.next();
}

// Áp dụng middleware cho các route cần bảo vệ
export const config = {
    matcher: ['/profile/:path*', '/admin/:path*'],
};