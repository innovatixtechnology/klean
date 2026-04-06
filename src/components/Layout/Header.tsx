"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/constants";
import { cn } from "@/lib/utils";
import NavMenu from "./NavMenu";
import MobileNav from "./MobileNav";

export default function Header() {
  const [show, setShow] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white backdrop-blur-xl shadow-md transition-all duration-500 transform",
        show || !["/"].includes(pathName)
          ? "translate-y-0 opacity-100 py-3 md:py-4"
          : "-translate-y-full opacity-0 h-0",
      )}>
      <div className="flex items-center justify-between px-6 lg:px-16 mx-auto max-w-[1920px]">
        <div className="flex justify-between items-center">
          <a href="/" className="text-3xl lg:text-4xl font-black tracking-tighter transition-all active:scale-95 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {siteConfig.shortName.toUpperCase()}<span className="text-primary">.</span>
          </a>
        </div>

        <NavMenu />
        <MobileNav />
      </div>
    </header>
  );
}
