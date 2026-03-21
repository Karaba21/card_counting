export type GameMode = "basic" | "intermediate" | "advanced" | "pro";

export type PracticeSettings = {
    gameMode: GameMode;
    decks: number;
    cardsPerRound: number; // mostly for intermediate mode
    askFrequency: "end" | "random"; // for advanced/pro modes
    mode: "training" | "exam";
    trueCountMode: boolean;
    hotkeys: boolean;
};

export type PracticeStats = {
    totalCardsSeen: number;
    correctAnswers: number;
    incorrectAnswers: number;
    streak: number;
    totalTimeSeconds: number;
};

const SETTINGS_KEY = "card_counting_settings";
const STATS_KEY = "card_counting_stats";

export function loadSettings(): PracticeSettings {
    if (typeof window === "undefined") return defaultSettings;
    const stored = localStorage.getItem(SETTINGS_KEY);
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
}

export function saveSettings(settings: PracticeSettings) {
    if (typeof window === "undefined") return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadStats(): PracticeStats {
    if (typeof window === "undefined") return defaultStats;
    const stored = localStorage.getItem(STATS_KEY);
    return stored ? { ...defaultStats, ...JSON.parse(stored) } : defaultStats;
}

export function saveStats(stats: PracticeStats) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export const defaultSettings: PracticeSettings = {
    gameMode: "intermediate",
    decks: 6,
    cardsPerRound: 3, // Changed from 1 to 3 as it's the "actual mode" and we want to keep it
    askFrequency: "random",
    mode: "training",
    trueCountMode: false,
    hotkeys: true,
};

export const defaultStats: PracticeStats = {
    totalCardsSeen: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    streak: 0,
    totalTimeSeconds: 0,
};
