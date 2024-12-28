import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("token");

  const publicPaths = ["/login", "/register"];

  const privatePaths = ["/"];

  if (privatePaths.includes(req.nextUrl.pathname) && refreshToken) {
    return NextResponse.redirect(new URL("/message", req.url));
  }

  const isProtectedPage = !publicPaths.includes(req.nextUrl.pathname);

  if ((isProtectedPage || req.nextUrl.pathname === "/") && !refreshToken) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    return res;
  } else if (!isProtectedPage && refreshToken) {
    return NextResponse.redirect(new URL("/message", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*|favicon.ico).*)"],
};
