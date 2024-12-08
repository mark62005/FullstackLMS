import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Convert cents to formatted currency string in CAD (e.g., 4999 -> "$49.99")
 *
 * @param cents
 * @returns formatted currency string in CAD
 */
export function getFormattedPrice(cents: number | undefined): string {
	return new Intl.NumberFormat("en-CA", {
		style: "currency",
		currency: "CAD",
	}).format((cents || 0) / 100);
}

/**
 * Capitalize a word.
 *
 * @param word
 */
export function capitalize(word: string) {
	return word[0].toLocaleUpperCase() + word.slice(1);
}
