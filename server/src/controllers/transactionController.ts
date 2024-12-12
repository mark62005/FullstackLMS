import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Course from "../models/courseModel";
import Transaction from "../models/transactionModel";
import UserCourseProgress from "../models/userCourseProgressModel";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error(
		"STRIPE_SECRET_KEY is required but was not found in env variables."
	);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* STRIPE */
/**
 * Create a Stripe payment intent, then return the client secret of it if successful.
 *
 * @param amount Amount of the transaction
 */
export async function createStripePaymentIntent(
	req: Request,
	res: Response
): Promise<void> {
	let { amount } = req.body;
	if (!amount || amount <= 0) {
		amount = 50;
	}

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: "cad",
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: "never",
			},
		});

		res.json({
			message: "",
			data: {
				clientSecret: paymentIntent.client_secret,
			},
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating Stripe payment intent.", error });
	}
}

/* TRANSACTIONS */
/**
 * Create a new transaction record, as well as the initial user course progress. Then add enrollment to relevant course.
 *
 * @param userId ID of the user
 * @param courseId ID of the course to purchase
 * @param transactionId ID of the payment intent created by Stripe
 * @param amount Amount of the transaction
 * @param paymentProvider Payment provider (Stripe)
 */
export async function createTransaction(
	req: Request,
	res: Response
): Promise<void> {
	const { userId, courseId, transactionId, amount, paymentProvider } = req.body;

	try {
		// 1. GET COURSE INFO
		const course = await Course.get(courseId);
		if (!course) res.status(404).json({ message: "Course not found." });

		const newDateTime = new Date().toISOString();

		// 2. CREATE TRANSACTION RECORD
		const newTransaction = new Transaction({
			dateTime: newDateTime,
			userId,
			courseId,
			transactionId,
			amount,
			paymentProvider,
		});
		await newTransaction.save();

		// 3. CREATE INITIAL PROGRESS FOR THAT COURSE
		const initialProgress = new UserCourseProgress({
			userId,
			courseId,
			enrollmentDate: newDateTime,
			overallProgress: 0,
			sections: course.sections.map((section: any) => ({
				sectionId: section.sectionId,
				chapters: section.chapters.map((chapter: any) => ({
					chapterId: chapter.chapterId,
					completed: false,
				})),
			})),
			lastAccessedTimestamp: newDateTime,
		});
		await initialProgress.save();

		// 4. ADD ENROLLMENT TO RELEVANT COURSE
		await Course.update(
			{
				courseId,
			},
			{
				$ADD: {
					enrollments: [{ userId }],
				},
			}
		);

		res.json({
			message: `Purchased course: ${courseId} successfully.`,
			data: {
				transaction: newTransaction,
				courseProgress: initialProgress,
			},
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error creating transaction and enrollment.", error });
	}
}
