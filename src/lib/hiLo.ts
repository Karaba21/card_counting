export type Suit = "spades" | "hearts" | "diamonds" | "clubs";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export type Card = {
    suit: Suit;
    rank: Rank;
    id: string; // Unique ID for keys
};

export const SUITS: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
export const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export function getHiLoValue(rank: Rank): number {
    if (["2", "3", "4", "5", "6"].includes(rank)) return 1;
    if (["7", "8", "9"].includes(rank)) return 0;
    if (["10", "J", "Q", "K", "A"].includes(rank)) return -1;
    return 0;
}

export function getCardImageSrc(card: Card): string {
    // Contract: /cards/{rank}_of_{suit}.png
    // Example: /cards/A_of_spades.png
    // Using lower case for safety, though user specified Mixed Case in example (A_of_spades), 
    // usually filenames are better handled if consistent.
    // The user example: A_of_spades.png. 
    // Code should be resilient.
    return `/cards/${card.rank}_of_${card.suit}.png`;
}
