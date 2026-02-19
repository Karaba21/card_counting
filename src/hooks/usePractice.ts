"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, createShoe } from "@/lib/deck";
import { getRunningCount, getTrueCount, getDecksRemaining } from "@/lib/counting";
import { PracticeSettings, PracticeStats, saveStats, loadStats, defaultStats } from "@/lib/storage";

export type Feedback = {
    correct: boolean;
    message: string;
    delta: number;
};

export function usePractice(settings: PracticeSettings) {
    // Game State
    const [shoe, setShoe] = useState<Card[]>([]);
    const [currentCards, setCurrentCards] = useState<Card[]>([]);

    // Counts
    const [runningCount, setRunningCount] = useState(0);
    const [trueCount, setTrueCount] = useState(0);

    // Game Status
    const [isPlaying, setIsPlaying] = useState(false);
    const [cardsSeenCount, setCardsSeenCount] = useState(0);

    // Feedback & Stats
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [stats, setStats] = useState<PracticeStats>(defaultStats);
    const [streak, setStreak] = useState(0);

    // Load stats
    useEffect(() => {
        setStats(loadStats());
    }, []);

    // Reset / Start Game
    const resetGame = useCallback(() => {
        const newShoe = createShoe(settings.decks || 6);
        setShoe(newShoe);
        setRunningCount(0);
        setTrueCount(0);
        setCardsSeenCount(0);
        setCurrentCards([]);
        setFeedback(null);
        setStreak(0);
        setIsPlaying(true);
        // Draw first hand automatically on start?
        // We can't do it here easily due to state updates.
        // Let's rely on UI "Start" or "Next" button.
    }, [settings.decks]);

    // Draw Next Hand
    const drawCards = useCallback(() => {
        if (shoe.length < settings.cardsPerRound) {
            // Reshuffle or End Game logic could go here
            // For now, just reset if empty, or notify user.
            // Let's reset for simplicity in MVP.
            resetGame();
            return;
        }

        // Only draw if feedback is cleared or we are ready for next?
        // Actually, distinct steps: 1. Draw. 2. Guess. 3. Feedback. 4. Next (Draw).
        // So if feedback is present, 'drawCards' clears it and draws new.

        // Update count with PREVIOUS hand (already done in submitAnswer)
        // Draw NEW hand
        const cardsToDraw = shoe.slice(0, settings.cardsPerRound);
        const remainingShoe = shoe.slice(settings.cardsPerRound);

        setShoe(remainingShoe);
        setCurrentCards(cardsToDraw);
        setFeedback(null);

    }, [shoe, settings.cardsPerRound, resetGame]);

    // Submit Answer
    const submitAnswer = useCallback((userDelta: number) => {
        if (!currentCards.length) return;

        const correctDelta = currentCards.reduce((acc, card) => {
            // We need to import getHiLoValue or calculate here
            // Ideally use helper from counting.ts which uses single card value logic?
            // counting.ts: getRunningCount(cards)
            return getRunningCount([card]) + acc;
        }, 0);

        // Wait, getRunningCount takes array.
        const actualDelta = getRunningCount(currentCards);

        const isCorrect = userDelta === actualDelta;

        // Update Stats
        const newStats = { ...stats };
        if (isCorrect) {
            newStats.correctAnswers += 1;
            setStreak(s => s + 1);
        } else {
            newStats.incorrectAnswers += 1;
            setStreak(0);
        }
        newStats.totalCardsSeen += currentCards.length;
        setStats(newStats);
        saveStats(newStats);

        // Update Global Counts
        const newRunningCount = runningCount + actualDelta;
        const decksRemaining = getDecksRemaining(shoe.length); // shoe.length is ALREADY reduced by drawCards
        const newTrueCount = getTrueCount(newRunningCount, decksRemaining);

        setRunningCount(newRunningCount);
        setTrueCount(newTrueCount);
        setCardsSeenCount(prev => prev + currentCards.length);

        setFeedback({
            correct: isCorrect,
            message: isCorrect ? "¡Correcto!" : `Incorrecto. Era ${actualDelta > 0 ? '+' : ''}${actualDelta}.`,
            delta: actualDelta
        });

    }, [currentCards, runningCount, shoe.length, stats]);

    return {
        shoe,
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
        resetGame
    };
}
