import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { ModeToggle } from "./ui/mode-toggle";

export default function TopNavigation() {
  return (
    // Fixed container that floats at the top, spans full width
    <div className="fixed top-5 left-0 right-0 z-50">
      {/* Centered inner wrapper with max width and padding */}
      <div className="max-w-6xl mx-auto px-4 py-3 shadow-md rounded-lg">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex justify-between items-center w-full">
            {/* Logo on the left */}
            <NavigationMenuItem>
              <a href="/" className="text-lg font-bold">
                Financialist
              </a>
            </NavigationMenuItem>
            {/* Mode toggle on the right */}
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
