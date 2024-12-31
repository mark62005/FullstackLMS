import { ChevronDown, ChevronUp } from "lucide-react";
import ProgressVisuals from "./ProgressVisuals";
import ChaptersList from "./ChaptersList";

interface SectionProps {
	section: any;
	index: number;
	sectionProgress?: any;
	chapterId: string;
	expandedSections: string[];
	toggleSection: (sectionTitle: string) => void;
	handleChapterClick: (sectionId: string, chapterId: string) => void;
	updateChapterProgress: (
		sectionId: string,
		chapterId: string,
		completed: boolean
	) => void;
}

function Section({
	section,
	index,
	sectionProgress,
	chapterId,
	expandedSections,
	toggleSection,
	handleChapterClick,
	updateChapterProgress,
}: SectionProps) {
	const completedChapters =
		sectionProgress?.chapters.filter((c: any) => c.completed).length || 0;
	const totalChapters = section.chapters.length;
	const isExpanded = expandedSections.includes(section.sectionTitle);

	return (
		<div className="min-w-[300px]">
			{/* HEADER */}
			<div
				className="px-8 py-6 cursor-pointer hover:bg-gray-700/50"
				onClick={() => toggleSection(section.sectionTitle)}
			>
				<div className="flex justify-between items-center">
					{/* SECTION NUMBER */}
					<p className="text-gray-500 text-sm">Section 0{index + 1}</p>

					{/* ICON */}
					{isExpanded ? (
						<ChevronUp className="text-white-50/70 w-4 h-4" />
					) : (
						<ChevronDown className="text-white-50/70 w-4 h-4" />
					)}
				</div>

				{/* TITLE */}
				<h3 className="text-white-50/90 font-semibold">
					{section.sectionTitle}
				</h3>
			</div>

			{/* DIVIDER */}
			<hr className="border-gray-700" />
			{isExpanded && (
				<div className="py-8 bg-customgreys-primarybg/40">
					<ProgressVisuals
						section={section}
						sectionProgress={sectionProgress ?? null}
						completedChapters={completedChapters}
						totalChapters={totalChapters}
					/>

					<ChaptersList
						section={section}
						sectionProgress={sectionProgress ?? null}
						chapterId={chapterId}
						handleChapterClick={handleChapterClick}
						updateChapterProgress={updateChapterProgress}
					/>
				</div>
			)}

			{/* DIVIDER */}
			<hr className="border-gray-700" />
		</div>
	);
}
export default Section;
