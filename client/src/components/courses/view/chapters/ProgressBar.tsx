import { cn } from "@/lib/utils";

interface ProgressBarProps {
	sectionProgress?: any;
	chapter: any;
}

function ProgressBar({ sectionProgress, chapter }: ProgressBarProps) {
	const isCompleted = sectionProgress?.chapters.find(
		(c: any) => c.chapterId === chapter.chapterId
	)?.completed;

	return (
		<div
			className={cn("h-1 flex-grow rounded-full bg-gray-700", {
				"bg-secondary-700": isCompleted,
			})}
		/>
	);
}
export default ProgressBar;
