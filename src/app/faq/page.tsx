"use client";

import { useLanguage } from "@/lib/i18n";

const faqContent = {
    es: {
        title: "Preguntas Frecuentes",
        subtitle: "Respuestas directas a las dudas más comunes.",
        faqs: [
            {
                q: "¿Es ilegal contar cartas?",
                a: "No. Contar cartas es puramente mental — no usás ningún dispositivo ni cometés fraude. En la mayoría de los países no es ilegal. Sin embargo, los casinos son propiedad privada y tienen el derecho de expulsarte o negarle el servicio si sospechan que lo hacés.",
            },
            {
                q: "¿Cuánto tiempo se tarda en aprender?",
                a: "Los valores de las cartas se aprenden en 15-30 minutos. Mantener el conteo con precisión en un ambiente ruidoso y bajo presión puede llevar de 2 a 6 meses de práctica constante.",
            },
            {
                q: "¿Se puede ganar siempre?",
                a: "No. El conteo de cartas te da una ventaja matemática pequeña de aproximadamente 0.5-1.5%. A largo plazo ganarás estadísticamente, pero a corto plazo la varianza puede hacerte perder sesiones enteras. Necesitás un bankroll grande y mucha paciencia.",
            },
            {
                q: "¿Qué bankroll necesito?",
                a: "Como regla general, se recomienda tener al menos 100 apuestas máximas para soportar la varianza sin arruinarte. Si tu spread es de 1 a 10 unidades y la apuesta mínima es $10, necesitás al menos $1,000 en bankroll.",
            },
            {
                q: "¿Qué errores arruinan la ventaja?",
                a: "Los más comunes son: perder el conteo (especialmente con distracciones), no ajustar por mazos restantes (True Count), no variar las apuestas según el conteo, apostar demasiado alto para tu bankroll (ruina por varianza), y hacer jugadas incorrectas de Estrategia Básica.",
            },
            {
                q: "¿Es suficiente con este sitio para aprender?",
                a: "Este sitio cubre la teoría y el entrenamiento de velocidad mental. Para jugar en vivo necesitarás también dominar la Estrategia Básica completa, practicar con distracciones (TV, ruido), y si es posible jugar en home games primero.",
            },
        ],
    },
    en: {
        title: "Frequently Asked Questions",
        subtitle: "Straight answers to the most common questions.",
        faqs: [
            {
                q: "Is card counting illegal?",
                a: "No. Card counting is purely mental — you're not using any device or committing fraud. In most countries it's not illegal. However, casinos are private property and have the right to ask you to leave or refuse service if they suspect you're counting.",
            },
            {
                q: "How long does it take to learn?",
                a: "The card values can be learned in 15-30 minutes. Maintaining an accurate count in a noisy, high-pressure environment can take 2 to 6 months of consistent practice.",
            },
            {
                q: "Can you win every time?",
                a: "No. Card counting gives you a small mathematical edge of roughly 0.5-1.5%. In the long run you'll win statistically, but short-term variance can make you lose entire sessions. You need a large bankroll and a lot of patience.",
            },
            {
                q: "How much bankroll do I need?",
                a: "As a general rule, it's recommended to have at least 100 maximum bets to weather variance without going broke. If your spread is 1 to 10 units and the minimum bet is $10, you need at least $1,000 in bankroll.",
            },
            {
                q: "What mistakes kill the edge?",
                a: "The most common are: losing the count (especially with distractions), failing to adjust for remaining decks (True Count), not varying bets based on the count, betting too high for your bankroll (ruin by variance), and making incorrect Basic Strategy plays.",
            },
            {
                q: "Is this site enough to learn from?",
                a: "This site covers theory and mental speed training. To play live you'll also need to master the full Basic Strategy, practice with distractions (TV, noise), and ideally play in home games first.",
            },
        ],
    },
};

export default function FAQPage() {
    const { lang } = useLanguage();
    const content = faqContent[lang];

    return (
        <div className="max-w-3xl mx-auto py-12 space-y-8">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl font-extrabold">{content.title}</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                    {content.subtitle}
                </p>
            </div>
            <div className="space-y-4">
                {content.faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">{faq.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
