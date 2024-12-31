import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getFormattedPrice } from "@/lib/utils";

interface CourseCardProps {
	course: Course;
	onGoToCourse: (course: Course) => void;
}

function CourseCard({ course, onGoToCourse }: CourseCardProps) {
	return (
		<Card
			className="
        flex flex-col w-full h-[340px] border-none bg-customgreys-primarybg 
        overflow-hidden cursor-pointer transition duration-200 group
        xl:h-[380px] hover:bg-white-100/10
      "
			onClick={() => onGoToCourse(course)}
		>
			<CardHeader className="h-[350px] p-0 overflow-hidden xl:h-[380px]">
				<Image
					className="w-full h-full object-cover transition-transform"
					alt={course.title}
					src={course.image || "/placeholder.png"}
					width={400}
					height={350}
					priority
				/>
			</CardHeader>

			<CardContent className="flex-grow flex flex-col justify-between w-full h-full p-6">
				<CardTitle className="text-md font-semibold line-clamp-2 lg:text-lg">
					{course.title}: {course.description}
				</CardTitle>

				{/* TEACHER NAME */}
				<div className="flex items-center gap-2">
					<Avatar className="w-6 h-6">
						<AvatarImage alt={course.teacherName} />
						<AvatarFallback className="text-black bg-secondary-700">
							{course.teacherName[0]}
						</AvatarFallback>
					</Avatar>

					<p className="text-sm text-customgreys-dirtyGrey">
						{course.teacherName}
					</p>
				</div>

				<CardFooter className="p-0 flex justify-between">
					<div className="text-sm bg-customgreys-secondarybg rounded-full px-3 py-2 text-gray-400">
						{course.category}
					</div>
					<span className="text-primary-500 font-bold text-md">
						{getFormattedPrice(course.price)}
					</span>
				</CardFooter>
			</CardContent>
		</Card>
	);
}
export default CourseCard;
