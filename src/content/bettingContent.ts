export type BetStage = {
    trueCount: number;
    units: number;
    description: string;
    risk: "Bajo" | "Medio" | "Alto";
};

export const betSpread: BetStage[] = [
    { trueCount: 0, units: 1, description: "Apuesta mínima. La casa tiene ventaja ligera.", risk: "Bajo" },
    { trueCount: 1, units: 2, description: "Ventaja empieza a inclinarse. Duplica tu apuesta.", risk: "Bajo" },
    { trueCount: 2, units: 4, description: "Situación favorable. Incrementa agresivamente.", risk: "Medio" },
    { trueCount: 3, units: 6, description: "Muy favorable. Prepárate para ganar.", risk: "Alto" },
    { trueCount: 4, units: 8, description: "Extremadamente favorable. Apuesta máxima recomendada.", risk: "Alto" },
];

export const bettingAdvice = [
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
];
