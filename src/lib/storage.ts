
export type PracticeSettings = {
    decks: number;
    cardsPerRound: number;
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
    return stored ? JSON.parse(stored) : defaultSettings;
}

export function saveSettings(settings: PracticeSettings) {
    if (typeof window === "undefined") return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadStats(): PracticeStats {
    if (typeof window === "undefined") return defaultStats;
    const stored = localStorage.getItem(STATS_KEY);
    return stored ? JSON.parse(stored) : defaultStats;
}

export function saveStats(stats: PracticeStats) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export const defaultSettings: PracticeSettings = {
    decks: 6,
    cardsPerRound: 1,
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
