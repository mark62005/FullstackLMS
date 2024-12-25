"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
	useCreateCourseMutation,
	useDeleteCourseMutation,
	useGetCoursesQuery,
} from "@/state/api";
import { Button } from "@/components/ui/button";
import Loading from "@/components/shared/Loading";
import ProfileHeader from "@/components/shared/ProfileHeader";
import Toolbar from "@/components/courses/Toolbar";
import TeacherCourseCard from "@/components/courses/TeacherCourseCard";

const COURSE_BASE_URL = `/teacher/courses`;

function TeacherCoursesPage() {
	const router = useRouter();
	const { user } = useUser();
	const {
		data: courses,
		isLoading,
		isError,
	} = useGetCoursesQuery({ category: "all" });

	const [createCourse] = useCreateCourseMutation();
	const [deleteCourse] = useDeleteCourseMutation();

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const filteredCourses = useMemo(() => {
		if (!courses) return [];

		return courses.filter((course) => {
			const matchesCourse = course.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase());

			const matchesCategory =
				selectedCategory === "all" || course.category === selectedCategory;

			return matchesCourse && matchesCategory;
		});
	}, [courses, searchTerm, selectedCategory]);

	async function handleCreateCourse() {
		if (!user) return;

		const result = await createCourse({
			teacherId: user.id,
			teacherName: user.fullName || "Unknown Teacher",
		}).unwrap();

		router.push(`${COURSE_BASE_URL}/${result.courseId}`);
	}

	function handleEditCourse(course: Course) {
		router.push(`${COURSE_BASE_URL}/${course.courseId}`);
	}

	async function handleDeleteCourse(course: Course) {
		if (window.confirm(`Are you sure you want to delete this course?`)) {
			await deleteCourse(course.courseId).unwrap();
		}
	}

	if (isLoading) return <Loading />;
	if (isError || !courses) return <div>Error loading courses.</div>;

	return (
		<div className="w-full h-full">
			<ProfileHeader
				title="Courses"
				subtitle="Browse your courses"
				rightElement={
					<Button
						className="bg-primary-700 hover:bg-primary-600"
						onClick={handleCreateCourse}
					>
						Create Course
					</Button>
				}
			/>

			<Toolbar
				onSearch={setSearchTerm}
				onCategoryChange={setSelectedCategory}
			/>

			{/* COURSES GRID */}
			<div
				className="
          grid grid-cols-1 gap-7 mt-6 w-full
          sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
        "
			>
				{filteredCourses.map((course) => (
					<TeacherCourseCard
						key={course.courseId}
						course={course}
						isOwner={course.teacherId === user?.id}
						onEdit={handleEditCourse}
						onDelete={handleDeleteCourse}
					/>
				))}
			</div>
		</div>
	);
}
export default TeacherCoursesPage;
