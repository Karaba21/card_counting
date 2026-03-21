"use client";

import { useState, useCallback, useEffect } from "react";
import { createShoe } from "@/lib/deck";
import { Card } from "@/lib/hiLo";
import { getRunningCount, getTrueCount, getDecksRemaining } from "@/lib/counting";
import { PracticeSettings, PracticeStats, saveStats, loadStats, defaultStats } from "@/lib/storage";

export type Feedback = {
    correct: boolean;
    message: string;
    delta: number;
    actualRunningCount: number;
};

export type GameState = "playing" | "asking" | "feedback";

export function usePractice(settings: PracticeSettings) {
    // Game Flow
    const [shoe, setShoe] = useState<Card[]>([]);
    const [currentCards, setCurrentCards] = useState<Card[]>([]);
    const [gameState, setGameState] = useState<GameState>("playing");
    const [cardsUntilAsk, setCardsUntilAsk] = useState(-1);

    // Counts (does not include currentCards)
    const [runningCount, setRunningCount] = useState(0);
    const [trueCount, setTrueCount] = useState(0);

    // Global Status & Stats
    const [isPlaying, setIsPlaying] = useState(false);
    const [cardsSeenCount, setCardsSeenCount] = useState(0);
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [stats, setStats] = useState<PracticeStats>(defaultStats);
    const [streak, setStreak] = useState(0);

    // Load stats
    useEffect(() => {
        setStats(loadStats());
    }, []);

    const resetGame = useCallback(() => {
        const newShoe = createShoe(settings.decks || 6);
        const numToDraw = settings.gameMode === "basic" ? 1 
                        : settings.gameMode === "intermediate" ? settings.cardsPerRound 
                        : 1;
        const cardsToDraw = newShoe.slice(0, numToDraw);
        
        setShoe(newShoe.slice(numToDraw));
        setRunningCount(0);
        setTrueCount(0);
        setCardsSeenCount(0);
        setCurrentCards(cardsToDraw);
        setFeedback(null);
        setStreak(0);
        setIsPlaying(true);
        
        if (settings.gameMode === "basic" || settings.gameMode === "intermediate") {
            setGameState("asking");
        } else {
            setGameState("playing");
            const newFreq = settings.askFrequency === "random" ? Math.floor(Math.random() * 8) + 5 : newShoe.length;
            setCardsUntilAsk(newFreq);
        }
    }, [settings.decks, settings.gameMode, settings.cardsPerRound, settings.askFrequency]);

    const nextRound = useCallback(() => {
        if (shoe.length === 0) {
            resetGame();
            return;
        }

        // Apply current cards to counts
        let currentDelta = 0;
        if (currentCards.length > 0) {
            currentDelta = getRunningCount(currentCards);
            setCardsSeenCount(prev => prev + currentCards.length);
            
            const newStats = { ...stats, totalCardsSeen: stats.totalCardsSeen + currentCards.length };
            setStats(newStats);
            saveStats(newStats);
        }

        const newRunningCount = runningCount + currentDelta;
        const decksRemaining = getDecksRemaining(shoe.length);
        const newTrueCount = getTrueCount(newRunningCount, decksRemaining);

        setRunningCount(newRunningCount);
        setTrueCount(newTrueCount);
        setFeedback(null);

        // Draw new cards
        const numToDraw = settings.gameMode === "basic" ? 1 
                        : settings.gameMode === "intermediate" ? settings.cardsPerRound 
                        : 1;

        if (shoe.length < numToDraw) {
            resetGame();
            return;
        }

        const cardsToDraw = shoe.slice(0, numToDraw);
        setShoe(shoe.slice(numToDraw));
        setCurrentCards(cardsToDraw);

        // Decide next state
        if (settings.gameMode === "basic" || settings.gameMode === "intermediate") {
            setGameState("asking");
        } else {
            // Advanced or Pro
            const nextAsk = cardsUntilAsk - 1;
            if (nextAsk <= 0 || shoe.length - numToDraw === 0) {
                setGameState("asking");
                const newFreq = settings.askFrequency === "random" ? Math.floor(Math.random() * 12) + 8 : shoe.length + 1;
                setCardsUntilAsk(newFreq);
            } else {
                setGameState("playing");
                setCardsUntilAsk(nextAsk);
            }
        }
    }, [shoe, currentCards, runningCount, stats, settings.gameMode, settings.cardsPerRound, settings.askFrequency, cardsUntilAsk, resetGame]);

    const submitAnswer = useCallback((userGuess: number) => {
        if (!currentCards.length) return;

        const currentDelta = getRunningCount(currentCards);
        const actualRunningCount = runningCount + currentDelta;
        const decksRemainingForTrue = getDecksRemaining(shoe.length); 
        const actualTrueCount = Math.round(getTrueCount(actualRunningCount, decksRemainingForTrue));

        let correctAnswer = 0;
        if (settings.gameMode === "basic" || settings.gameMode === "intermediate") {
            correctAnswer = currentDelta;
        } else if (settings.gameMode === "advanced") {
            correctAnswer = actualRunningCount;
        } else if (settings.gameMode === "pro") {
            correctAnswer = actualTrueCount;
        }

        const isCorrect = userGuess === correctAnswer;

        // Update Stats
        const newStats = { ...stats };
        if (isCorrect) {
            newStats.correctAnswers += 1;
            setStreak(s => s + 1);
        } else {
            newStats.incorrectAnswers += 1;
            setStreak(0);
        }
        setStats(newStats);
        saveStats(newStats);

        setFeedback({
            correct: isCorrect,
            message: isCorrect ? "¡Correcto!" : `Incorrecto. Era ${correctAnswer > 0 ? '+' : ''}${correctAnswer}.`,
            delta: currentDelta,
            actualRunningCount: actualRunningCount
        });
        setGameState("feedback");
    }, [currentCards, runningCount, shoe.length, stats, settings.gameMode]);

    const stopGame = useCallback(() => {
        setShoe([]);
        setCurrentCards([]);
        setRunningCount(0);
        setTrueCount(0);
        setCardsSeenCount(0);
        setFeedback(null);
        setStreak(0);
        setIsPlaying(false);
    }, []);

    return {
        shoe,
        currentCards,
        gameState,
        runningCount, // Used for HUD. HUD should probably display the count BEFORE the current cards are applied.
        trueCount,
        cardsSeenCount,
        feedback,
        streak,
        stats,
        isPlaying,
        nextRound,
        submitAnswer,
        resetGame,
        stopGame
    };
}
