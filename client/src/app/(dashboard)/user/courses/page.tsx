"use client";

import { useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useGetUserEnrolledCoursesQuery } from "@/state/api";
import Loading from "@/components/shared/Loading";
import ProfileHeader from "@/components/shared/ProfileHeader";
import Toolbar from "@/components/courses/Toolbar";
import CourseCard from "@/components/courses/view/CourseCard";

function UserCoursesPage() {
	const router = useRouter();
	const { user, isLoaded } = useUser();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");

	const {
		data: courses,
		isLoading,
		isError,
	} = useGetUserEnrolledCoursesQuery(user?.id ?? "", {
		skip: !isLoaded || !user,
	});

	const filteredCourses = useMemo(() => {
		if (!courses) return [];

		return courses.filter((course) => {
			const matchesSearch = course.title
				.toLowerCase()
				.includes(searchTerm.toLowerCase());
			const matchesCategory =
				selectedCategory === "all" || course.category === selectedCategory;

			return matchesSearch && matchesCategory;
		});
	}, [courses, searchTerm, selectedCategory]);

	const handleGoToCourse = (course: Course) => {
		if (
			course.sections &&
			course.sections.length > 0 &&
			course.sections[0].chapters.length > 0
		) {
			const firstChapter = course.sections[0].chapters[0];
			router.push(
				`/user/courses/${course.courseId}/chapters/${firstChapter.chapterId}`
			);
		}
	};

	if (!isLoaded || isLoading) return <Loading />;
	if (!user) return <div>Please sign in to view your courses.</div>;
	if (isError || !courses || courses.length === 0)
		return <div>You are not enrolled in any courses yet.</div>;

	return (
		<div className="w-full h-full">
			<ProfileHeader
				title="My Courses"
				subtitle="View your enrolled courses"
			/>
			<Toolbar
				onSearch={setSearchTerm}
				onCategoryChange={setSelectedCategory}
			/>
			<div
				className="
          grid grid-cols-1 gap-7 mt-6 w-full
          sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4
        "
			>
				{filteredCourses.map((course) => (
					<CourseCard
						key={course.courseId}
						course={course}
						onGoToCourse={handleGoToCourse}
					/>
				))}
			</div>
		</div>
	);
}
export default UserCoursesPage;
