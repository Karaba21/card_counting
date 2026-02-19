import { Card, SUITS, RANKS } from "./hiLo";

/**
 * Crea un mazo estándar de 52 cartas.
 */
export function createDeck(): Card[] {
    const cards: Card[] = [];
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            cards.push({
                suit,
                rank,
                id: `${rank}-${suit}-${Math.random().toString(36).slice(2)}`,
            });
        }
    }
    return cards;
}

/**
 * Baraja un array de cartas usando Fisher-Yates.
 */
export function shuffle(cards: Card[]): Card[] {
    const arr = [...cards];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Crea un zapato (shoe) de N mazos barajado.
 */
export function createShoe(numDecks: number): Card[] {
    let shoe: Card[] = [];
    for (let i = 0; i < numDecks; i++) {
        shoe = shoe.concat(createDeck());
    }
    return shuffle(shoe);
}
