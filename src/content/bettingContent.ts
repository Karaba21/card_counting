import { Lang } from "@/lib/i18n";

export type BetStage = {
    trueCount: number;
    units: number;
    description: string;
    risk: "Low" | "Medium" | "High";
};

export type BettingAdvice = {
    title: string;
    content: string;
};

export const betSpread: BetStage[] = [
    { trueCount: 0, units: 1, description: "Minimum bet. House has a slight edge.", risk: "Low" },
    { trueCount: 1, units: 2, description: "Advantage starts to shift. Double your bet.", risk: "Low" },
    { trueCount: 2, units: 4, description: "Favorable situation. Increase aggressively.", risk: "Medium" },
    { trueCount: 3, units: 6, description: "Very favorable. Get ready to win.", risk: "High" },
    { trueCount: 4, units: 8, description: "Extremely favorable. Maximum bet recommended.", risk: "High" },
];

export const riskLabel: Record<BetStage["risk"], Record<Lang, string>> = {
    Low: { es: "Bajo", en: "Low" },
    Medium: { es: "Medio", en: "Medium" },
    High: { es: "Alto", en: "High" },
};

export const bettingContent: Record<Lang, {
    title: string;
    subtitle: string;
    tableTitle: string;
    colTrueCount: string;
    colUnits: string;
    colRisk: string;
    unitNote: string;
    advice: BettingAdvice[];
}> = {
    es: {
        title: "Estrategia de Apuestas",
        subtitle: "No sirve de nada saber contar si no sabés cuándo apostar fuerte.",
        tableTitle: "Tabla de Apuestas (Ejemplo)",
        colTrueCount: "True Count",
        colUnits: "Unidades",
        colRisk: "Riesgo",
        unitNote: "* Una \"unidad\" es tu apuesta mínima estándar (ej. $10).",
        advice: [
            {
                title: "Administración de Bankroll",
                content: "Nunca apuestes dinero que no puedas permitirte perder. El conteo de cartas reduce pero no elimina la varianza.",
            },
            {
                title: "El efecto del True Count",
                content: "Un True Count alto significa que quedan más 10s y Ases. Esto favorece al jugador porque aumenta la probabilidad de Blackjack (pago 3:2) y que el dealer se pase.",
            },
            {
                title: "Camuflaje",
                content: "Si cambias de 1 a 12 unidades bruscamente, llamarás la atención. Sube gradualmente si es posible, o usa 'cover play'.",
            },
        ],
    },
    en: {
        title: "Betting Strategy",
        subtitle: "Knowing how to count means nothing if you don't know when to bet big.",
        tableTitle: "Bet Spread Table (Example)",
        colTrueCount: "True Count",
        colUnits: "Units",
        colRisk: "Risk",
        unitNote: "* One \"unit\" is your standard minimum bet (e.g. $10).",
        advice: [
            {
                title: "Bankroll Management",
                content: "Never bet money you can't afford to lose. Card counting reduces but does not eliminate variance.",
            },
            {
                title: "The True Count Effect",
                content: "A high True Count means more 10s and Aces remain. This favors the player because it increases the chance of Blackjack (3:2 payout) and the dealer busting.",
            },
            {
                title: "Camouflage",
                content: "If you jump from 1 to 12 units abruptly, you'll draw attention. Increase gradually when possible, or use 'cover play'.",
            },
        ],
    },
};
