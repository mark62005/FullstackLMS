import { CheckCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterProps {
	index: number;
	chapter: any;
	chapterId: string;
	sectionId: string;
	sectionProgress?: any;
	handleChapterClick: (sectionId: string, chapterId: string) => void;
	updateChapterProgress: (
		sectionId: string,
		chapterId: string,
		completed: boolean
	) => void;
}

function Chapter({
	chapter,
	index,
	sectionId,
	sectionProgress,
	chapterId,
	handleChapterClick,
	updateChapterProgress,
}: ChapterProps) {
	const chapterProgress = sectionProgress?.chapters.find(
		(c: any) => c.chapterId === chapter.chapterId
	);
	const isCurrentChapter = chapterId === chapter.chapterId;
	const isCompleted = chapterProgress?.completed;

	function handleToggleComplete(e: React.MouseEvent) {
		e.stopPropagation();

		updateChapterProgress(sectionId, chapter.chapterId, !isCompleted);
	}

	return (
		<li
			className={cn(
				`
          flex gap-3 items-center px-7 py-4 text-gray-300 cursor-pointer
        hover:bg-gray-700/20
        `,
				{
					"bg-gray-700/50": isCurrentChapter,
				}
			)}
			onClick={() => handleChapterClick(sectionId, chapter.chapterId)}
		>
			{isCompleted ? (
				<div
					className="bg-secondary-700 rounded-full p-1"
					title="Toggle completion status"
					onClick={handleToggleComplete}
				>
					<CheckCircle className="text-white-100 w-4 h-4" />
				</div>
			) : (
				<div
					className={cn(
						`
              w-6 h-6 flex items-center justify-center text-xs text-gray-400
              border border-gray-600 rounded-full
            `,
						{
							"bg-secondary-700 text-gray-800": isCurrentChapter,
						}
					)}
				>
					{index + 1}
				</div>
			)}
			<span
				className={cn(`flex-1 text-sm text-gray-500`, {
					"text-gray-500 line-through": isCompleted,
					"text-secondary-700": isCurrentChapter,
				})}
			>
				{chapter.title}
			</span>
			{chapter.type === "Text" && (
				<FileText className="text-gray-500 ml-2 w-4 h-4" />
			)}
		</li>
	);
}
export default Chapter;
