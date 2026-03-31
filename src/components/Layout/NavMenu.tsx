import type { Route } from "next";
import NavigationLink from "./NavigationLink";
import { NAV_ITEMS } from "@/constants";

export default function NavMenu() {
  return (
    <nav className="hidden md:flex items-center">
      <ul className="flex flex-row gap-4 xl:gap-8 text-sm xl:text-base font-bold text-white uppercase tracking-wider">
        {NAV_ITEMS.map((navItem) => (
          <li key={navItem.text} className="relative group overflow-hidden">
            <NavigationLink href={navItem.path as Route} className="border-none px-0 py-2 hover:text-white/80 transition-all">
              {navItem.text}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300"></span>
            </NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
