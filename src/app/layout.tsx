import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "CardCounter - Aprende a Contar Cartas",
  description: "Entrenamiento interactivo de conteo de cartas para Blackjack. Sistema Hi-Lo, Running Count, True Count.",
  openGraph: {
    title: "CardCounter",
    description: "Aprende a contar cartas en Blackjack gratis y sin registro.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${inter.className} min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto pb-8 px-4 md:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
