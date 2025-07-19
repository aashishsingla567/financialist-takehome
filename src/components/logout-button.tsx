"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { postLogout } from "@/lib/api/client/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await postLogout();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("logout error", error);
      window.alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      loading={loading}
      size="icon"
    >
      <LogOutIcon className="text-destructive" />
    </Button>
  );
}
