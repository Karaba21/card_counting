"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePractice } from "@/hooks/usePractice";
import { getCardImageSrc } from "@/lib/hiLo";
import { defaultSettings, loadSettings, saveSettings, PracticeSettings, GameMode } from "@/lib/storage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { RotateCcw, ChevronRight, Eye, Home } from "lucide-react";
import { getDecksRemaining, getRunningCount, getTrueCount } from "@/lib/counting";

export function PracticeBoard() {
    const [settings, setSettings] = useState<PracticeSettings>(defaultSettings);
    const [mounted, setMounted] = useState(false);
    const [customInput, setCustomInput] = useState("");

    useEffect(() => {
        setSettings(loadSettings());
        setMounted(true);
    }, []);

    const {
        shoe,
        currentCards,
        gameState,
        runningCount,
        trueCount,
        cardsSeenCount,
        feedback,
        streak,
        stats,
        isPlaying,
        nextRound,
        submitAnswer,
        resetGame,
        stopGame,
    } = usePractice(settings);

    useEffect(() => {
        if (!settings.hotkeys) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (feedback || gameState === "playing") {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    nextRound();
                }
                return;
            }

            if (gameState === "asking" && (settings.gameMode === "basic" || settings.gameMode === "intermediate")) {
                if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") submitAnswer(-1);
                else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") submitAnswer(0);
                else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") submitAnswer(1);
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [feedback, gameState, submitAnswer, nextRound, settings]);

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseInt(customInput, 10);
        if (!isNaN(val)) {
            submitAnswer(val);
            setCustomInput("");
        }
    };

    const updateSetting = <K extends keyof PracticeSettings>(key: K, value: PracticeSettings[K]) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        saveSettings(newSettings);
    };

    const actualRunningCount = runningCount + getRunningCount(currentCards);
    const actualTrueCount = getTrueCount(actualRunningCount, getDecksRemaining(shoe.length));
    const actualCardsSeenCount = cardsSeenCount + currentCards.length;

    const totalShoeCards = settings.decks * 52;
    const progressPct = Math.round((actualCardsSeenCount / totalShoeCards) * 100);
    const accuracy =
        stats.correctAnswers + stats.incorrectAnswers > 0
            ? Math.round((stats.correctAnswers / (stats.correctAnswers + stats.incorrectAnswers)) * 100)
            : 0;

    if (!mounted) return null;

    if (!currentCards.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10 w-full max-w-5xl mx-auto py-12">
                <div className="text-center space-y-4 mb-6">
                    <h2 className="text-5xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">Entrenamiento</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
                        Selecciona tu modo de entrenamiento. Configura los mazos y la dificultad para empezar.
                    </p>
                </div>

                {/* Mode Selector Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                    {[
                        { id: "basic", name: "Básico", desc: "1 carta. Responde su valor (+1, 0, -1)." },
                        { id: "intermediate", name: "Intermedio", desc: "Varias cartas juntas. Calcula la suma." },
                        { id: "advanced", name: "Avanzado", desc: "Cartas sucesivas. Running Count." },
                        { id: "pro", name: "Pro", desc: "Running Count + True Count." },
                    ].map(mode => (
                        <button
                            key={mode.id}
                            onClick={() => updateSetting("gameMode", mode.id as GameMode)}
                            className={cn(
                                "flex flex-col items-center justify-center p-6 rounded-[2rem] border-4 text-center transition-all aspect-square",
                                settings.gameMode === mode.id
                                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-xl scale-[1.03]"
                                    : "border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:scale-[1.02]"
                            )}
                        >
                            <h3 className={cn("font-black text-2xl md:text-3xl mb-3", settings.gameMode === mode.id ? "text-blue-700 dark:text-blue-400" : "text-neutral-800 dark:text-neutral-100")}>{mode.name}</h3>
                            <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 px-2 leading-relaxed">{mode.desc}</p>
                        </button>
                    ))}
                </div>

                {/* Configuration Row */}
                <div className="flex flex-wrap items-center justify-center gap-4 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Mazos:</span>
                        <select
                            className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm font-medium"
                            value={settings.decks}
                            onChange={(e) => updateSetting("decks", Number(e.target.value))}
                        >
                            {[1, 2, 4, 6, 8].map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    {settings.gameMode === "intermediate" && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Cartas por Ronda:</span>
                            <select
                                className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm font-medium"
                                value={settings.cardsPerRound}
                                onChange={(e) => updateSetting("cardsPerRound", Number(e.target.value))}
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {(settings.gameMode === "advanced" || settings.gameMode === "pro") && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Test:</span>
                            <select
                                className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-sm font-medium"
                                value={settings.askFrequency}
                                onChange={(e) => updateSetting("askFrequency", e.target.value as "random" | "end")}
                            >
                                <option value="random">Aleatorio</option>
                                <option value="end">Al finalizar el zapato</option>
                            </select>
                        </div>
                    )}
                </div>

                <Button onClick={resetGame} size="lg" className="text-xl px-12 py-8 mt-4 rounded-full shadow-lg hover:-translate-y-1 transition-transform bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    ¡Comenzar!
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

                {(settings.gameMode === "advanced" || settings.gameMode === "pro") && (
                    <div className="flex items-stretch gap-2">
                        <UICard className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 flex-1">
                            <CardHeader className="p-3 pb-1">
                                <CardTitle className="text-xs text-blue-600 dark:text-blue-400 font-medium">Running Count</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {settings.mode === "training"
                                    ? (actualRunningCount > 0 ? `+${actualRunningCount}` : actualRunningCount)
                                    : "—"}
                            </CardContent>
                        </UICard>
                        <button
                            onClick={() => updateSetting("mode", settings.mode === "training" ? "exam" : "training")}
                            className="self-center text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-300 dark:border-blue-700 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors whitespace-nowrap"
                        >
                            {settings.mode === "training" ? "Hide Count" : "Show Count"}
                        </button>
                    </div>
                )}

                {settings.mode === "training" && settings.trueCountMode && (
                    <UICard className="border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30">
                        <CardHeader className="p-3 pb-1">
                            <CardTitle className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">True Count</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {actualTrueCount > 0 ? `+${actualTrueCount.toFixed(1)}` : actualTrueCount.toFixed(1)}
                        </CardContent>
                    </UICard>
                )}
            </div>

            {/* --- Progress Bar --- */}
            <div className="w-full space-y-1">
                <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{actualCardsSeenCount} cartas vistas</span>
                    <span>{totalShoeCards - actualCardsSeenCount} restantes</span>
                </div>
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
            </div>

            {/* --- Cards Display --- */}
            <div
                className="flex flex-wrap items-center justify-center w-full gap-4 py-8"
                aria-label="Cartas actuales"
                role="region"
            >
                {currentCards.map((card) => {
                    return (
                        <div
                            key={card.id}
                            className="relative transition-all duration-300 drop-shadow-xl hover:-translate-y-2 cursor-pointer"
                            onClick={() => {
                                if (gameState === "playing") nextRound();
                            }}
                            style={{
                                width: "160px",
                                height: "224px",
                            }}
                        >
                            <div className="w-full h-full relative">
                                <Image
                                    src={getCardImageSrc(card)}
                                    alt={`${card.rank} de ${card.suit}`}
                                    fill
                                    className="object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        const parent = target.parentElement;
                                        if (parent && !parent.querySelector(".card-fallback")) {
                                            const fallback = document.createElement("div");
                                            fallback.className =
                                                "card-fallback absolute inset-0 flex flex-col items-center justify-center text-neutral-900 bg-white border border-neutral-300 rounded-xl shadow-md";
                                            const suitSymbols: Record<string, string> = {
                                                spades: "♠",
                                                hearts: "♥",
                                                diamonds: "♦",
                                                clubs: "♣",
                                            };
                                            const isRed = card.suit === "hearts" || card.suit === "diamonds";
                                            fallback.innerHTML = `
                                                <span class="text-5xl font-bold ${isRed ? "text-red-500" : "text-neutral-900"}">${card.rank}</span>
                                                <span class="text-4xl ${isRed ? "text-red-500" : "text-neutral-900"}">${suitSymbols[card.suit] ?? card.suit}</span>
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

            {/* --- Interactivity (Input / Feedback / Next) --- */}
            <div className="w-full max-w-md space-y-4">
                {gameState === "playing" && (
                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={nextRound}
                            className="w-full h-14 text-lg font-semibold bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-900"
                            size="lg"
                            autoFocus
                        >
                            Siguiente Carta <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                        {settings.hotkeys && (
                            <p className="text-center text-xs text-neutral-400">
                                También podés presionar Enter, Espacio, o tocar la carta
                            </p>
                        )}
                    </div>
                )}

                {gameState === "asking" && (settings.gameMode === "basic" || settings.gameMode === "intermediate") && (
                    <div className="space-y-4">
                        <p className="text-center font-medium text-neutral-600 dark:text-neutral-300">
                            <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                                Modo {settings.gameMode === "basic" ? "Básico" : "Intermedio"}
                            </span>
                            ¿Cuánto suman estas cartas?
                        </p>
                        <div className={`grid gap-2 ${settings.gameMode === "basic" ? "grid-cols-3" : "grid-cols-7"}`}>
                            {(settings.gameMode === "basic" ? [-1, 0, 1] : [-3, -2, -1, 0, 1, 2, 3]).map((val) => (
                                <Button
                                    key={val}
                                    variant="outline"
                                    size="lg"
                                    className="text-lg h-14 font-bold bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow"
                                    onClick={() => submitAnswer(val)}
                                >
                                    {val > 0 ? `+${val}` : val}
                                </Button>
                            ))}
                        </div>
                        {settings.hotkeys && settings.gameMode === "basic" && (
                            <p className="text-center text-xs text-neutral-400">
                                Atajos de teclado: A = -1 · S = 0 · D = +1
                            </p>
                        )}
                    </div>
                )}

                {gameState === "asking" && (settings.gameMode === "advanced" || settings.gameMode === "pro") && (
                    <div className="space-y-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm">
                        <p className="text-center font-bold text-xl text-neutral-800 dark:text-neutral-100">
                            <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 font-normal">
                                Modo {settings.gameMode === "pro" ? "Pro" : "Avanzado"}
                            </span>
                            ¿Cuál es el <span className="text-blue-600 dark:text-blue-400">{settings.gameMode === "pro" ? "True Count" : "Running Count"}</span> actual?
                        </p>
                        {settings.gameMode === "pro" && (
                            <p className="text-center text-sm font-medium text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg py-2">
                                Mazos restantes estimados: <strong className="text-neutral-900 dark:text-white">{getDecksRemaining(shoe.length).toFixed(1)}</strong>
                            </p>
                        )}
                        <form onSubmit={handleCustomSubmit} className="flex gap-3">
                            <input
                                type="number"
                                required
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                className="flex-1 w-full border-2 border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 rounded-xl px-4 text-center text-3xl font-bold appearance-none bg-blue-50/50 dark:bg-neutral-950 dark:text-blue-400 py-3"
                                placeholder="0"
                                autoFocus
                            />
                            <Button type="submit" size="lg" className="h-[auto] px-8 font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
                                Enviar
                            </Button>
                        </form>
                    </div>
                )}

                {gameState === "feedback" && feedback && (
                    <div
                        className={cn(
                            "p-6 rounded-2xl text-center space-y-3 border-2 shadow-sm animate-in fade-in slide-in-from-bottom-2",
                            feedback.correct
                                ? "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-800 dark:text-green-300"
                                : "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-800 dark:text-red-300"
                        )}
                    >
                        <div className="text-5xl">{feedback.correct ? "✅" : "❌"}</div>
                        <h3 className="text-2xl font-bold">{feedback.message}</h3>
                        {!feedback.correct && (settings.gameMode === "advanced" || settings.gameMode === "pro") && (
                            <p className="text-md opacity-90 mt-2 font-medium">
                                El Running Count actual es:{" "}
                                <span className="font-bold">{feedback.actualRunningCount > 0 ? `+${feedback.actualRunningCount}` : feedback.actualRunningCount}</span>
                            </p>
                        )}
                        <Button
                            onClick={nextRound}
                            className={cn(
                                "w-full mt-4 h-14 text-lg font-bold text-white transition-colors",
                                feedback.correct ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                            )}
                            size="lg"
                            autoFocus
                        >
                            Siguiente mano <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                        {settings.hotkeys && (
                            <p className="text-xs opacity-60">También podés presionar Enter o Espacio</p>
                        )}
                    </div>
                )}

                {/* --- Extra Controls --- */}
                <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            alert(
                                `Running Count actual: ${actualRunningCount > 0 ? "+" : ""}${actualRunningCount}\nTrue Count actual: ${actualTrueCount.toFixed(1)}`
                            );
                        }}
                        className="gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        <Eye className="h-4 w-4" />
                        Revelar Conteo
                    </Button>



                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetGame}
                        className="gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 dark:hover:text-amber-400"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset Partida
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={stopGame}
                        className="gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:hover:text-red-400"
                    >
                        <Home className="h-4 w-4" />
                        Menú Principal
                    </Button>
                </div>
            </div>
        </div>
    );
}
