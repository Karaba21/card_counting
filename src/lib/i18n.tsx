"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "es" | "en";

export const translations = {
    es: {
        // Navbar
        nav_learn: "Aprender",
        nav_practice: "Practicar",
        nav_betting: "Estrategia",
        nav_faq: "FAQ",
        nav_cta: "Practicar →",

        // Home page
        home_badge: "Sistema Hi-Lo",
        home_headline_1: "Domina el ",
        home_headline_2: "contando cartas.",
        home_subtitle: "Aprende la estrategia real de los profesionales. Practica, mejora tu velocidad y vencé a la casa con matemáticas, no con suerte.",
        home_cta_practice: "Empezar a Practicar",
        home_cta_learn: "Aprender la Teoría",
        home_hilo_label: "Tabla Hi-Lo de referencia rápida",
        home_hilo_count_up: "Contar ↑",
        home_hilo_neutral: "Neutral",
        home_hilo_count_down: "Contar ↓",
        home_features_title_1: "Aprendizaje Paso a Paso",
        home_features_desc_1: "Desde el sistema Hi-Lo básico hasta el True Count y ajustes de apuestas. Todo explicado claro y sin rodeos.",
        home_features_title_2: "Simulación Realista",
        home_features_desc_2: "Cartas reales de API, velocidad ajustable y feedback instantáneo. Como jugar en una mesa de verdad.",
        home_features_title_3: "Modos de Entrenamiento",
        home_features_desc_3: "Fácil, Intermedio, Avanzado y Pro. Subí de nivel a medida que tu mente se vuelve más rápida.",
        home_how_title: "¿Cómo funciona?",
        home_how_subtitle: "El conteo de cartas no es ilegal — es habilidad pura.",
        home_step: "Paso",
        home_step1_title: "Asigná valores",
        home_step1_desc: "2–6 vale +1 · 7–9 vale 0 · 10 y figuras valen −1. Simple como sumar y restar.",
        home_step2_title: "Sumá mentalmente",
        home_step2_desc: "Llevá el Running Count de cada carta que ves. La velocidad llega con la práctica.",
        home_step3_title: "Ajustá tu apuesta",
        home_step3_desc: "Cuenta alta → más fichas. Cuenta baja → apostá el mínimo. Así se gana.",
        home_disclaimer: "Sitio educativo · El conteo de cartas puede resultar en que los casinos te restrinjan el acceso · Jugá responsablemente.",

        // Learn page
        learn_title: "Guía Completa de Card Counting",
        learn_subtitle: "Domina el arte de vencer a la casa con estadística.",
        learn_toc: "Índice",
        learn_cta: "Ir a Practicar lo Aprendido →",

        // Practice page
        practice_tips: "Tips: Usa el teclado numérico o los botones en pantalla. Concéntrate en la precisión antes que la velocidad.",

        // PracticeBoard - setup screen
        practice_board_title: "Entrenamiento",
        practice_board_subtitle: "Selecciona tu modo de entrenamiento. Configura los mazos y la dificultad para empezar.",
        practice_mode_basic_name: "Básico",
        practice_mode_basic_desc: "1 carta. Responde su valor (+1, 0, -1).",
        practice_mode_intermediate_name: "Intermedio",
        practice_mode_intermediate_desc: "Varias cartas juntas. Calcula la suma.",
        practice_mode_advanced_name: "Avanzado",
        practice_mode_advanced_desc: "Cartas sucesivas. Running Count.",
        practice_mode_pro_name: "Pro",
        practice_mode_pro_desc: "Running Count + True Count.",
        practice_decks_label: "Mazos:",
        practice_cards_per_round: "Cartas por Ronda:",
        practice_test_label: "Test:",
        practice_test_random: "Aleatorio",
        practice_test_end: "Al finalizar el zapato",
        practice_start_btn: "¡Comenzar!",

        // PracticeBoard - HUD
        practice_streak: "Racha",
        practice_accuracy: "Precisión",

        // PracticeBoard - game
        practice_cards_seen: "cartas vistas",
        practice_cards_remaining: "restantes",
        practice_next_card: "Siguiente Carta",
        practice_hotkey_hint: "También podés presionar Enter, Espacio, o tocar la carta",
        practice_mode_label_basic: "Básico",
        practice_mode_label_intermediate: "Intermedio",
        practice_mode_label_advanced: "Avanzado",
        practice_mode_label_pro: "Pro",
        practice_question_sum: "¿Cuánto suman estas cartas?",
        practice_question_running: "¿Cuál es el",
        practice_question_running_end: "actual?",
        practice_running_count: "Running Count",
        practice_true_count: "True Count",
        practice_decks_remaining: "Mazos restantes estimados:",
        practice_submit: "Enviar",
        practice_keyboard_hint: "Atajos de teclado: A = -1 · S = 0 · D = +1",
        practice_next_hand: "Siguiente mano",
        practice_enter_hint: "También podés presionar Enter o Espacio",
        practice_current_rc: "El Running Count actual es:",
        practice_reveal_count: "Revelar Conteo",
        practice_reset: "Reset Partida",
        practice_main_menu: "Menú Principal",
        practice_hide_count: "Hide Count",
        practice_show_count: "Show Count",

        // Betting / Strategy page
        bet_low: "Bajo",
        bet_medium: "Medio",
        bet_high: "Alto",

        // Misc
        example_label: "📌 Ejemplo:",
        proTip_default: "Pro Tip",
        warning_default: "Atención",
        cards_low_label: "Cartas Bajas",
        cards_neutral_label: "Cartas Neutras",
        cards_high_label: "Cartas Altas",
    },
    en: {
        // Navbar
        nav_learn: "Learn",
        nav_practice: "Practice",
        nav_betting: "Strategy",
        nav_faq: "FAQ",
        nav_cta: "Practice →",

        // Home page
        home_badge: "Hi-Lo System",
        home_headline_1: "Master ",
        home_headline_2: "by counting cards.",
        home_subtitle: "Learn the real strategy of the pros. Practice, sharpen your speed, and beat the house with math — not luck.",
        home_cta_practice: "Start Practicing",
        home_cta_learn: "Learn the Theory",
        home_hilo_label: "Hi-Lo Quick Reference Table",
        home_hilo_count_up: "Count ↑",
        home_hilo_neutral: "Neutral",
        home_hilo_count_down: "Count ↓",
        home_features_title_1: "Step-by-Step Learning",
        home_features_desc_1: "From the basic Hi-Lo system all the way to True Count and betting adjustments. All explained clearly and without filler.",
        home_features_title_2: "Realistic Simulation",
        home_features_desc_2: "Real cards from the API, adjustable speed, and instant feedback. Just like playing at a real table.",
        home_features_title_3: "Training Modes",
        home_features_desc_3: "Easy, Intermediate, Advanced, and Pro. Level up as your mind gets faster.",
        home_how_title: "How does it work?",
        home_how_subtitle: "Card counting is not illegal — it's pure skill.",
        home_step: "Step",
        home_step1_title: "Assign values",
        home_step1_desc: "2–6 is +1 · 7–9 is 0 · 10 and face cards are −1. As simple as adding and subtracting.",
        home_step2_title: "Keep a mental tally",
        home_step2_desc: "Track the Running Count for every card you see. Speed comes with practice.",
        home_step3_title: "Adjust your bet",
        home_step3_desc: "High count → more chips. Low count → bet the minimum. That's how you win.",
        home_disclaimer: "Educational site · Card counting may result in casinos restricting your access · Gamble responsibly.",

        // Learn page
        learn_title: "Complete Card Counting Guide",
        learn_subtitle: "Master the art of beating the house with statistics.",
        learn_toc: "Table of Contents",
        learn_cta: "Go Practice What You Learned →",

        // Practice page
        practice_tips: "Tips: Use the number keys or the on-screen buttons. Focus on accuracy before speed.",

        // PracticeBoard - setup screen
        practice_board_title: "Training",
        practice_board_subtitle: "Select your training mode. Set the number of decks and difficulty to begin.",
        practice_mode_basic_name: "Basic",
        practice_mode_basic_desc: "1 card. Answer its Hi-Lo value (+1, 0, -1).",
        practice_mode_intermediate_name: "Intermediate",
        practice_mode_intermediate_desc: "Multiple cards at once. Calculate the sum.",
        practice_mode_advanced_name: "Advanced",
        practice_mode_advanced_desc: "Sequential cards. Track the Running Count.",
        practice_mode_pro_name: "Pro",
        practice_mode_pro_desc: "Running Count + True Count.",
        practice_decks_label: "Decks:",
        practice_cards_per_round: "Cards per Round:",
        practice_test_label: "Test:",
        practice_test_random: "Random",
        practice_test_end: "At the end of the shoe",
        practice_start_btn: "Let's go!",

        // PracticeBoard - HUD
        practice_streak: "Streak",
        practice_accuracy: "Accuracy",

        // PracticeBoard - game
        practice_cards_seen: "cards seen",
        practice_cards_remaining: "remaining",
        practice_next_card: "Next Card",
        practice_hotkey_hint: "You can also press Enter, Space, or tap the card",
        practice_mode_label_basic: "Basic",
        practice_mode_label_intermediate: "Intermediate",
        practice_mode_label_advanced: "Advanced",
        practice_mode_label_pro: "Pro",
        practice_question_sum: "What is the sum of these cards?",
        practice_question_running: "What is the current",
        practice_question_running_end: "?",
        practice_running_count: "Running Count",
        practice_true_count: "True Count",
        practice_decks_remaining: "Estimated decks remaining:",
        practice_submit: "Submit",
        practice_keyboard_hint: "Keyboard shortcuts: A = -1 · S = 0 · D = +1",
        practice_next_hand: "Next hand",
        practice_enter_hint: "You can also press Enter or Space",
        practice_current_rc: "The current Running Count is:",
        practice_reveal_count: "Reveal Count",
        practice_reset: "Reset Game",
        practice_main_menu: "Main Menu",
        practice_hide_count: "Hide Count",
        practice_show_count: "Show Count",

        // Betting / Strategy page
        bet_low: "Low",
        bet_medium: "Medium",
        bet_high: "High",

        // Misc
        example_label: "📌 Example:",
        proTip_default: "Pro Tip",
        warning_default: "Warning",
        cards_low_label: "Low Cards",
        cards_neutral_label: "Neutral Cards",
        cards_high_label: "High Cards",
    },
} satisfies Record<Lang, Record<string, string>>;

export type TranslationKey = keyof typeof translations.es;

interface LangContextValue {
    lang: Lang;
    setLang: (l: Lang) => void;
    t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>("es");

    useEffect(() => {
        const stored = localStorage.getItem("lang") as Lang | null;
        if (stored === "en" || stored === "es") setLangState(stored);
    }, []);

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem("lang", l);
    };

    const t = (key: TranslationKey) => translations[lang][key] ?? key;

    return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
    return ctx;
}
