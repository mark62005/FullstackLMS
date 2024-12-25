import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { Edit, GripVertical, Trash2 } from "lucide-react";
import { deleteSection, openSectionModal } from "@/state";
import { useAppDispatch } from "@/state/redux";
import { Button } from "@/components/ui/button";

type SectionHeaderProps = {
	section: Section;
	sectionIndex: number;
	dragHandleProps: DraggableProvidedDragHandleProps;
};

function SectionHeader({
	section,
	sectionIndex,
	dragHandleProps,
}: SectionHeaderProps) {
	const dispatch = useAppDispatch();
	const { sectionTitle, sectionDescription } = section;

	return (
		<div
			className="flex justify-between items-center mb-2 p-1 rounded bg-black/30"
			{...dragHandleProps}
		>
			<div className="w-full flex flex-col gap-1">
				<div className="w-full flex items-center justify-between">
					{/* TITLE */}
					<div className="flex items-center">
						<GripVertical className="h-6 w-6 mb-1" />
						<h3 className="text-lg font-medium">{sectionTitle}</h3>
					</div>

					{/* ACTION BUTTONS */}
					<div className="flex items-center gap-2">
						{/* OPEN SECTION MODAL BUTTON */}
						<Button
							className="p-2 hover:bg-primary-700"
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => dispatch(openSectionModal({ sectionIndex }))}
						>
							<Edit className="h-5 w-5" />
						</Button>

						{/* DELETE SECTION BUTTON */}
						<Button
							className="p-2"
							type="button"
							variant="destructive"
							size="sm"
							onClick={() => dispatch(deleteSection({ sectionIndex }))}
						>
							<Trash2 className="h-5 w-5" />
						</Button>
					</div>
				</div>

				{sectionDescription && (
					<p className="text-sm text-customgreys-dirtyGrey ml-6">
						{sectionDescription}
					</p>
				)}
			</div>
		</div>
	);
}
export default SectionHeader;
