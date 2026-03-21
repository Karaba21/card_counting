export function Footer() {
    return (
        <footer
            style={{
                borderTop: "1px solid hsl(220 15% 18%)",
                background: "hsl(220 18% 8%)",
            }}
        >
            <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col items-center justify-between gap-2 py-5 md:h-14 md:flex-row md:py-0">
                <p
                    className="text-center text-xs md:text-left"
                    style={{ color: "hsl(220 12% 40%)" }}
                >
                    Sitio puramente educativo · El conteo de cartas puede resultar en que los casinos te nieguen el servicio.
                </p>
                <p
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "hsl(220 12% 35%)" }}
                >
                    <span style={{ color: "hsl(42 80% 50%)" }}>♠</span>
                    © {new Date().getFullYear()} CardCounter
                </p>
            </div>
        </footer>
    );
}
