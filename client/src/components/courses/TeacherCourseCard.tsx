import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

type TeacherCourseCardProps = {
	course: Course;
	onEdit: (course: Course) => void;
	onDelete: (course: Course) => void;
	isOwner: boolean;
};

function TeacherCourseCard({
	course,
	isOwner,
	onEdit,
	onDelete,
}: TeacherCourseCardProps) {
	return (
		<Card
			className="
        w-full h-[400px] p-0 flex flex-col overflow-hidden transition duration-200
        text-foreground bg-customgreys-primarybg border-none group
        hover:bg-white-100/10
      "
		>
			<CardHeader className="p-0 h-[400px] overflow-hidden">
				{course.image && (
					<Image
						className="rounded-t-lg w-[100%] h-[100%] object-cover transition-transform"
						src={course.image}
						alt={`Image of ${course.title}`}
						width={370}
						height={200}
					/>
				)}
			</CardHeader>

			<CardContent className="w-full pb-6 pt-4 flex-grow flex flex-col justify-between text-gray-400">
				<div className="flex flex-col">
					<CardTitle className="text-primary-50 text-md md:text-lg line-clamp-2 overflow-hidden">
						{course.title}
					</CardTitle>

					<CardDescription className="bg-customgreys-dirtyGrey/50 px-2 py-1 mt-3 mb-3 rounded-xl w-fit text-sm">
						{course.category}
					</CardDescription>

					{/* COURSE PUBLISH STATUS */}
					<p className="text-sm mb-2">
						Status:{" "}
						<span
							className={cn(
								"font-semibold px-2 py-1 rounded",
								course.status === "Published"
									? "bg-green-500/20 text-green-400"
									: "bg-red-500/20 text-red-400"
							)}
						>
							{course.status}
						</span>
					</p>

					{/* COURSE ENROLLMENTS */}
					{course.enrollments && (
						<p className="ml-1 mt-1 inline-block text-secondary bg-secondary/10 text-sm font-normal">
							<span className="font-bold text-white-100">
								{course.enrollments.length}
							</span>{" "}
							Student{course.enrollments.length > 1 ? "s" : ""} Enrolled
						</p>
					)}
				</div>

				<div className="w-full gap-2 mt-3 space-y-2 xl:flex xl:space-y-0">
					{isOwner ? (
						<>
							{/* EDIT BUTTON */}
							<div>
								<Button
									className="
                    rounded w-full bg-primary-700 border-none text-white-100 cursor-pointer
                    hover:bg-primary-600 hover:text-customgreys-primarybg
                  "
									variant="outline"
									onClick={() => onEdit(course)}
								>
									<Pencil className="w-4 h-4 mr-2" />
									Edit Course
								</Button>
							</div>
							{/* DELETE BUTTON */}
							<div>
								<Button
									className="
                    rounded w-full bg-red-600 text-white-100 cursor-pointer
                    hover:bg-red-400 hover:text-customgreys-primarybg
                  "
									variant="destructive"
									onClick={() => onDelete(course)}
								>
									<Trash2 className="w-4 h-4 mr-2" />
									Delete Course
								</Button>
							</div>
						</>
					) : (
						<p className="text-sm text-gray-500 italic">View Only</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
export default TeacherCourseCard;
