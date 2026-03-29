import type { Route } from "next";
import NavigationLink from "./NavigationLink";

const NAV_ITEMS = [
  {
    text: "Milestones",
    path: "/milestones",
  },
  {
    text: "Services",
    path: "/services",
  },
  {
    text: "Media Coverage",
    path: "/media-coverage",
  },
  {
    text: "Reviews",
    path: "/reviews",
  },
];

export default function NavMenu() {
  return (
    <nav className="flex">
      <ul className="flex flex-row gap-2 text-base font-semibold text-white">
        {NAV_ITEMS.map((navItem) => (
          <li key={navItem.text} className="relative group">
            <NavigationLink href={navItem.path as Route}>
              {navItem.text}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
