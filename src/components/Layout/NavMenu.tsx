"use client"

import type { Route } from "next";
import NavigationLink from "./NavigationLink";
import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { useCartStore } from "@/stores/cart";
import { ShoppingCartIcon } from "@/components/icons";
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { User } from "@/db/schema";

interface NavMenuProps {
  className?: string;
  session?: User | null;
  onSignOut: () => void;
}

export default function NavMenu({ className, session, onSignOut }: Readonly<NavMenuProps>) {
  const totalCount = useCartStore((s) => s.cart.totalProductsCount);

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
        <li className="relative">
          <Link
            href={"/cart" as Route}
            aria-label="View cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary/10 transition-colors"
          >
            <ShoppingCartIcon className="w-5 h-5 text-foreground" />
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </Link>
        </li>
        {
          session?.email ? (
            <Menubar className="bg-white">
              <MenubarMenu>
                <MenubarTrigger>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={session?.image || ''} alt={`${session?.firstName}`} />
                    <AvatarFallback className='rounded-lg'>{session?.firstName?.charAt?.(0)}</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent className="bg-white">
                  <MenubarGroup>
                    <MenubarItem onSelect={onSignOut}>
                      Sign Out
                    </MenubarItem>
                  </MenubarGroup>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ) : (
            <li className="flex items-center gap-4">
              <Link href={"/sign-in" as Route} className="hidden sm:inline-flex bg-primary hover:bg-primary/80 text-white px-7 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
                Login
              </Link>
            </li>
          )
        }
        <MobileNav session={session} onSignOut={onSignOut} />
      </ul>
    </nav>
  );
}
