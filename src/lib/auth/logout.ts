"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  const cookieStore = await cookies();

  if (cookieStore.has("auth_token")) {
    cookieStore.delete("auth_token");
  }

  try {
    redirect("/");
  } catch (error) {
    console.error("logout error", error);
  }
}
