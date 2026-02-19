import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-8 py-20 text-center lg:py-32">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent pb-2">
            Domina el Blackjack contando cartas.
          </h1>
          <p className="mx-auto max-w-[700px] text-neutral-500 dark:text-neutral-400 md:text-xl">
            Aprende la estrategia real de los profesionales. Practica, mejora tu velocidad y vence a la casa con matemáticas, no con suerte.
          </p>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link href="/practice">
            <Button size="lg" className="h-12 px-8 text-lg gap-2">
              Empezar a Practicar <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/learn">
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
              Aprender la Teoría
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid gap-8 py-12 md:grid-cols-3 md:py-16 border-t border-neutral-200 dark:border-neutral-800">
        {[
          {
            icon: <Brain className="h-8 w-8" />,
            title: "Aprendizaje Paso a Paso",
            desc: "Desde el sistema Hi-Lo básico hasta el True Count y ajustes de apuestas. Todo explicado claro y simple.",
          },
          {
            icon: <Target className="h-8 w-8" />,
            title: "Simulación Realista",
            desc: "Practica con simulador de mazos infinitos, controla la velocidad y recibe feedback instantáneo.",
          },
          {
            icon: <Zap className="h-8 w-8" />,
            title: "Modo Entrenamiento y Examen",
            desc: "Visualiza el conteo en tiempo real para calibrar tu mente, o ponte a prueba en el Modo Examen.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-neutral-500 dark:text-neutral-400">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="py-12 md:py-24 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Cómo funciona?</h2>
          <p className="mx-auto max-w-[600px] text-neutral-500 dark:text-neutral-400 md:text-xl">
            El conteo de cartas no es ilegal, es habilidad.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { step: "01", title: "Asigná valores", desc: "2–6 → +1 | 7–9 → 0 | 10–A → -1. Simple como sumar y restar." },
            { step: "02", title: "Sumá mentalmente", desc: "Llevá el Running Count de todo lo que ves." },
            { step: "03", title: "Ajustá tu apuesta", desc: "Cuando la cuenta es alta, apostá más. Cuando es baja, apostá mínimo." },
          ].map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-6xl font-bold text-neutral-100 dark:text-neutral-800 absolute right-4 top-2 select-none">
                {item.step}
              </span>
              <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 text-center text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
        <p>
          ⚠️ Sitio educativo. No promovemos el juego compulsivo ni actividades ilegales.
        </p>
      </section>
    </div>
  );
}
