import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware"; // 1. Import middleware của next-intl
import { routing } from "./i18n/routing"; // 2. Import cấu hình routing

const ADMIN_ROUTE_REGEX = /^\/(?:[a-z]{2}\/)?admin(?:$|\/)/;
const AUTH_ROUTE_REGEX = /^\/(?:[a-z]{2}\/)?auth(?:$|\/)/;
const PUBLIC_FILE_REGEX = /\.(.*)$/;

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE_REGEX.test(pathname)
  ) {
    return NextResponse.next();
  }

  const locale = pathname.match(/^\/([a-z]{2})\//)?.[1] || routing.defaultLocale;
  const token = request.cookies.get("refresh_token")?.value;

  if (ADMIN_ROUTE_REGEX.test(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
      const { payload } = await jwtVerify(token, secret);
      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
    }
  }

  if (AUTH_ROUTE_REGEX.test(pathname)) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
        const { payload } = await jwtVerify(token, secret);
        if (payload.role === "ADMIN") {
          return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
        }
        return NextResponse.redirect(new URL(`/${locale}`, request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // Matcher cần khớp với cấu hình của next-intl
  matcher: ["/", "/(vi|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};