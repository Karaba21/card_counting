import { Lang } from "@/lib/i18n";

export type LearnBlock = {
    type: "text" | "pro-tip" | "example" | "warning" | "chart";
    heading?: string;
    content: string | string[]; // Paragraphs or list items
};

export type LearnSection = {
    id: string;
    title: string;
    slug: string;
    blocks: LearnBlock[];
};

export const learnContent: Record<Lang, LearnSection[]> = {
    es: [
        {
            id: "basics",
            title: "1. Conceptos Básicos",
            slug: "basics",
            blocks: [
                {
                    type: "text",
                    content: [
                        "El Blackjack es uno de los pocos juegos de casino donde las decisiones del jugador afectan la ventaja de la casa.",
                        "Contar cartas NO es memorizar cada carta que sale. Es llevar una cuenta simple (+1, -1) para saber si quedan cartas altas o bajas en el mazo.",
                    ],
                },
                {
                    type: "pro-tip",
                    heading: "Mito común",
                    content: "No necesitás ser un genio matemático ni tener memoria fotográfica. Solo necesitás sumar y restar 1.",
                },
            ],
        },
        {
            id: "hi-lo",
            title: "2. El Sistema Hi-Lo",
            slug: "hi-lo",
            blocks: [
                {
                    type: "text",
                    content: [
                        "El sistema Hi-Lo asigna un valor a cada carta para simplificar el seguimiento.",
                        "La idea es mantener un 'Running Count' que empieza en 0.",
                    ],
                },
                {
                    type: "chart",
                    heading: "Valores de las cartas",
                    content: "2-6: +1 | 7-9: 0 | 10-A: -1",
                },
                {
                    type: "example",
                    heading: "Ejemplo de ronda",
                    content: "Sale un Rey (-1), un 5 (+1) y un 7 (0). La cuenta cambia: -1 + 1 + 0 = 0.",
                },
            ],
        },
        {
            id: "running-true",
            title: "3. Running Count vs True Count",
            slug: "running-true",
            blocks: [
                {
                    type: "text",
                    content: [
                        "El Running Count es la suma acumulada que llevás en tu cabeza.",
                        "El True Count ajusta ese número según cuántos mazos quedan por jugar. Esto es crucial en juegos de múltiples mazos.",
                    ],
                },
                {
                    type: "warning",
                    heading: "Fórmula Clave",
                    content: "True Count = Running Count / Mazos Restantes estimados",
                },
                {
                    type: "example",
                    content: "Running Count es +6 y quedan 2 mazos. True Count = +3. ¡Es un momento excelente para apostar fuerte!",
                },
            ],
        },
        {
            id: "betting",
            title: "4. Estrategia de Apuestas",
            slug: "betting",
            blocks: [
                {
                    type: "text",
                    content: [
                        "La ventaja del jugador aparece cuando el True Count es alto (+1, +2, etc).",
                        "Ahí es cuando debés aumentar tu apuesta. Si el True Count es bajo o negativo, apostá el mínimo.",
                    ],
                },
            ],
        },
    ],
    en: [
        {
            id: "basics",
            title: "1. Basic Concepts",
            slug: "basics",
            blocks: [
                {
                    type: "text",
                    content: [
                        "Blackjack is one of the few casino games where the player's decisions affect the house edge.",
                        "Card counting is NOT about memorizing every card that comes out. It's about keeping a simple tally (+1, -1) to know whether high or low cards remain in the deck.",
                    ],
                },
                {
                    type: "pro-tip",
                    heading: "Common myth",
                    content: "You don't need to be a math genius or have a photographic memory. You only need to add and subtract 1.",
                },
            ],
        },
        {
            id: "hi-lo",
            title: "2. The Hi-Lo System",
            slug: "hi-lo",
            blocks: [
                {
                    type: "text",
                    content: [
                        "The Hi-Lo system assigns a value to each card to simplify tracking.",
                        "The goal is to maintain a 'Running Count' that starts at 0.",
                    ],
                },
                {
                    type: "chart",
                    heading: "Card values",
                    content: "2-6: +1 | 7-9: 0 | 10-A: -1",
                },
                {
                    type: "example",
                    heading: "Round example",
                    content: "A King comes out (-1), then a 5 (+1) and a 7 (0). The count changes: -1 + 1 + 0 = 0.",
                },
            ],
        },
        {
            id: "running-true",
            title: "3. Running Count vs True Count",
            slug: "running-true",
            blocks: [
                {
                    type: "text",
                    content: [
                        "The Running Count is the cumulative total you keep in your head.",
                        "The True Count adjusts that number based on how many decks remain to be played. This is crucial in multi-deck games.",
                    ],
                },
                {
                    type: "warning",
                    heading: "Key Formula",
                    content: "True Count = Running Count / Estimated Remaining Decks",
                },
                {
                    type: "example",
                    content: "Running Count is +6 and 2 decks remain. True Count = +3. An excellent moment to bet big!",
                },
            ],
        },
        {
            id: "betting",
            title: "4. Betting Strategy",
            slug: "betting",
            blocks: [
                {
                    type: "text",
                    content: [
                        "The player's advantage appears when the True Count is high (+1, +2, etc).",
                        "That's when you should increase your bet. If the True Count is low or negative, bet the minimum.",
                    ],
                },
            ],
        },
    ],
};

// Legacy export for backward compat — defaults to Spanish
export const learnSections = learnContent.es;
