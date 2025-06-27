import { NavigationMenuItem, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { NavigationMenu, NavigationMenuLink } from "~/components/ui/navigation-menu";
import ProfileMenu from "./profile-menu";
import { ThemeToggle } from "./theme-toggle";

export default function NavMenu() {
    return (
        <div className="flex flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 py-2">
            <div>
                <ThemeToggle />
            </div>
            <NavigationMenu className="mx-auto">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu >
            <ProfileMenu className="ml-auto" />
        </div>
    );
}