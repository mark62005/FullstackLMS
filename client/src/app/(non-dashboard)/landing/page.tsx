"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UseCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/courses/search/CourseCardSearch";

const HERO_IMAGES = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];

const FEATURED_COURSES_TAGS = [
	"web development",
	"enterprise IT",
	"react nextjs",
	"javascript",
	"backend development",
];

function LoadingSkeleton() {
	return (
		<div className="w-3/4">
			{/* HERO */}
			<div className="flex justify-between items-center mt-12 h-[500px] rounded-lg bg-customgreys-secondarybg">
				<div className="basis-1/2 px-16 mx-auto">
					<Skeleton className="h-8 w-48 mb-4" />
					<Skeleton className="h-4 w-96 mb-2" />
					<Skeleton className="h-4 w-72 mb-8" />
					<Skeleton className="w-40 h-10" />
				</div>

				<Skeleton className="basis-1/2 h-full rounded-r-lg" />
			</div>

			{/* FEATURED COURSES */}
			<div className="mx-auto py-12 mt-10">
				<Skeleton className="h-6 w-48 mb-4" />
				<Skeleton className="h-4 w-full max-w-2xl mb-8" />

				{/* TAGS */}
				<div className="flex flex-wrap gap-4 mb-8">
					{[1, 2, 3, 4, 5].map((_, index) => (
						<Skeleton
							key={index}
							className="w-24 h-6 rounded-full"
						/>
					))}
				</div>

				{/* COURSES */}
				<div
					className="
            grid grid-cols-1 gap-6
            md:grid-cols-2 lg:grid-cols-4
          "
				>
					{[1, 2, 3, 4].map((_, index) => (
						<Skeleton
							key={index}
							className="h-[300px] rounded-lg"
						/>
					))}
				</div>
			</div>
		</div>
	);
}

function Landing() {
	const router = useRouter();
	const { data: courses, isLoading, isError } = useGetCoursesQuery({});
	const currentImage = UseCarousel({ totalImages: 3 });

	function onCourseCardClick(courseId: string) {
		router.push(`/search?id=${courseId}`);
	}

	return (
		<motion.div
			className="w-3/4"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			{/* HERO */}
			<motion.section
				className="flex justify-between items-center mt-12 h-[500px] rounded-lg bg-customgreys-secondarybg"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				{/* LEFT SIDE */}
				<div className="basis-1/2 px-16 mx-auto">
					<h1 className="text-4xl font-bold mb-4">Courses</h1>
					<p className="text-lg text-gray-400 mb-8">
						This is the list of the courses you can enroll in.
						<br />
						Courses when you need them and want them.
					</p>

					<div className="w-fit">
						<Link
							href="/search"
							scroll={false}
						>
							<div className="bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded-md">
								Search for Courses
							</div>
						</Link>
					</div>
				</div>

				{/* RIGHT SIDE */}
				<div className="basis-1/2 h-full relative overflow-hidden rounded-r-lg">
					{HERO_IMAGES.map((src, index) => (
						<Image
							key={index}
							src={src}
							alt={`Hero Image ${index + 1} for landing page.`}
							fill
							priority={index === currentImage}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className={cn(
								"object-cover transition-opacity duration-500 opacity-0",
								`${index === currentImage ? "opacity-100" : ""}`
							)}
						/>
					))}
				</div>
			</motion.section>

			{/* FEATURED COURSES */}
			<motion.section
				className="mx-auto py-12 mt-10"
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5 }}
				viewport={{ amount: 0.3, once: true }}
			>
				{/* TITLE AND DESCRIPTION */}
				<h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
				<p className="text-customgreys-dirtyGrey mb-8">
					From beginner to advanced, in all industries, we have the right
					courses just for you and preparing your entire journey for learning
					and making the most.
				</p>

				{/* TAGS */}
				<div className="flex flex-wrap gap-4 mb-8">
					{FEATURED_COURSES_TAGS.map((tag, index) => (
						<span
							key={index}
							className="px-3 py-1 bg-customgreys-secondarybg rounded-full text-sm"
						>
							{tag}
						</span>
					))}
				</div>

				{/* COURSES */}
				<div
					className="
            grid grid-cols-1 gap-6
            md:grid-cols-2 lg:grid-cols-4
          "
				>
					{courses &&
						courses.slice(0, 4).map((course, index) => (
							<motion.div
								key={course.courseId}
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.5, delay: index * 0.2 }}
								viewport={{ amount: 0.4 }}
							>
								<CourseCardSearch
									course={course}
									onClick={() => onCourseCardClick(course.courseId)}
								/>
							</motion.div>
						))}
				</div>
			</motion.section>
		</motion.div>
	);
}
export default Landing;
