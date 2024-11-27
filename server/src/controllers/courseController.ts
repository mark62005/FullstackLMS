import { Request, Response } from "express";
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
