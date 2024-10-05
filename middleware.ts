import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware (request: NextRequest) {
	let data :any = request.cookies.get('auth')
	if(data && data.value === 'true'){
		if (request.nextUrl.pathname === '/dashboard'){
		    NextResponse.rewrite(new URL('/dashboard', request.nextUrl))
	   } else if (request.nextUrl.pathname === '/') {
			NextResponse.rewrite(new URL('/dashboard', request.nextUrl))
			return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
	    } else if (request.nextUrl.pathname === '/login') {
			NextResponse.rewrite(new URL('/dashboard', request.nextUrl))
			return NextResponse.redirect(new URL('/login', request.nextUrl))
		}
	} else {
		if (request.nextUrl.pathname == '/login'){
		    NextResponse.rewrite(new URL('/login', request.nextUrl))
		} else if (request.nextUrl.pathname === '/login') {
			NextResponse.rewrite(new URL('/login', request.nextUrl))
			return NextResponse.redirect(new URL('/login', request.nextUrl))
		} else if (request.nextUrl.pathname === '/dashboard') {
			NextResponse.rewrite(new URL('/login', request.nextUrl))
			return NextResponse.redirect(new URL('/login', request.nextUrl))
		} 
	}
}