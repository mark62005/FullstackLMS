import { DraggableProvided } from "@hello-pangea/dnd";
import { Edit, GripVertical, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/state/redux";
import { deleteChapter, openChapterModal } from "@/state";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ChapterItemProps = {
	chapter: Chapter;
	chapterIndex: number;
	sectionIndex: number;
	draggableProvided: DraggableProvided;
};

function ChapterItem({
	chapter,
	chapterIndex,
	sectionIndex,
	draggableProvided,
}: ChapterItemProps) {
	const dispatch = useAppDispatch();

	return (
		<div
			ref={draggableProvided.innerRef}
			{...draggableProvided.draggableProps}
			{...draggableProvided.dragHandleProps}
			className={cn(
				`flex justify-between items-center ml-4 mb-1 rounded px-1`,
				chapterIndex % 2 === 1 ? "bg-black/20" : "bg-black/40"
			)}
		>
			{/* TITLE */}
			<div className="flex items-center">
				<GripVertical className="h-4 w-4 mb-[2px]" />
				<p className="text-sm">{`${chapterIndex + 1}. ${chapter.title}`}</p>
			</div>

			{/* ACTION BUTTONS */}
			<div className="flex items-center gap-[1px]">
				{/* OPEN CHAPTER MODAL BUTTON */}
				<Button
					className="p-1"
					type="button"
					variant="ghost"
					size="sm"
					onClick={() =>
						dispatch(
							openChapterModal({
								sectionIndex,
								chapterIndex,
							})
						)
					}
				>
					<Edit className="h-4 w-4" />
				</Button>

				{/* DELETE CHAPTER BUTTON */}
				<Button
					className="p-1"
					type="button"
					variant="ghost"
					size="sm"
					onClick={() =>
						dispatch(deleteChapter({ sectionIndex, chapterIndex }))
					}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
export default ChapterItem;
