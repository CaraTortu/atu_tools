import { Calculator, type LucideIcon } from "lucide-react";

export type Data = {
    title: string;
    icon: LucideIcon;
    description?: string;
    items?: {
        title: string;
        url: string;
    }[];
}[];

export const url_data: Data = [
    {
        title: "Calculators",
        description: "Tools to convert grades, calculate GPA, and more.",
        icon: Calculator,
        items: [
            {
                title: "GPA",
                url: "/calculators/gpa",
            },
        ],
    },
];
