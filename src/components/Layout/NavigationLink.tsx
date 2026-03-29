"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavigationLink({
  href,
  className,
  ...rest
}: React.ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "transition-colors flex-center transition-border duration-200 rounded-full border px-4 py-1",
        isActive
          ? "border-primary-accent"
          : "border-transparent hover:border-primary-accent",
        className,
      )}
      href={href}
      {...rest}
    />
  );
}
