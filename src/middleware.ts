import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authResult = await authMiddleware(request);

  if (authResult) {
    return authResult;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
