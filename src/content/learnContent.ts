
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

export const learnSections: LearnSection[] = [
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
];
