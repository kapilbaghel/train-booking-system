import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = [
    "/dashboard",
    "/seats-availability-details",
    "/passenger-details",
    "/review-booking",
    "/fare-summary",
    "/confirmation",
  ];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);

    loginUrl.searchParams.set(
      "redirect",
      req.nextUrl.pathname + req.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  // jwt.verify HATA DO

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/seats-availability-details/:path*",
    "/passenger-details",
    "/review-booking",
    "/fare-summary",
    "/confirmation",
  ],
};