"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePractice } from "@/hooks/usePractice";
import { getCardImageSrc } from "@/lib/hiLo";
import { defaultSettings, loadSettings, saveSettings, PracticeSettings } from "@/lib/storage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { RotateCcw, ChevronRight, Eye } from "lucide-react";

export function PracticeBoard() {
    const [settings, setSettings] = useState<PracticeSettings>(defaultSettings);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setSettings(loadSettings());
        setMounted(true);
    }, []);

    const {
        currentCards,
        runningCount,
        trueCount,
        cardsSeenCount,
        feedback,
        streak,
        stats,
        isPlaying,
        drawCards,
        submitAnswer,
        resetGame,
    } = usePractice(settings);

    // Hotkeys: A=-1, S=0, D=+1, Enter=next
    useEffect(() => {
        if (!settings.hotkeys) return;

        const handleKey = (e: KeyboardEvent) => {
            // Don't fire if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (feedback) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    drawCards();
                }
                return;
            }

            if (!currentCards.length) return;

            if (e.key === "a" || e.key === "A") submitAnswer(-1);
            else if (e.key === "s" || e.key === "S") submitAnswer(0);
            else if (e.key === "d" || e.key === "D") submitAnswer(1);
            else if (e.key === "ArrowLeft") submitAnswer(-1);
            else if (e.key === "ArrowDown") submitAnswer(0);
            else if (e.key === "ArrowRight") submitAnswer(1);
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [feedback, currentCards, submitAnswer, drawCards, settings.hotkeys]);

    const totalShoeCards = settings.decks * 52;
    const progressPct = Math.round((cardsSeenCount / totalShoeCards) * 100);
    const accuracy =
        stats.correctAnswers + stats.incorrectAnswers > 0
            ? Math.round((stats.correctAnswers / (stats.correctAnswers + stats.incorrectAnswers)) * 100)
            : 0;

    if (!mounted) return null;

    // Empty state — show Start button
    if (!currentCards.length && isPlaying) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">¡Listo para practicar!</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                        Modo:{" "}
                        <span className="font-semibold text-blue-600">
                            {settings.mode === "training" ? "Entrenamiento" : "Examen"}
                        </span>{" "}
                        · {settings.decks} mazos
                    </p>
                </div>
                <Button onClick={drawCards} size="lg" className="text-lg px-8 py-6">
                    Empezar
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
            {/* --- HUD --- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                <UICard>
                    <CardHeader className="p-3 pb-1">
                        <CardTitle className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Racha</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-2xl font-bold">{streak} 🔥</CardContent>
                </UICard>

                <UICard>
                    <CardHeader className="p-3 pb-1">
                        <CardTitle className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Precisión</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-2xl font-bold">{accuracy}%</CardContent>
                </UICard>

                {settings.mode === "training" && (
                    <UICard className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30">
                        <CardHeader className="p-3 pb-1">
                            <CardTitle className="text-xs text-blue-600 dark:text-blue-400 font-medium">Running Count</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {runningCount > 0 ? `+${runningCount}` : runningCount}
                        </CardContent>
                    </UICard>
                )}

                {settings.mode === "training" && settings.trueCountMode && (
                    <UICard className="border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30">
                        <CardHeader className="p-3 pb-1">
                            <CardTitle className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">True Count</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {trueCount > 0 ? `+${trueCount.toFixed(1)}` : trueCount.toFixed(1)}
                        </CardContent>
                    </UICard>
                )}
            </div>

            {/* --- Progress Bar --- */}
            <div className="w-full space-y-1">
                <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{cardsSeenCount} cartas vistas</span>
                    <span>{totalShoeCards - cardsSeenCount} restantes</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
            </div>

            {/* --- Card Fan --- */}
            <div
                className="relative flex items-center justify-center w-full"
                style={{ height: "280px" }}
                aria-label="Cartas actuales"
                role="region"
            >
                {currentCards.map((card, idx) => {
                    const total = currentCards.length;
                    const offset = (idx - (total - 1) / 2) * 50;
                    const rotate = (idx - (total - 1) / 2) * 6;

                    return (
                        <div
                            key={card.id}
                            className="absolute transition-all duration-300 drop-shadow-xl"
                            style={{
                                transform: `translateX(${offset}px) rotate(${rotate}deg)`,
                                zIndex: idx,
                                width: "160px",
                                height: "224px",
                            }}
                        >
                            <div className="w-full h-full relative rounded-xl overflow-hidden bg-white border-2 border-neutral-200">
                                <Image
                                    src={getCardImageSrc(card)}
                                    alt={`${card.rank} de ${card.suit}`}
                                    fill
                                    className="object-contain p-1"
                                    onError={(e) => {
                                        // Fallback: show text placeholder
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        const parent = target.parentElement;
                                        if (parent && !parent.querySelector(".card-fallback")) {
                                            const fallback = document.createElement("div");
                                            fallback.className =
                                                "card-fallback absolute inset-0 flex flex-col items-center justify-center text-neutral-900";
                                            const suitSymbols: Record<string, string> = {
                                                spades: "♠",
                                                hearts: "♥",
                                                diamonds: "♦",
                                                clubs: "♣",
                                            };
                                            const isRed = card.suit === "hearts" || card.suit === "diamonds";
                                            fallback.innerHTML = `
                        <span class="text-4xl font-bold ${isRed ? "text-red-500" : "text-neutral-900"}">${card.rank}</span>
                        <span class="text-3xl ${isRed ? "text-red-500" : "text-neutral-900"}">${suitSymbols[card.suit] ?? card.suit}</span>
                      `;
                                            parent.appendChild(fallback);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- Input / Feedback --- */}
            <div className="w-full max-w-md space-y-4">
                {feedback ? (
                    /* Feedback State */
                    <div
                        className={cn(
                            "p-6 rounded-xl text-center space-y-3 border-2",
                            feedback.correct
                                ? "bg-green-50 dark:bg-green-950/30 border-green-400 text-green-800 dark:text-green-300"
                                : "bg-red-50 dark:bg-red-950/30 border-red-400 text-red-800 dark:text-red-300"
                        )}
                    >
                        <div className="text-4xl">{feedback.correct ? "✅" : "❌"}</div>
                        <h3 className="text-xl font-bold">{feedback.message}</h3>
                        {!feedback.correct && (
                            <p className="text-sm opacity-80">
                                El Running Count ahora es:{" "}
                                <span className="font-bold">{runningCount > 0 ? `+${runningCount}` : runningCount}</span>
                            </p>
                        )}
                        <Button
                            onClick={drawCards}
                            className="w-full mt-2"
                            size="lg"
                            autoFocus
                            aria-label="Siguiente mano"
                        >
                            Siguiente mano <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                        {settings.hotkeys && (
                            <p className="text-xs opacity-60">También podés presionar Enter o Espacio</p>
                        )}
                    </div>
                ) : (
                    /* Input State */
                    <div className="space-y-4">
                        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                            ¿Cuánto suman estas cartas en Hi-Lo?
                        </p>

                        {/* Quick buttons: range -3 to +3 */}
                        <div className="grid grid-cols-7 gap-2">
                            {[-3, -2, -1, 0, 1, 2, 3].map((val) => (
                                <Button
                                    key={val}
                                    variant="outline"
                                    size="lg"
                                    className="text-lg h-14 font-bold"
                                    onClick={() => submitAnswer(val)}
                                    aria-label={`Responder ${val > 0 ? "+" : ""}${val}`}
                                >
                                    {val > 0 ? `+${val}` : val}
                                </Button>
                            ))}
                        </div>

                        {settings.hotkeys && (
                            <p className="text-center text-xs text-neutral-400">
                                Teclado: A = -1 · S = 0 · D = +1
                            </p>
                        )}
                    </div>
                )}

                {/* Controls Row */}
                <div className="flex flex-wrap justify-between gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            alert(
                                `Running Count: ${runningCount > 0 ? "+" : ""}${runningCount}\nTrue Count: ${trueCount.toFixed(1)}`
                            );
                        }}
                        aria-label="Revelar conteo"
                        className="gap-1 text-xs"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Revelar Conteo
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            const newMode = settings.mode === "training" ? "exam" : "training";
                            const newSettings = { ...settings, mode: newMode as "training" | "exam" };
                            setSettings(newSettings);
                            saveSettings(newSettings);
                        }}
                        className="text-xs"
                    >
                        Modo: {settings.mode === "training" ? "Entrenamiento" : "Examen"}
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            resetGame();
                        }}
                        aria-label="Reiniciar partida"
                        className="gap-1 text-xs text-neutral-400 hover:text-red-500"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset
                    </Button>
                </div>

                {/* Settings Mini Panel */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs">Mazos:</label>
                        <select
                            className="flex-1 border border-neutral-200 dark:border-neutral-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                            value={settings.decks}
                            onChange={(e) => {
                                const newSettings = { ...settings, decks: Number(e.target.value) };
                                setSettings(newSettings);
                                saveSettings(newSettings);
                                resetGame();
                            }}
                        >
                            {[1, 2, 4, 6, 8].map((d) => (
                                <option key={d} value={d}>{d} {d === 1 ? "mazo" : "mazos"}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-neutral-500 dark:text-neutral-400 text-xs">Cartas:</label>
                        <select
                            className="flex-1 border border-neutral-200 dark:border-neutral-700 rounded-md px-2 py-1 text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                            value={settings.cardsPerRound}
                            onChange={(e) => {
                                const newSettings = { ...settings, cardsPerRound: Number(e.target.value) };
                                setSettings(newSettings);
                                saveSettings(newSettings);
                            }}
                        >
                            {[1, 2, 3].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
