import { Trophy } from "lucide-react";
import ProgressBar from "./ProgressBar";

interface ProgressVisualsProps {
	section: any;
	sectionProgress?: any;
	completedChapters: number;
	totalChapters: number;
}

function ProgressVisuals({
	section,
	sectionProgress,
	completedChapters,
	totalChapters,
}: ProgressVisualsProps) {
	return (
		<>
			<div className="flex justify-between items-center gap-5 mb-2 px-7">
				{/* PROGRESS BARS */}
				<div className="flex-grow flex gap-1">
					{section.chapters.map((chapter: any) => (
						<ProgressBar
							key={chapter.chapterId}
							sectionProgress={sectionProgress ?? null}
							chapter={chapter}
						/>
					))}
				</div>

				{/* TROPHY */}
				<div className="bg-secondary-700 rounded-full p-3 flex items-center justify-center">
					<Trophy className="text-customgreys-secondarybg w-4 h-4" />
				</div>
			</div>

			<p className="text-gray-500 text-xs mt-3 mb-5 px-7">
				{completedChapters}/{totalChapters} COMPLETED
			</p>
		</>
	);
}
export default ProgressVisuals;
