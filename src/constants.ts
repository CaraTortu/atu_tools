import { type LucideIcon, SquareTerminal } from "lucide-react";

export type Data = {
    title: string;
    icon: LucideIcon;
    description?: string;
    isActive?: boolean;
    items?: {
        title: string;
        url: string;
    }[];
}[];

export const url_data: Data = [
    {
        title: "Calculators",
        description: "Tools to convert grades, calculate GPA, and more.",
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: "GPA",
                url: "/calculators/gpa",
            },
        ],
    },
];
