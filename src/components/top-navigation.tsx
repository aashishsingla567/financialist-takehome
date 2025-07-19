import Link from "next/link";
import LogoutButton from "./logout-button";
import { ModeToggle } from "./ui/mode-toggle";

export default function TopNavigation({ showLogoutButton = false }) {
  return (
    <div className="sticky top-5 left-0 right-0 z-1000 mb-5">
      <div className="flex justify-between items-center mx-auto px-4 py-3 shadow-md rounded-lg">
        <Link href="/">
          <a className="text-lg font-bold">Financialist</a>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {showLogoutButton && <LogoutButton />}
        </div>
      </div>
    </div>
  );
}
