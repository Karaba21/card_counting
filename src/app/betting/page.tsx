"use client";

import { betSpread, bettingContent, riskLabel } from "@/content/bettingContent";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";

export default function BettingPage() {
    const { lang } = useLanguage();
    const content = bettingContent[lang];

    return (
        <div className="flex flex-col items-start py-8 space-y-12 max-w-4xl mx-auto">
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight">
                    {content.title}
                </h1>
                <p className="text-xl text-neutral-500 dark:text-neutral-400">
                    {content.subtitle}
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 w-full">
                {/* Bet Spread Table */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{content.tableTitle}</h2>
                    <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{content.colTrueCount}</TableHead>
                                    <TableHead>{content.colUnits}</TableHead>
                                    <TableHead>{content.colRisk}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {betSpread.map((stage) => (
                                    <TableRow key={stage.trueCount}>
                                        <TableCell className="font-mono">
                                            {stage.trueCount <= 0 ? `<= 0` : `+${stage.trueCount}`}
                                        </TableCell>
                                        <TableCell className="font-bold">{stage.units} u</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    stage.risk === "High"
                                                        ? "destructive"
                                                        : stage.risk === "Medium"
                                                            ? "warning"
                                                            : "secondary"
                                                }
                                            >
                                                {riskLabel[stage.risk][lang]}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">
                        {content.unitNote}
                    </p>
                </div>

                {/* Advice Cards */}
                <div className="space-y-6">
                    {content.advice.map((advice, idx) => (
                        <div
                            key={idx}
                            className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700"
                        >
                            <h3 className="text-lg font-bold mb-2">{advice.title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-300">
                                {advice.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
