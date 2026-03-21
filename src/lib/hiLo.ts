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
    const suitInitial = card.suit.charAt(0).toUpperCase();
    return `/cards/${suitInitial}${card.rank}.svg`;
}
