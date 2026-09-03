import { NextResponse, type NextRequest } from "next/server";

const AUTH_SESSION_COOKIE = "sahmyto_auth";

export function middleware(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(AUTH_SESSION_COOKIE)?.value);

  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
