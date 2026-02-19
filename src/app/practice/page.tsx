
import { PracticeBoard } from "@/components/practice/PracticeBoard";

export default function PracticePage() {
    return (
        <div className="flex flex-col items-center justify-start py-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Zona de Práctica</h1>
                <p className="text-muted-foreground">Mejora tu velocidad y precisión.</p>
            </div>

            <PracticeBoard />

            <div className="text-sm text-muted-foreground mt-8 max-w-md text-center">
                <p>Tips: Usa el teclado numérico o los botones en pantalla. Concéntrate en la precisión antes que la velocidad.</p>
            </div>
        </div>
    );
}
