"use client";

import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { setSections, openChapterModal } from "@/state";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/courses/edit/droppable/SectionHeader";
import ChapterItem from "@/components/courses/edit/droppable/ChapterItem";

function CustomDroppable() {
	const dispatch = useAppDispatch();
	const { sections } = useAppSelector((state) => state.global.courseEditor);

	function handleSectionDragEnd(result: DropResult): void {
		if (!result.destination) return;

		const startIndex = result.source.index;
		const endIndex = result.destination.index;

		const updatedSections = [...sections];
		const [reorderedSection] = updatedSections.splice(startIndex, 1);
		updatedSections.splice(endIndex, 0, reorderedSection);
		dispatch(setSections(updatedSections));
	}

	function handleChapterDragEnd(
		result: DropResult,
		sectionIndex: number
	): void {
		if (!result.destination) return;

		const startIndex = result.source.index;
		const endIndex = result.destination.index;

		// const updatedSections = [...sections];
		const updatedChapters = [...sections[sectionIndex].chapters];
		const [reorderedChapter] = updatedChapters.splice(startIndex, 1);

		updatedChapters.splice(endIndex, 0, reorderedChapter);

		const updatedSections = sections.map((section) => ({
			...section,
			chapters: [...updatedChapters],
		}));

		updatedSections[sectionIndex].chapters = updatedChapters;
		dispatch(setSections(updatedSections));
	}

	return (
		<DragDropContext onDragEnd={handleSectionDragEnd}>
			<Droppable droppableId="sections">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{sections.map((section: Section, sectionIndex: number) => (
							<Draggable
								key={section.sectionId}
								draggableId={section.sectionId}
								index={sectionIndex}
							>
								{(draggbleProvided) => (
									<div
										ref={draggbleProvided.innerRef}
										{...draggbleProvided.draggableProps}
										className={cn(
											`mb-4 p-2 rounded`,
											sectionIndex % 2 === 0
												? `bg-customgreys-dirtyGrey/30`
												: `bg-customgreys-secondarybg`
										)}
									>
										<SectionHeader
											section={section}
											sectionIndex={sectionIndex}
											dragHandleProps={draggbleProvided.dragHandleProps}
										/>

										<DragDropContext
											onDragEnd={(result) =>
												handleChapterDragEnd(result, sectionIndex)
											}
										>
											<Droppable droppableId={`chapters-${section.sectionId}`}>
												{(droppableProvided) => (
													<div
														ref={droppableProvided.innerRef}
														{...droppableProvided.droppableProps}
													>
														{section.chapters.map(
															(chapter: Chapter, chapterIndex: number) => (
																<Draggable
																	key={chapter.chapterId}
																	draggableId={chapter.chapterId}
																	index={chapterIndex}
																>
																	{(draggbleProvided) => (
																		<ChapterItem
																			key={chapter.chapterId}
																			chapter={chapter}
																			chapterIndex={chapterIndex}
																			sectionIndex={sectionIndex}
																			draggableProvided={draggbleProvided}
																		/>
																	)}
																</Draggable>
															)
														)}
														{droppableProvided.placeholder}
													</div>
												)}
											</Droppable>
										</DragDropContext>

										<Button
											className="border-none text-primary-700 group"
											type="button"
											variant="outline"
											size="sm"
											onClick={() =>
												dispatch(
													openChapterModal({
														sectionIndex,
														chapterIndex: null,
													})
												)
											}
										>
											<Plus className="mr-1 h-4 w-4 text-primary-700" />
											<span className="text-primary-700">Add Chapter</span>
										</Button>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
export default CustomDroppable;
