import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        width={128}
        height={128}
        src="/logo.webp"
        className="rounded-md w-auto h-16"
        alt="logo"
      />
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
