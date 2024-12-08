import { cn, getFormattedPrice } from "@/lib/utils";
import Image from "next/image";

type CourseCardSearchProps = {
	course: Course;
	isSelected?: boolean;
	onClick: () => void;
};

function CourseCardSearch({
	course,
	isSelected,
	onClick,
}: CourseCardSearchProps) {
	return (
		<div
			className={cn(
				`
					bg-customgreys-secondarybg rounded-lg border-2
					transition duration-200 overflow-hidden
					flex flex-col cursor-pointer h-full group
					hover:bg-white-100/10 
				`,
				`${isSelected ? "border-primary-600" : "border-transparent"}`
			)}
			onClick={onClick}
		>
			{/* IMAGE */}
			<div className="relative w-auto pt-[56.25%]">
				<Image
					src={course.image || "/placeholder.png"}
					alt={`Image of ${course.title}`}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover transition-transform"
				/>
			</div>

			{/* CONTENT */}
			<div className="p-4 flex flex-col justify-between flex-grow">
				<div className="">
					<h2 className="font-semibold line-clamp-1">{course.title}</h2>
					<p className="text-sm mt-1 line-clamp-2">{course.description}</p>
				</div>

				<div className="mt-2">
					<p className="text-customgreys-dirtyGrey text-sm">
						By {course.teacherName}
					</p>
				</div>

				{/* PRICE AND ENROLLMENT */}
				<div className="flex justify-between items-center mt-1">
					<p className="text-primary-500 font-semibold">
						{getFormattedPrice(course.price)}
					</p>
					<p className="text-customgreys-dirtyGrey text-sm">
						{course.enrollments?.length} Enrolled
					</p>
				</div>
			</div>
		</div>
	);
}
export default CourseCardSearch;
