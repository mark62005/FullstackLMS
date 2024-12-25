import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CourseFormData } from "./schema";

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

/**
 * Convert dollars to cents (e.g., "49.99" -> 4999)
 *
 */
export function dollarsToCents(dollars: string | number): number {
	const amount = typeof dollars === "string" ? parseFloat(dollars) : dollars;
	return Math.round(amount * 100);
}

/**
 * Convert cents to dollars (e.g., 4999 -> "49.99")
 *
 */
export function centsToDollars(cents: number | undefined): string {
	return ((cents || 0) / 100).toString();
}

/**
 * Create course form data
 *
 */
export const createCourseFormData = (
	data: CourseFormData,
	sections: Section[]
): FormData => {
	const formData = new FormData();
	formData.append("title", data.courseTitle);
	formData.append("description", data.courseDescription);
	formData.append("category", data.courseCategory);
	formData.append("price", data.coursePrice.toString());
	formData.append("status", data.courseStatus ? "Published" : "Draft");

	const sectionsWithVideos = sections.map((section: Section) => ({
		...section,
		chapters: section.chapters.map((chapter: Chapter) => ({
			...chapter,
			// TODO: Upload video functionality
		})),
	}));

	formData.append("sections", JSON.stringify(sectionsWithVideos));

	return formData;
};
