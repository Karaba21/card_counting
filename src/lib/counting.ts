import { Card, getHiLoValue } from "./hiLo";

/**
 * Calcula el Running Count (suma acumulada) de un array de cartas usando Hi-Lo.
 */
export function getRunningCount(cards: Card[]): number {
    return cards.reduce((acc, card) => acc + getHiLoValue(card.rank), 0);
}

/**
 * Calcula el True Count = Running Count / Mazos Restantes.
 * @param runningCount La suma acumulada Hi-Lo.
 * @param decksRemaining Estimado de mazos restantes en el zapato.
 */
export function getTrueCount(runningCount: number, decksRemaining: number): number {
    if (decksRemaining < 0.5) return runningCount; // Evitar distorsiones al final
    return runningCount / decksRemaining;
}

/**
 * Estima cuántos mazos quedan en el zapato dado el número de cartas restantes.
 */
export function getDecksRemaining(cardsRemainingInShoe: number): number {
    return Math.max(0.5, cardsRemainingInShoe / 52);
}
