import { Button } from "@/components/ui/button";
import { getFormattedPrice } from "@/lib/utils";
import AccordionSections from "../AccordionSections";

type SelectedCourseProps = {
	course: Course;
	onEnrollNowButtonClick: (courseId: string) => void;
};

function SelectedCourse({
	course,
	onEnrollNowButtonClick,
}: SelectedCourseProps) {
	console.log(course);

	return (
		<div className="overflow-hidden py-9 px-9">
			{/* HEADER */}
			<div>
				<h3 className="text-white-50 font-semibold text-3xl">{course.title}</h3>
				<p className="text-gray-400 text-sm pt-3">
					By {course.teacherName} |{" "}
					<span className="font-bold text-gray-300">
						{course.enrollments?.length} enrolled
					</span>
				</p>
			</div>

			{/* DESCRIPTION & CONTENT */}
			<div className="mt-5">
				<p className="text-gray-500 mb-4">{course.description}</p>

				{/* COURSE SECTIONS */}
				<div className="mt-6">
					<h4 className="text-white-50/90 font-semibold mb-2">
						Course Content
					</h4>

					<AccordionSections sections={course.sections} />
				</div>

				{/* FOOTER */}
				<div className="flex justify-between items-center mt-5">
					<span className="text-primary-500 font-semibold text-2xl">
						{getFormattedPrice(course.price)}
					</span>

					<Button
						className="bg-primary-700 hover:bg-primary-600"
						onClick={() => onEnrollNowButtonClick(course.courseId)}
					>
						Enroll Now
					</Button>
				</div>
			</div>
		</div>
	);
}
export default SelectedCourse;
