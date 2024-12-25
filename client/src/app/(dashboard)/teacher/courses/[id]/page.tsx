"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useGetCourseQuery, useUpdateCourseMutation } from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { CourseFormData, courseSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { centsToDollars, cn, createCourseFormData } from "@/lib/utils";
import { openSectionModal, setSections } from "@/state";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Loading from "@/components/shared/Loading";
import ProfileHeader from "@/components/shared/ProfileHeader";
import CustomFormField from "@/components/shared/form/CustomFormField";
import CustomDroppable from "@/components/courses/edit/droppable/CustomDroppable";
import ChapterModal from "@/components/courses/edit/modals/ChapterModal";
import SectionModal from "@/components/courses/edit/modals/SectionModal";

const CATEGORY_OPTIONS = [
	{ value: "technology", label: "Technology" },
	{ value: "science", label: "Science" },
	{ value: "mathematics", label: "Mathematics" },
	{
		value: "Artificial Intelligence",
		label: "Artificial Intelligence",
	},
];

function CourseEditPage() {
	const router = useRouter();
	const params = useParams();
	const id = params.id as string;
	const { data: course, isLoading, isError, refetch } = useGetCourseQuery(id);
	const [updateCourse] = useUpdateCourseMutation();
	// TODO: Upload video functionality

	const dispatch = useAppDispatch();
	const { sections } = useAppSelector((state) => state.global.courseEditor);

	const formMethods = useForm<CourseFormData>({
		resolver: zodResolver(courseSchema),
		defaultValues: {
			courseTitle: "",
			courseDescription: "",
			courseCategory: "",
			coursePrice: "0",
			courseStatus: false,
		},
	});

	useEffect(() => {
		if (course) {
			formMethods.reset({
				courseTitle: course.title,
				courseDescription: course.description,
				courseCategory: course.category,
				coursePrice: centsToDollars(course.price),
				courseStatus: course.status === "Published",
			});

			dispatch(setSections(course.sections || []));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [course, formMethods]);

	async function onSubmit(data: CourseFormData) {
		try {
			const formData = createCourseFormData(data, sections);

			await updateCourse({
				courseId: id,
				formData,
			}).unwrap();

			// TODO: Upload video functionality

			refetch();
		} catch (error) {
			console.error("Error updating course: ", error);
		}
	}

	if (isLoading) return <Loading />;
	if (isError) return <div>404 Course not found.</div>;

	return (
		<>
			{/* BACK TO COURSES PAGE BUTTON */}
			<div className="flex items-center gap-5 mb-5">
				<Button
					className="
            flex items-center gap-2 p-2
            border border-customgreys-dirtyGrey rounded-lg cursor-pointer
            hover:bg-customgreys-dirtyGrey hover:text-white-100 text-customgreys-dirtyGrey
          "
					onClick={() => router.push("/teacher/courses", { scroll: false })}
				>
					<ArrowLeft className="w-4 h-4" />
					<span>Back to Courses</span>
				</Button>
			</div>

			<Form {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(onSubmit)}>
					<ProfileHeader
						title="Course Setup"
						subtitle="Complete all fields and save your course."
						rightElement={
							<div className="flex items-center space-x-4">
								<CustomFormField
									name="courseStatus"
									label={
										formMethods.watch("courseStatus") ? "Published" : "Draft"
									}
									type="switch"
									className="flex items-center space-x-2"
									labelClassName={cn(
										"text-sm font-medium",
										formMethods.watch("courseStatus")
											? "text-green-500"
											: "text-yellow-500"
									)}
									inputClassName="data-[state=checked]:bg-green-500"
								/>
								<Button
									type="submit"
									className="bg-primary-700 hover:bg-primary-600"
								>
									{formMethods.watch("courseStatus")
										? "Update Published Course"
										: "Save Draft"}
								</Button>
							</div>
						}
					/>

					<div
						className="
              flex flex-col justify-between gap-10 mt-5 font-dm-sans
              md:flex-row
            "
					>
						<div className="basis-1/2">
							<div className="space-y-4">
								{/* COURSE TITLE */}
								<CustomFormField
									type="text"
									name="courseTitle"
									label="Course Title"
									initialValue={course?.title}
									placeholder="Write course title here"
									className="border-none"
								/>

								{/* COURSE DESCRIPTION */}
								<CustomFormField
									type="textarea"
									name="courseDescription"
									label="Course Description"
									initialValue={course?.description}
									placeholder="Write course description here"
								/>

								{/* COURSE CATEGORY */}
								<CustomFormField
									name="courseCategory"
									label="Course Category"
									type="select"
									placeholder="Select category here"
									options={CATEGORY_OPTIONS}
									initialValue={course?.category}
								/>

								{/* COURSE PRICE */}
								<CustomFormField
									name="coursePrice"
									label="Course Price"
									type="number"
									placeholder="0"
									min={0}
									initialValue={course?.price}
								/>
							</div>
						</div>

						{/* SECTIONS */}
						<div
							className="
                basis-1/2 mt-4 p-4 rounded-lg bg-customgreys-darkGrey
                md:mt-0
              "
						>
							<div className="flex justify-between items-center mb-2">
								<h2 className="text-2xl font-semibold text-secondary-foreground">
									Sections
								</h2>

								{/* ADD SECTION BUTTON */}
								<Button
									className="border-none text-primary-700 group"
									type="button"
									variant="outline"
									size="sm"
									onClick={() =>
										dispatch(openSectionModal({ sectionIndex: null }))
									}
								>
									<Plus className="mr-1 h-4 w-4 text-primary-700 group-hover:text-white-100" />
									<span className="text-primary-700 group-hover:text-white-100">
										Add Section
									</span>
								</Button>
							</div>

							{isLoading ? (
								<p>Loading course content...</p>
							) : sections.length > 0 ? (
								<CustomDroppable />
							) : (
								<p>No sections available</p>
							)}
						</div>
					</div>
				</form>
			</Form>

			<ChapterModal />
			<SectionModal />
		</>
	);
}
export default CourseEditPage;
