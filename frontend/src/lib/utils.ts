import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Mezcla clases de Tailwind de forma inteligente,
 * resolviendo conflictos y permitiendo lógica condicional.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
