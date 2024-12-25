import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { addSection, closeSectionModal, editSection } from "@/state";
import { SectionFormData, sectionSchema } from "@/lib/schema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomFormField from "@/components/shared/form/CustomFormField";
import CustomModal from "@/components/shared/form/CustomModal";

function SectionModal() {
	const dispatch = useAppDispatch();
	const { isSectionModalOpen, selectedSectionIndex, sections } = useAppSelector(
		(state) => state.global.courseEditor
	);

	const section: Section | undefined =
		selectedSectionIndex !== null ? sections[selectedSectionIndex] : undefined;

	const formMethods = useForm<SectionFormData>({
		resolver: zodResolver(sectionSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	useEffect(() => {
		if (section) {
			formMethods.reset({
				title: section.sectionTitle,
				description: section.sectionDescription,
			});
		} else {
			formMethods.reset({
				title: "",
				description: "",
			});
		}
	}, [section, formMethods]);

	function onClose() {
		dispatch(closeSectionModal());

		// Reset fields
		formMethods.reset({
			title: "",
			description: "",
		});
	}

	function onSubmit(data: SectionFormData) {
		const newSection: Section = {
			sectionId: section?.sectionId || uuidv4(),
			sectionTitle: data.title,
			sectionDescription: data.description,
			chapters: section?.chapters || [],
		};

		if (selectedSectionIndex === null) {
			dispatch(addSection(newSection));
		} else {
			dispatch(
				editSection({
					sectionIndex: selectedSectionIndex,
					section: newSection,
				})
			);
		}

		toast.success(
			`Section added/updated successfully but you need to save the course to apply the changes.`
		);
		onClose();
	}

	return (
		<CustomModal
			isOpen={isSectionModalOpen}
			onClose={onClose}
		>
			<div className="flex flex-col">
				{/* HEADER */}
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold">Add/Edit Section</h2>
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
							label="Section Title"
							placeholder="Write section title here"
						/>

						{/* DESCRIPTION */}
						<CustomFormField
							name="description"
							label="Section Description"
							type="textarea"
							placeholder="Write section description here..."
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
export default SectionModal;
