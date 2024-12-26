/* USER COURSE PROGRESS */

/**
 * Calculate and return the overall progress value of a course completed by a user.
 *
 * @param sections Array of sections of a course
 * @returns Overall progress value completed by a user
 */
export function getOverallProgress(sections: any[]): number {
	const totalChapters = sections.reduce(
		(prevNumOfChapters: number, section: any) =>
			prevNumOfChapters + section.chapters.length,
		0
	);

	const completedChapters = sections.reduce(
		(prevNumOfChapters: number, section: any) => {
			const completedChaptersOfASection = section.chapters.filter(
				(chapter: any) => chapter.completed
			).length;

			return prevNumOfChapters + completedChaptersOfASection;
		},
		0
	);

	return totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;
}

/**
 * Merge and return an array of sections
 *
 * @param existingSections
 * @param newSections
 * @returns an array of merged sections
 */
export function mergeSections(
	existingSections: any[],
	newSections: any[]
): any[] {
	const existingSectionsMap = new Map<string, any>();
	for (const existingSection of existingSections) {
		existingSectionsMap.set(existingSection.sectionId, existingSection);
	}

	for (const newSection of newSections) {
		const section = existingSectionsMap.get(newSection.sectionId);

		if (!section) {
			// Add new section
			existingSectionsMap.set(newSection.sectionId, newSection);
		} else {
			// Merge chapters within the existing section
			section.chapters = mergeChapters(section.chapters, newSection.chapters);
			existingSectionsMap.set(newSection.sectionId, section);
		}
	}

	return Array.from(existingSectionsMap.values());
}

/**
 * Merge and return an array of chapters
 *
 * @param existingChapters
 * @param newChapters
 * @returns an array of merged chapters
 */
export function mergeChapters(
	existingChapters: any[],
	newChapters: any[]
): any[] {
	const existingChaptersMap = new Map<string, any>();

	for (const existingChapter of existingChapters) {
		existingChaptersMap.set(existingChapter.chapterId, existingChapter);
	}

	for (const newChapter of newChapters) {
		existingChaptersMap.set(newChapter.chapterId, {
			...(existingChaptersMap.get(newChapter.chapterId) || {}),
			...newChapter,
		});
	}

	return Array.from(existingChaptersMap.values());
}
