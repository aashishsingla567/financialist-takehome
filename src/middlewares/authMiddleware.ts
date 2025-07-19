import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// todo :: add proper pattern matching for routes
const PROTECTED_ROUTES = ["/type_1_home", "/type_2_home"];
const AUTH_ROUTES = ["/"];
const USER_HOMES_MAP = {
  user_type_1: "/type_1_home",
  user_type_2: "/type_2_home",
};

function getUser(request: NextRequest): {
  username: string;
  user_type: string;
} | null {
  try {
    const authCookie = request.cookies.get("auth_token")?.value;
    if (!authCookie) return null;
    const token = decodeURIComponent(authCookie);
    const decoded = jwt.decode(token);
    return decoded as { username: string; user_type: string };
  } catch {
    return null;
  }
}

function redirect(url: string, request: NextRequest): NextResponse {
  return NextResponse.redirect(new URL(url, request.url));
}

export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const user = getUser(request);
  const userType = user?.user_type as "user_type_1" | "user_type_2";
  const authenticated = !!userType;
  const hasAuthToken = !!request.cookies.get("auth_token")?.value;

  if (pathname.includes(".") || pathname.startsWith("/_next")) {
    return null;
  }

  if (hasAuthToken && !authenticated) {
    return redirect("/", request);
  }

  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!authenticated) {
      return redirect("/", request);
    }

    const expectedRoute = USER_HOMES_MAP[userType];

    if (expectedRoute && pathname !== expectedRoute) {
      return redirect(expectedRoute, request);
    }
  }

  if (AUTH_ROUTES.some((route) => pathname === route)) {
    if (authenticated) {
      const homePage = USER_HOMES_MAP[userType];
      return redirect(homePage, request);
    }
  }

  return null;
}
