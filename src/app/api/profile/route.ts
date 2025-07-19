import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const USER_TYPE_IDS = {
  user_type_1: 1,
  user_type_2: 2,
};

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth_token")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, secret!) as {
        username: string;
        user_type: "user_type_1" | "user_type_2";
      };

      const userType = decoded.user_type;
      const user = {
        username: decoded.username,
        user_type: USER_TYPE_IDS[userType],
      };

      return NextResponse.json(user);
    } catch (error) {
      const response = NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );

      // todo :: should be handled by logout method in auth service.
      response.cookies.delete("auth_token");
      return response;
    }
  }

  const response = NextResponse.json(
    { message: "Token not found in cookies" },
    { status: 401 }
  );

  response.cookies.delete("auth_token");

  return response;
}
