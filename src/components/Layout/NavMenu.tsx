import type { Route } from "next";
import NavigationLink from "./NavigationLink";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import Link from "next/link";

interface NavMenuProps {
  className?: string;
}

export default function NavMenu({ className }: NavMenuProps) {
  return (
    <nav className={cn("hidden md:flex items-center")}>
      <ul className="flex flex-row gap-4 xl:gap-8 text-sm xl:text-base font-bold text-foreground uppercase tracking-wider">
        {NAV_ITEMS.map((navItem) => (
          <li key={navItem.text} className="relative group overflow-hidden">
            <NavigationLink href={navItem.path as Route} className={cn("border-none px-0 py-2 hover:text-primary transition-all", className)}>
              {navItem.text}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </NavigationLink>
          </li>
        ))}
        <li className="flex items-center gap-4">
          <Link href={"/sign-in" as Route} className="hidden sm:inline-flex bg-primary hover:bg-primary/80 text-white px-7 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
            Login
          </Link>
          <MobileNav />
        </li>
      </ul>
    </nav>
  );
}
