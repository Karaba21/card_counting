export function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="mx-auto max-w-7xl px-4 md:px-8 flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 md:text-left">
                    ⚠️ Sitio puramente educativo. El conteo de cartas puede resultar en que los casinos te nieguen el servicio.
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    © {new Date().getFullYear()} CardCounter
                </p>
            </div>
        </footer>
    );
}
