"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/news") return pathname === "/" || pathname.startsWith("/news");
    return pathname.startsWith(path);
  };

  return (
    <header className="border-b border-border bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Energy Markets Intelligence
            </h1>
          </Link>
          <div className="text-sm text-muted font-body">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <nav className="flex gap-8 pb-3">
          <Link
            href="/news"
            className={`text-sm font-medium tracking-wide uppercase pb-1 border-b-2 transition-colors ${
              isActive("/news")
                ? "border-foreground text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            News
          </Link>
          <Link
            href="/learn"
            className={`text-sm font-medium tracking-wide uppercase pb-1 border-b-2 transition-colors ${
              isActive("/learn")
                ? "border-foreground text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            Learn
          </Link>
        </nav>
      </div>
    </header>
  );
}
