
import { learnSections } from "@/content/learnContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LearnPage() {
    return (
        <div className="flex flex-col md:flex-row gap-8 py-8 w-full max-w-6xl mx-auto">
            {/* Table of Contents - Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
                <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 sticky top-20">
                    <h3 className="font-bold mb-4 text-lg">Índice</h3>
                    <nav className="flex flex-col space-y-2 text-sm">
                        {learnSections.map((section) => (
                            <Link
                                key={section.id}
                                href={`#${section.id}`}
                                className="hover:underline text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                            >
                                {section.title}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Content */}
            <article className="flex-1 space-y-12">
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Guía Completa de Card Counting
                    </h1>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400">
                        Domina el arte de vencer a la casa con estadística.
                    </p>
                </div>

                {learnSections.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        className="scroll-mt-24 space-y-6 pb-8 border-b border-neutral-200 dark:border-neutral-800 last:border-0"
                    >
                        <h2 className="text-3xl font-bold tracking-tight">{section.title}</h2>

                        <div className="space-y-6">
                            {section.blocks.map((block, idx) => {
                                if (block.type === "text") {
                                    return (
                                        <div key={idx} className="space-y-4">
                                            {Array.isArray(block.content)
                                                ? block.content.map((p, i) => (
                                                    <p key={i} className="leading-7 text-lg text-neutral-700 dark:text-neutral-300">
                                                        {p}
                                                    </p>
                                                ))
                                                : (
                                                    <p className="leading-7 text-lg text-neutral-700 dark:text-neutral-300">
                                                        {block.content}
                                                    </p>
                                                )}
                                        </div>
                                    );
                                }

                                if (block.type === "pro-tip") {
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded-r-md"
                                        >
                                            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-1">
                                                💡 {block.heading || "Pro Tip"}
                                            </h4>
                                            <p className="text-blue-700 dark:text-blue-200">{block.content}</p>
                                        </div>
                                    );
                                }

                                if (block.type === "warning") {
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-4 rounded-r-md"
                                        >
                                            <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-1">
                                                ⚠️ {block.heading || "Atención"}
                                            </h4>
                                            <p className="text-yellow-700 dark:text-yellow-200 font-mono text-lg">{block.content}</p>
                                        </div>
                                    );
                                }

                                if (block.type === "example") {
                                    return (
                                        <div
                                            key={idx}
                                            className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700"
                                        >
                                            <h4 className="font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                                                📌 Ejemplo:
                                            </h4>
                                            <p className="italic text-neutral-600 dark:text-neutral-300">{block.content}</p>
                                        </div>
                                    );
                                }

                                if (block.type === "chart") {
                                    return (
                                        <div
                                            key={idx}
                                            className="p-6 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20"
                                        >
                                            <h4 className="font-bold text-lg mb-4 text-blue-800 dark:text-blue-200">
                                                {block.heading}
                                            </h4>
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4">
                                                    <div className="text-2xl font-bold text-green-600">+1</div>
                                                    <div className="text-sm font-semibold mt-1">2 – 6</div>
                                                    <div className="text-xs text-neutral-500 mt-1">Cartas Bajas</div>
                                                </div>
                                                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4">
                                                    <div className="text-2xl font-bold text-neutral-500">0</div>
                                                    <div className="text-sm font-semibold mt-1">7 – 9</div>
                                                    <div className="text-xs text-neutral-500 mt-1">Cartas Neutras</div>
                                                </div>
                                                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4">
                                                    <div className="text-2xl font-bold text-red-600">-1</div>
                                                    <div className="text-sm font-semibold mt-1">10 – A</div>
                                                    <div className="text-xs text-neutral-500 mt-1">Cartas Altas</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </section>
                ))}

                <div className="py-8">
                    <Link href="/practice">
                        <Button size="lg" className="text-lg px-8 py-6">
                            Ir a Practicar lo Aprendido →
                        </Button>
                    </Link>
                </div>
            </article>
        </div>
    );
}
