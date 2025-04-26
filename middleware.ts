// 📁 middleware.ts (novo arquivo)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userType = request.cookies.get("userType")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && userType !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/monitor") && userType !== "monitor") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/User") && userType !== "user") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/monitor/:path*",
    "/User/:path*",
  ],
};