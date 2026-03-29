"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/constants";
import { cn } from "@/lib/utils";
import NavMenu from "./NavMenu";

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
        "sticky top-0 z-50 w-full bg-transparent backdrop-blur-md shadow-md transition-transform duration-500 transform",
        show || !["/"].includes(pathName)
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 h-0",
      )}>
      <div className="flex items-center justify-between lg:px-16 p-4">
        <div className="flex justify-between items-center mix-blend-screen">
          <a href="/" className="text-4xl text-white font-extrabold">
            {siteConfig.shortName}
          </a>
        </div>
        <NavMenu />
        <div className="hidden lg:flex items-center">
          <a href="#contact" className="hidden sm:inline-flex bg-primary hover:bg-primary/80 text-white px-7 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
