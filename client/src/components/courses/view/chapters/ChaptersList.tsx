import Chapter from "./Chapter";

interface ChaptersListProps {
	section: any;
	sectionProgress?: any;
	chapterId: string;
	handleChapterClick: (sectionId: string, chapterId: string) => void;
	updateChapterProgress: (
		sectionId: string,
		chapterId: string,
		completed: boolean
	) => void;
}

function ChaptersList({
	section,
	sectionProgress,
	chapterId,
	handleChapterClick,
	updateChapterProgress,
}: ChaptersListProps) {
	return (
		<ul>
			{section.chapters.map((chapter: any, index: number) => (
				<Chapter
					key={chapter.chapterId}
					chapter={chapter}
					index={index}
					sectionId={section.sectionId}
					sectionProgress={sectionProgress ?? null}
					chapterId={chapterId}
					handleChapterClick={handleChapterClick}
					updateChapterProgress={updateChapterProgress}
				/>
			))}
		</ul>
	);
}
export default ChaptersList;
