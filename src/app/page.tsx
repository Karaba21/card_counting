import Link from "next/link";
import { ArrowRight, BookOpen, Crosshair, Gauge } from "lucide-react";

/* ── Suit symbols ─────────────────────────────────────────── */
function Suits() {
  return (
    <span className="inline-flex items-center gap-3 text-2xl select-none" aria-hidden>
      <span style={{ color: "hsl(4 78% 55%)" }}>♥</span>
      <span style={{ color: "hsl(220 12% 45%)" }}>♠</span>
      <span style={{ color: "hsl(4 78% 55%)" }}>♦</span>
      <span style={{ color: "hsl(220 12% 45%)" }}>♣</span>
    </span>
  );
}

/* ── Decorative playing card ──────────────────────────────── */
function MiniCard({ label, suit, red }: { label: string; suit: string; red?: boolean }) {
  const c = red ? "hsl(4 78% 52%)" : "hsl(220 18% 88%)";
  return (
    <div
      className="relative flex flex-col justify-between w-14 h-20 rounded-lg px-1.5 py-1 text-sm font-bold select-none shadow-lg"
      style={{
        background: "hsl(42 30% 97%)",
        border: "1px solid hsl(220 15% 78%)",
        color: c,
        boxShadow: "0 4px 14px hsl(220 25% 4% / 0.55), 0 1px 0 hsl(0 0% 100% / 0.08) inset",
      }}
    >
      <span className="leading-none">{label}</span>
      <span className="self-center text-xl leading-none">{suit}</span>
      <span className="self-end leading-none rotate-180">{label}</span>
    </div>
  );
}

/* ── Hi-Lo value badge ────────────────────────────────────── */
function HiLoBadge({ value, color, label }: { value: string; color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-3xl font-bold"
        style={{ fontFamily: "var(--font-heading)", color }}
      >
        {value}
      </span>
      <span className="text-xs" style={{ color: "hsl(220 12% 55%)" }}>
        {label}
      </span>
    </div>
  );
}

/* ── Feature card ─────────────────────────────────────────── */
function FeatureCard({
  icon,
  title,
  desc,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent?: string;
}) {
  return (
    <div
      className="glass-card flex flex-col gap-4 p-6 group cursor-default transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow:
          "0 2px 12px hsl(220 25% 4% / 0.4), 0 1px 0 hsl(220 15% 28% / 0.3) inset",
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          background: accent
            ? `hsl(${accent} / 0.12)`
            : "hsl(152 40% 14% / 0.5)",
          border: `1px solid hsl(${accent ?? "152 40% 28"} / 0.25)`,
          color: accent ? `hsl(${accent})` : "hsl(42 80% 56%)",
        }}
      >
        {icon}
      </div>
      <div>
        <h3
          className="text-lg font-bold mb-1"
          style={{ fontFamily: "var(--font-heading)", color: "hsl(42 30% 94%)" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "hsl(220 12% 58%)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center py-20 lg:py-32 text-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 0%, hsl(152 40% 18% / 0.45) 0%, transparent 70%)",
          }}
        />

        {/* Card decoration row */}
        <div className="relative flex items-end gap-2 mb-10" aria-hidden>
          <div style={{ transform: "rotate(-8deg) translateY(4px)" }}>
            <MiniCard label="A" suit="♠" />
          </div>
          <div style={{ transform: "rotate(-3deg)" }}>
            <MiniCard label="K" suit="♥" red />
          </div>
          <div style={{ transform: "rotate(0deg) scale(1.1)" }}>
            <MiniCard label="A" suit="♥" red />
          </div>
          <div style={{ transform: "rotate(3deg)" }}>
            <MiniCard label="K" suit="♠" />
          </div>
          <div style={{ transform: "rotate(8deg) translateY(4px)" }}>
            <MiniCard label="Q" suit="♦" red />
          </div>
        </div>

        {/* Badge */}
        <div className="chip mb-5 relative">
          <Suits />
          Sistema Hi-Lo
        </div>

        {/* Headline */}
        <h1
          className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 max-w-4xl"
          style={{
            fontFamily: "var(--font-heading)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "hsl(42 30% 95%)" }}>Domina el </span>
          <span
            style={{
              background: "linear-gradient(135deg, hsl(42 90% 60%) 0%, hsl(42 80% 70%) 50%, hsl(4 78% 55%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Blackjack
          </span>
          <br />
          <span style={{ color: "hsl(42 30% 95%)" }}>contando cartas.</span>
        </h1>

        <p
          className="relative max-w-lg text-lg md:text-xl leading-relaxed mb-10"
          style={{ color: "hsl(220 12% 58%)" }}
        >
          Aprende la estrategia real de los profesionales. Practica, mejora tu
          velocidad y vencé a la casa con matemáticas, no con suerte.
        </p>

        {/* CTAs */}
        <div className="relative flex flex-col sm:flex-row gap-4">
          <Link href="/practice">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "linear-gradient(135deg, hsl(42 80% 54%) 0%, hsl(42 80% 46%) 100%)",
                color: "hsl(220 25% 8%)",
                boxShadow: "0 4px 20px hsl(42 80% 56% / 0.35), 0 1px 0 hsl(42 90% 70% / 0.4) inset",
              }}
            >
              Empezar a Practicar <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/learn">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                background: "hsl(220 18% 16%)",
                color: "hsl(42 30% 92%)",
                border: "1px solid hsl(220 15% 28%)",
                boxShadow: "0 2px 12px hsl(220 25% 4% / 0.4)",
              }}
            >
              <BookOpen className="w-4 h-4" /> Aprender la Teoría
            </button>
          </Link>
        </div>
      </section>

      {/* ── Hi-Lo reference strip ─────────────────────────── */}
      <section
        className="rounded-2xl mx-auto w-full max-w-2xl mb-16"
        style={{
          background: "hsl(152 40% 12% / 0.6)",
          border: "1px solid hsl(152 40% 22% / 0.5)",
          padding: "1.5rem",
        }}
      >
        <p
          className="text-center text-xs font-semibold tracking-widest uppercase mb-5"
          style={{ color: "hsl(152 50% 45%)" }}
        >
          Tabla Hi-Lo de referencia rápida
        </p>
        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
              {["2", "3", "4", "5", "6"].map((n) => (
                <span
                  key={n}
                  className="w-8 h-10 flex items-center justify-center rounded text-sm font-bold"
                  style={{ background: "hsl(42 80% 56% / 0.12)", color: "hsl(42 80% 62%)", border: "1px solid hsl(42 80% 56% / 0.2)" }}
                >
                  {n}
                </span>
              ))}
            </div>
            <HiLoBadge value="+1" color="hsl(152 60% 52%)" label="Contar ↑" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
              {["7", "8", "9"].map((n) => (
                <span
                  key={n}
                  className="w-8 h-10 flex items-center justify-center rounded text-sm font-bold"
                  style={{ background: "hsl(220 18% 20% / 0.5)", color: "hsl(220 12% 55%)", border: "1px solid hsl(220 15% 28% / 0.5)" }}
                >
                  {n}
                </span>
              ))}
            </div>
            <HiLoBadge value="0" color="hsl(220 12% 55%)" label="Neutral" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
              {["10", "J", "Q", "K", "A"].map((n) => (
                <span
                  key={n}
                  className="w-8 h-10 flex items-center justify-center rounded text-sm font-bold"
                  style={{ background: "hsl(4 78% 50% / 0.12)", color: "hsl(4 78% 58%)", border: "1px solid hsl(4 78% 50% / 0.2)" }}
                >
                  {n}
                </span>
              ))}
            </div>
            <HiLoBadge value="−1" color="hsl(4 78% 55%)" label="Contar ↓" />
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="grid gap-5 pb-16 md:grid-cols-3">
        <FeatureCard
          icon={<BookOpen className="w-5 h-5" />}
          title="Aprendizaje Paso a Paso"
          desc="Desde el sistema Hi-Lo básico hasta el True Count y ajustes de apuestas. Todo explicado claro y sin rodeos."
          accent="42 80% 56"
        />
        <FeatureCard
          icon={<Crosshair className="w-5 h-5" />}
          title="Simulación Realista"
          desc="Cartas reales de API, velocidad ajustable y feedback instantáneo. Como jugar en una mesa de verdad."
          accent="4 78% 52"
        />
        <FeatureCard
          icon={<Gauge className="w-5 h-5" />}
          title="Modos de Entrenamiento"
          desc="Fácil, Intermedio, Avanzado y Pro. Subí de nivel a medida que tu mente se vuelve más rápida."
          accent="152 50% 45"
        />
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section
        className="rounded-2xl p-8 md:p-12 mb-16"
        style={{
          background: "hsl(220 18% 12% / 0.7)",
          border: "1px solid hsl(220 15% 22% / 0.6)",
        }}
      >
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-black mb-3"
            style={{ fontFamily: "var(--font-heading)", color: "hsl(42 30% 94%)" }}
          >
            ¿Cómo funciona?
          </h2>
          <p style={{ color: "hsl(220 12% 55%)" }}>
            El conteo de cartas no es ilegal — es habilidad pura.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 max-w-4xl mx-auto">
          {[
            {
              step: "01",
              title: "Asigná valores",
              desc: "2–6 vale +1 · 7–9 vale 0 · 10 y figuras valen −1. Simple como sumar y restar.",
              color: "hsl(42 80% 56%)",
            },
            {
              step: "02",
              title: "Sumá mentalmente",
              desc: "Llevá el Running Count de cada carta que ves. La velocidad llega con la práctica.",
              color: "hsl(4 78% 55%)",
            },
            {
              step: "03",
              title: "Ajustá tu apuesta",
              desc: "Cuenta alta → más fichas. Cuenta baja → apostá el mínimo. Así se gana.",
              color: "hsl(152 50% 48%)",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col p-6 rounded-xl overflow-hidden"
              style={{
                background: "hsl(220 18% 10% / 0.6)",
                border: "1px solid hsl(220 15% 25% / 0.5)",
              }}
            >
              <span className="step-number">{item.step}</span>
              <span
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: item.color }}
              >
                Paso {item.step}
              </span>
              <h3
                className="text-xl font-bold mb-2 relative z-10"
                style={{ fontFamily: "var(--font-heading)", color: "hsl(42 30% 94%)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed relative z-10" style={{ color: "hsl(220 12% 56%)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────── */}
      <section
        className="py-4 text-center text-xs mb-8"
        style={{ color: "hsl(220 12% 40%)" }}
      >
        Sitio educativo · El conteo de cartas puede resultar en que los casinos te restrinjan el acceso · Jugá responsablemente.
      </section>
    </div>
  );
}
