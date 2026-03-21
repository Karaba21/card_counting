
import { PracticeBoard } from "@/components/practice/PracticeBoard";

export default function PracticePage() {
    return (
        <div className="flex flex-col items-center justify-start py-2">
            <PracticeBoard />

            <div className="text-sm text-muted-foreground mt-8 max-w-md text-center">
                <p>Tips: Usa el teclado numérico o los botones en pantalla. Concéntrate en la precisión antes que la velocidad.</p>
            </div>
        </div>
    );
}
