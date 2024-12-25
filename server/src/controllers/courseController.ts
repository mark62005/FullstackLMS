import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";
import Course from "../models/courseModel";

/**
 * If category is provided, return a list of courses of that category. Otherwise, return a list of all the courses.
 *
 * @param category: Category of courses
 */
export async function listCourses(req: Request, res: Response): Promise<void> {
	const { category } = req.query;

	try {
		const courses =
			category && category !== "all"
				? await Course.scan("category").eq(category).exec()
				: await Course.scan().exec();

		res.json({ message: "Courses retrieved successfully.", data: courses });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving courses.", error });
	}
}

/**
 * Return the course with the specified course ID.
 * If the course if not found, return a status of 404.
 *
 * @param courseId: ID of a course
 */
export async function getCourse(req: Request, res: Response): Promise<void> {
	const { courseId } = req.params;

	try {
		const course = await Course.get(courseId);
		if (!course) {
			res.status(404).json({ message: "Course not found." });
			return;
		}

		res.json({ message: "Course retrieved successfully.", data: course });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving course.", error });
	}
}

/**
 * Create a new course with default values, except teacher ID and name, as a draft.
 *
 * @param teacherId ID of a teacher
 * @param teacherName name of a teacher
 */
export async function createCourse(req: Request, res: Response): Promise<void> {
	const { teacherId, teacherName } = req.body;
	if (!teacherId || !teacherName) {
		res.status(400).json({
			message: "Teacher ID and name are required. Please try again.",
		});
		return;
	}

	const newCourse = new Course({
		courseId: uuidv4(),
		teacherId,
		teacherName,
		title: "Untitled Course",
		description: "",
		category: "Uncategorized",
		image: "",
		price: 0,
		level: "Beginner",
		status: "Draft",
		sections: [],
		enrollments: [],
	});

	try {
		await newCourse.save();

		res.json({
			message: `Course: ${newCourse.courseId} has been created successfully.`,
			data: newCourse,
		});
	} catch (error) {
		res.status(500).json({ message: "Error creating course.", error });
	}
}

/**
 * Update an existing course with the data provided by frontend.
 *
 * @param courseId ID of the course to update
 * @param updateCourseData data to update the course
 */
export async function updateCourse(req: Request, res: Response): Promise<void> {
	const { userId } = getAuth(req);
	const { courseId } = req.params;
	const updateCourseData = { ...req.body };

	try {
		const course = await Course.get(courseId);
		if (!course) {
			res.status(404).json({ message: "Course not found." });
			return;
		}

		if (course.teacherId !== userId) {
			res.status(403).json({
				message: "This user is not authorized to update this course.",
			});
			return;
		}

		if (updateCourseData.price) {
			const price = parseInt(updateCourseData.price);

			if (isNaN(price)) {
				res.status(400).json({
					message: "Invalid price format.",
					error: "Price must be a valid number.",
				});
				return;
			}

			updateCourseData.price = price * 100;
		}

		// UPDATE SECTIONS
		if (updateCourseData.sections) {
			const sectionsData =
				typeof updateCourseData.sections === "string"
					? JSON.parse(updateCourseData.sections)
					: updateCourseData.sections;

			updateCourseData.sections = sectionsData.map((section: any) => ({
				...section,
				sectionId: section.sectionId || uuidv4(),
				chapters: section.chapters.map((chapter: any) => ({
					...chapter,
					chapterId: chapter.chapterId || uuidv4(),
				})),
			}));
		}

		Object.assign(course, updateCourseData);
		await course.save();

		res.json({
			message: `Course has been updated successfully.`,
			data: course,
		});
	} catch (error) {
		res.status(500).json({ message: "Error updating course.", error });
	}
}

/**
 * Delete a course with the provided courseId.
 *
 * @param courseId ID of the course to delete
 *
 */
export async function deleteCourse(req: Request, res: Response): Promise<void> {
	const { userId } = getAuth(req);
	const { courseId } = req.params;

	try {
		const course = await Course.get(courseId);
		if (!course) {
			res.status(404).json({ message: "Course not found." });
			return;
		}

		if (course.teacherId !== userId) {
			res.status(403).json({
				message: "This user is not authorized to update this course.",
			});
			return;
		}

		await Course.delete(courseId);

		res.json({
			message: `Course has been deleted successfully.`,
		});
	} catch (error) {
		res.status(500).json({ message: "Error deleting course.", error });
	}
}
