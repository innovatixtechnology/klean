"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, siteConfig } from "@/constants";
import type { Route } from "next";
import Image from "next/image";
import { Button } from "../ui/button";

interface IProps {
  textColor?: string;
  session?: any;
  onSignOut: () => void;
}

export default function MobileNav({ textColor = '', session, onSignOut }: Readonly<IProps>) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Toggle Menu"
        className="relative z-[101] p-2 text-foreground transition-opacity hover:opacity-80"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex h-6 w-7 flex-col justify-between overflow-hidden">
          <span className={`h-[3px] w-full origin-left bg-foreground transition-all duration-300 ${isOpen ? "rotate-45 translate-x-1 translate-y-[-1px] bg-white" : textColor}`}></span>
          <span className={`h-[3px] w-full bg-foreground transition-all duration-300 ${isOpen ? "translate-x-10" : textColor}`}></span>
          <span className={`h-[3px] w-full origin-left bg-foreground transition-all duration-300 ${isOpen ? "-rotate-45 translate-x-1 translate-y-[1px] bg-white" : textColor}`}></span>
        </div>
      </button>

      {/* Full-screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] h-screen w-screen bg-black/95 backdrop-blur-xl transition-all duration-500 ease-in-out ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <div className="flex h-full flex-col items-center justify-center space-y-8 px-10 pt-20">
          <Link href="/" className="absolute top-8 left-8 text-3xl font-black text-white mix-blend-difference" onClick={() => setIsOpen(false)}>
            <Image src={siteConfig.logo.src} alt={siteConfig.logo.alt} width={150} height={150} />
          </Link>

          <nav className="flex w-full flex-col space-y-6 text-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.text}
                href={item.path as Route}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-black text-white hover:text-primary transition-colors tracking-tighter"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="pt-10">
            {session?.user?.email ? <Link
              href={"/sign-in" as Route}
              className="rounded-full bg-primary px-12 py-5 text-xl font-bold text-white shadow-2xl shadow-primary/30 transition-transform active:scale-95"
              onClick={() => onSignOut()}
            >
              Sign Out
            </Link> : (<Button
              className="rounded-full bg-primary px-12 py-5 text-xl font-bold text-white shadow-2xl shadow-primary/30 transition-transform active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Button>)
            }
          </div>

          <div className="absolute bottom-12 flex space-x-6">
            <div className="h-1 w-12 rounded-full bg-white/20"></div>
            <div className="h-1 w-12 rounded-full bg-primary/40"></div>
            <div className="h-1 w-12 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
