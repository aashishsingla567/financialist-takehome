import TopNavigation from "@/components/top-navigation";
import { postLogout } from "@/lib/api/client/auth";
import { getProfile } from "@/lib/api/server/profile";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

async function getProfileData() {
  try {
    const response = await getProfile();
    return response.data;
  } catch (error) {
    // TODO :: handle in an interceptor in axios,
    // or, make a global error handler.
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        await postLogout();
        redirect("/");
      }
    }
    return null;
  }
}

export default async function Type2Home() {
  const profile = await getProfileData();

  return (
    <>
      <TopNavigation showLogoutButton />
      <div className="min-h-screen flex flex-col gap-4 pt-5">
        <h1 className="text-2xl font-semibold">Welcome {profile!.username},</h1>
        <p>This is the type 2 home page.</p>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    </>
  );
}
