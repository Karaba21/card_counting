"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
    const pathname = usePathname();
    const { lang, setLang, t } = useLanguage();

    const navLinks = [
        { href: "/learn", labelKey: "nav_learn" as const },
        { href: "/practice", labelKey: "nav_practice" as const },
        { href: "/betting", labelKey: "nav_betting" as const },
        { href: "/faq", labelKey: "nav_faq" as const },
    ];

    return (
        <header
            className="sticky top-0 z-50 w-full"
            style={{
                background: "hsl(220 22% 7% / 0.92)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderBottom: "1px solid hsl(220 15% 18% / 0.8)",
                boxShadow: "0 1px 40px hsl(220 25% 4% / 0.6)",
            }}
        >
            <div className="mx-auto max-w-7xl px-4 md:px-8 flex h-16 items-center">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 shrink-0 group"
                    style={{ textDecoration: "none" }}
                >
                    {/* Mini card icon */}
                    <div
                        className="w-8 h-8 rounded-md flex items-center justify-center text-sm transition-transform duration-200 group-hover:scale-110"
                        style={{
                            background: "linear-gradient(135deg, hsl(42 80% 54%) 0%, hsl(42 72% 44%) 100%)",
                            boxShadow: "0 2px 8px hsl(42 80% 56% / 0.4)",
                            color: "hsl(220 25% 8%)",
                            fontWeight: 900,
                            fontFamily: "var(--font-heading)",
                        }}
                    >
                        ♠
                    </div>
                    <span
                        className="text-lg font-bold tracking-tight"
                        style={{
                            fontFamily: "var(--font-heading)",
                            color: "hsl(42 20% 94%)",
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Card<span style={{ color: "hsl(42 80% 60%)" }}>Counter</span>
                    </span>
                </Link>



                {/* Nav links */}
                <nav className="hidden md:flex flex-1 items-center justify-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150",
                                )}
                                style={{
                                    color: isActive ? "hsl(42 80% 65%)" : "hsl(220 10% 68%)",
                                    background: isActive ? "hsl(42 80% 56% / 0.08)" : "transparent",
                                    fontWeight: isActive ? 600 : 400,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.color = "hsl(42 20% 92%)";
                                        (e.currentTarget as HTMLElement).style.background = "hsl(220 15% 20% / 0.6)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.color = "hsl(220 10% 68%)";
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                    }
                                }}
                            >
                                {t(link.labelKey)}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-3 shrink-0">

                    {/* Language toggle */}
                    <button
                        onClick={() => setLang(lang === "es" ? "en" : "es")}
                        aria-label="Toggle language"
                        className="relative flex items-center gap-0.5 px-1 py-1 rounded-lg transition-all duration-200 overflow-hidden"
                        style={{
                            background: "hsl(220 18% 14%)",
                            border: "1px solid hsl(220 15% 24%)",
                        }}
                    >
                        {(["es", "en"] as const).map((l) => {
                            const active = lang === l;
                            return (
                                <span
                                    key={l}
                                    className="relative px-2 py-0.5 rounded-md text-xs font-bold tracking-wide transition-all duration-200"
                                    style={{
                                        background: active ? "hsl(42 80% 54%)" : "transparent",
                                        color: active ? "hsl(220 25% 8%)" : "hsl(220 10% 50%)",
                                        boxShadow: active ? "0 1px 6px hsl(42 80% 56% / 0.4)" : "none",
                                    }}
                                >
                                    {l.toUpperCase()}
                                </span>
                            );
                        })}
                    </button>

                    {/* CTA button */}
                    <Link href="/practice">
                        <button
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0"
                            style={{
                                background: "linear-gradient(135deg, hsl(42 80% 55%) 0%, hsl(42 72% 45%) 100%)",
                                color: "hsl(220 25% 8%)",
                                boxShadow: "0 2px 14px hsl(42 80% 56% / 0.3), 0 1px 0 hsl(42 90% 72% / 0.35) inset",
                                letterSpacing: "0.01em",
                            }}
                        >
                            {t("nav_cta")}
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
