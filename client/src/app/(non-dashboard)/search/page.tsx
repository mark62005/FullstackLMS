"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useGetCoursesQuery } from "@/state/api";
import { Course } from "@/types";
import Loading from "@/components/shared/Loading";
import CourseCardSearch from "@/components/courses/search/CourseCardSearch";
import SelectedCourse from "@/components/courses/search/SelectedCourse";

function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const { data: courses, isLoading, isError } = useGetCoursesQuery({});

	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

	useEffect(() => {
		if (courses) {
			if (id) {
				const course = courses.find((c) => c.courseId === id);
				setSelectedCourse(course || courses[0]);
			} else {
				setSelectedCourse(courses[0]);
			}
		}
	}, [courses, id]);

	function onCourseCardClick(course: Course) {
		setSelectedCourse(course);

		router.push(`/search?id=${course.courseId}`);
	}

	function onEnrollNowButtonClick(courseId: string) {
		router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`);
	}

	if (isLoading) return <Loading />;
	if (isError || !courses) return <div>Failed to fetch courses.</div>;

	return (
		<motion.div
			className="flex flex-col bg-background text-foreground h-full mx-auto w-3/4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h1 className="font-normal text-2xl mt-14">List of Available Courses</h1>
			<h2 className="text-gray-500 mb-">{courses.length} courses available</h2>

			<div
				className="
          w-full flex flex-col-reverse pb-8 pt-2 gap-8
          md:flex-row
        "
			>
				{/* AVAILABLE COURSES GRID */}
				<motion.div
					className="
            basis-3/5 grid grid-cols-1 gap-6 auto-rows-fr
            xl:grid-cols-2
          "
					initial={{ y: 40, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					viewport={{ amount: 0.4 }}
				>
					{courses.map((course) => (
						<CourseCardSearch
							key={course.courseId}
							course={course}
							isSelected={
								selectedCourse?.courseId === course.courseId ? true : false
							}
							onClick={() => onCourseCardClick(course)}
						/>
					))}
				</motion.div>

				{/* SELECTED COURSE DETAILS */}
				{selectedCourse && (
					<motion.div
						className="
              basis-2/5 min-w-[350px] h-fit border-2 border-primary-600 bg-customgreys-secondarybg overflow-hidden rounded-lg
            "
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						<SelectedCourse
							course={selectedCourse}
							onEnrollNowButtonClick={onEnrollNowButtonClick}
						/>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
}
export default Search;
