import { ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { addChapter, closeChapterModal, editChapter } from "@/state";
import { ChapterFormData, chapterSchema } from "@/lib/schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/form/CustomFormField";
import CustomModal from "@/components/shared/form/CustomModal";

function ChapterModal() {
	const dispatch = useAppDispatch();
	const {
		isChapterModalOpen,
		selectedSectionIndex,
		selectedChapterIndex,
		sections,
	} = useAppSelector((state) => state.global.courseEditor);

	const chapter: Chapter | undefined =
		selectedSectionIndex !== null && selectedChapterIndex !== null
			? sections[selectedSectionIndex].chapters[selectedChapterIndex]
			: undefined;

	const formMethods = useForm<ChapterFormData>({
		resolver: zodResolver(chapterSchema),
		defaultValues: {
			title: "",
			content: "",
			video: "",
		},
	});

	useEffect(() => {
		if (chapter) {
			formMethods.reset({
				title: chapter.title,
				content: chapter.content,
				video: chapter.video || "",
			});
		} else {
			formMethods.reset({
				title: "",
				content: "",
				video: "",
			});
		}
	}, [chapter, formMethods]);

	function onClose() {
		dispatch(closeChapterModal());

		// Reset fields
		formMethods.reset({
			title: "",
			content: "",
			video: "",
		});
	}

	function onSubmit(data: ChapterFormData) {
		if (selectedSectionIndex === null) return;

		const newChapter: Chapter = {
			chapterId: chapter?.chapterId || uuidv4(),
			title: data.title,
			content: data.content,
			type: data.video ? "Video" : "Text",
			video: data.video,
		};

		if (selectedChapterIndex === null) {
			dispatch(
				addChapter({
					sectionIndex: selectedSectionIndex,
					chapter: newChapter,
				})
			);
		} else {
			dispatch(
				editChapter({
					sectionIndex: selectedSectionIndex,
					chapterIndex: selectedChapterIndex,
					updatedChapter: newChapter,
				})
			);
		}

		toast.success(
			`Chapter added/updated successfully but you need to save the course to apply the changes.`
		);
		onClose();
	}

	function handleVideoInputChange(
		e: ChangeEvent<HTMLInputElement>,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onChange: (...event: any[]) => void
	) {
		const file = e.target.files?.[0];

		if (file) {
			onChange(file);
		}
	}

	return (
		<CustomModal
			isOpen={isChapterModalOpen}
			onClose={onClose}
		>
			<div className="flex flex-col">
				{/* HEADER */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">Add/Edit Chapter</h2>
					<button
						className="text-gray-500 hover:text-gray-700"
						onClick={onClose}
					>
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* FORM */}
				<Form {...formMethods}>
					<form
						className="space-y-4"
						onSubmit={formMethods.handleSubmit(onSubmit)}
					>
						{/* TITLE */}
						<CustomFormField
							name="title"
							label="Chapter Title"
							placeholder="Write chapter title here"
						/>

						{/* CONTENT */}
						<CustomFormField
							name="content"
							label="Chapter Content"
							type="textarea"
							placeholder="Write chapter content here..."
							className="py-2"
						/>

						{/* VIDEO */}
						<FormField
							control={formMethods.control}
							name="video"
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel className="text-sm text-customgreys-dirtyGrey">
										Chapter Video
									</FormLabel>

									<FormControl>
										<div>
											<Input
												className="border-none bg-customgreys-darkGrey py-2 cursor-pointer"
												type="file"
												accept="video/*"
												onChange={(e) => handleVideoInputChange(e, onChange)}
											/>

											{typeof value === "string" && value && (
												<div className="my-2 text-sm text-gray-600">
													Current video: {value.split("/").pop()}
												</div>
											)}

											{value instanceof File && (
												<div className="my-2 text-sm text-gray-600">
													Selected file: {value.name}
												</div>
											)}
										</div>
									</FormControl>

									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>

						{/* ACTION BUTTONS */}
						<div className="flex justify-end space-x-2 mt-6">
							{/* CANCEL BUTTON */}
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
							>
								Cancel
							</Button>

							{/* SAVE BUTTON */}
							<Button
								type="submit"
								className="bg-primary-700"
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</CustomModal>
	);
}
export default ChapterModal;
