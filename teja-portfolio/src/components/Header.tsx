"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "transition-colors duration-300",
        scrolled ? "backdrop-blur-md bg-background/60 border-b border-foreground/10" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="#home" className="font-semibold tracking-tight text-lg">
          Teja Srinivas
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-foreground/80 hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="sm:hidden" />
      </div>
    </header>
  );
}
