"use client";

import { PracticeBoard } from "@/components/practice/PracticeBoard";
import { useLanguage } from "@/lib/i18n";

export default function PracticePage() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col items-center justify-start py-2">
            <PracticeBoard />

            <div className="text-sm text-muted-foreground mt-8 max-w-md text-center">
                <p>{t("practice_tips")}</p>
            </div>
        </div>
    );
}
