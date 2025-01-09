import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function markToLabel(mark: number) {
    if (mark < 50) return "Class 3 Honours";
    if (mark < 60) return "Class 2.2 Honours";
    if (mark < 70) return "Class 2.1 Honours";
    return "Class 1 Honours";
}

export function roundToDigits(num: number, digits: number) {
    return Math.round(num * 10 ** digits) / 10 ** digits;
}
