"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/learn", label: "Aprender" },
    { href: "/practice", label: "Practicar" },
    { href: "/betting", label: "Estrategia" },
    { href: "/faq", label: "FAQ" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60">
            <div className="mx-auto max-w-7xl px-4 md:px-8 flex h-14 items-center gap-4">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-neutral-900 dark:text-white">
                    <span>♠️ CardCounter</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 mx-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "transition-colors hover:text-neutral-900 dark:hover:text-white",
                                pathname === link.href
                                    ? "text-neutral-900 font-semibold dark:text-white"
                                    : "text-neutral-500 dark:text-neutral-400"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="ml-auto flex items-center space-x-2">
                    <Link href="/practice">
                        <Button size="sm">Empezar a Practicar</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
