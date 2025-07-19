import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}

const users = [
  {
    username: "user1",
    user_type: "user_type_1",
    password: "",
  },
  {
    username: "user2",
    user_type: "user_type_2",
    password: "",
  },
];

export async function POST(req: Request) {
  const json = await req.json();
  // ignoring password for now
  const { username, password } = json;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const token = jwt.sign(
    { username: user.username, user_type: user.user_type },
    secret!
  );

  const response = NextResponse.json({ message: "Authenticated" });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    // 24 hours
    maxAge: 60 * 60 * 24,
  });

  return response;
}
