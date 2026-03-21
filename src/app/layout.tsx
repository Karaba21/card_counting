import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "CardCounter - Learn to Count Cards",
  description: "Interactive card counting trainer for Blackjack. Hi-Lo system, Running Count, True Count.",
  openGraph: {
    title: "CardCounter",
    description: "Learn to count cards in Blackjack — free and no sign-up needed.",
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
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto pb-8 px-4 md:px-8">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
