import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import UserCourseProgress from "../models/userCourseProgressModel";
import Course from "../models/courseModel";
import { getOverallProgress } from "../utils";
import { mergeSections } from "../utils";

/**
 * Query the enrolled courses by a user.
 *
 * @param userId ID of an user
 */
export async function getUserEnrolledCourses(
	req: Request,
	res: Response
): Promise<void> {
	const { userId } = req.params;

	try {
		const enrolledCourses = await UserCourseProgress.query("userId")
			.eq(userId)
			.exec();
		const courseIds = enrolledCourses.map((course: any) => course.courseId);
		const courses = await Course.batchGet(courseIds);

		res.json({
			message: "Retrieved enrolled courses successfully.",
			data: courses,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving enrolled courses", error });
	}
}

/**
 * Retrieve the progress of a course by a user
 *
 * @param userId ID of an user
 * @param courseId ID of a course
 */
export async function getUserCourseProgress(
	req: Request,
	res: Response
): Promise<void> {
	const { userId, courseId } = req.params;

	try {
		const progress = await UserCourseProgress.get({ userId, courseId });

		res.json({
			message: "Retrieved course progress successfully.",
			data: progress,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving user course progress", error });
	}
}

/**
 * Update the course progress of a user
 *
 * @param userId ID of an user
 * @param courseId ID of a course
 */
export async function updateUserCourseProgress(
	req: Request,
	res: Response
): Promise<void> {
	const { userId, courseId } = req.params;
	const progressData = req.body;

	try {
		let progress = await UserCourseProgress.get({ userId, courseId });

		if (!progress) {
			progress = new UserCourseProgress({
				userId,
				courseId,
				enrollmentDate: new Date().toISOString(),
				overallProgress: 0,
				sections: progressData.sections || [],
				lastAccessedTimestamp: new Date().toISOString(),
			});
		} else {
			progress.sections = mergeSections(
				progress.sections,
				progressData.sections || []
			);

			progress.lastAccessedTimestamp = new Date().toISOString();
			progress.overallProgress = getOverallProgress(progress.sections);
		}

		await progress.save();

		res.json({
			message: "",
			data: progress,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error update user course progress", error });
	}
}
