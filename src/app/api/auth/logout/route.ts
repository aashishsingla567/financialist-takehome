import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  if (cookieStore.has("auth_token")) {
    cookieStore.delete("auth_token");
  } else {
    return NextResponse.json({ message: "Not logged in" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
