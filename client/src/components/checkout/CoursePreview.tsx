import Image from "next/image";
import AccordionSections from "@/components/courses/AccordionSections";
import { getFormattedPrice } from "@/lib/utils";

type CoursePreviewProps = {
	course: Course;
};

function CoursePreview({ course }: CoursePreviewProps) {
	return (
		<div className="space-y-10">
			{/* COURSE */}
			<div
				className="
          w-full py-8 px-10 flex flex-col gap-5 
          bg-customgreys-secondarybg rounded-lg
        "
			>
				{/* IMAGE */}
				<div className="mb-2 bg-white-50">
					<Image
						src={course.image || "/course-preview-placeholder.png"}
						alt={`Image of ${course.title}`}
						width={640}
						height={360}
						className="w-full"
					/>
				</div>

				{/* COURSE DETAILS */}
				<div>
					<h2 className="text-white-50 text-3xl font-bold mb-2">
						{course.title}
					</h2>
					<p className="text-gray-400 text-md mb-4">by {course.teacherName}</p>
					<p className="text-sm text-customgreys-dirtyGrey">
						{course.description}
					</p>
				</div>

				{/* COURSE CONTENT */}
				<div>
					<h4 className="text-white-50/90 font-semibold mb-2">
						Course Content
					</h4>
					<AccordionSections sections={course.sections} />
				</div>
			</div>

			{/* PRICE */}
			<div
				className="
          w-full py-8 px-10 flex flex-col gap-5 
          bg-customgreys-secondarybg rounded-lg
        "
			>
				<h3 className="text-xl mb-4">Price Details (1 item)</h3>
				{/* ITEMS */}
				<div className="flex justify-between mb-4 text-customgreys-dirtyGrey text-base">
					<span className="font-bold">1x {course.title}</span>
					<span className="font-bold">{getFormattedPrice(course.price)}</span>
				</div>

				{/* TOTAL */}
				<div className="flex justify-between border-t border-customgreys-dirtyGrey pt-4">
					<span className="font-bold text-lg">Total Amount</span>
					<span className="font-bold text-lg">
						{getFormattedPrice(course.price)}
					</span>
				</div>
			</div>
		</div>
	);
}
export default CoursePreview;
