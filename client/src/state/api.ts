import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type User } from "@clerk/nextjs/server";
import { Clerk } from "@clerk/clerk-js";
import { toast } from "sonner";

const customBaseQuery = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: any
) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
		prepareHeaders: async (headers) => {
			const token = await window.Clerk?.session?.getToken();

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	});

	try {
		const result: any = await baseQuery(args, api, extraOptions);

		if (result.error) {
			const errorData = result.error.data;
			const errorMessage =
				errorData?.message ||
				result.error.status.toString() ||
				"An error occurred";

			toast.error(`Error: ${errorMessage}`);
		}

		const isMutationRequest =
			(args as FetchArgs).method && (args as FetchArgs).method !== "GET";

		if (isMutationRequest) {
			const successMessage = result.data?.message;
			if (successMessage) toast.success(successMessage);
		}

		if (result.data) {
			result.data = result.data.data;
		} else if (
			result.error?.status === 204 ||
			result.meta?.response?.status === 24
		) {
			return { data: null };
		}

		return result;
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown Error occured";

		return { error: { status: "FETCH_ERROR", message: errorMessage } };
	}
};

export const api = createApi({
	baseQuery: customBaseQuery,
	reducerPath: "api",
	tagTypes: ["Courses", "Transactions", "Users", "UserCourseProgress"],
	endpoints: (build) => ({
		// TODO: api endpoints

		/* USER CLERK */
		/**
		 * Update users with user info provided, then query all the users right away.
		 *
		 * @param userId ID of a user
		 * @param updatedUser Updated user info
		 */
		updateUser: build.mutation<User, Partial<User> & { userId: string }>({
			query: ({ userId, ...updatedUser }) => ({
				url: `users/clerk/${userId}`,
				method: "PUT",
				body: updatedUser,
			}),
			invalidatesTags: ["Users"],
		}),

		/* COURSE */
		/**
		 * Query the courses of a specific category, if it's provided. Otherwise, query all courses.
		 *
		 * @param category: Category of course
		 */
		getCourses: build.query<Course[], { category?: string }>({
			query: ({ category }) => ({
				url: "courses",
				params: { category },
			}),
			providesTags: ["Courses"],
		}),
		/**
		 * Query the course with the ID provided.
		 *
		 * @param id: ID of a course
		 */
		getCourse: build.query<Course, string>({
			query: (id) => `courses/${id}`,
			providesTags: (results, error, id) => [
				{
					type: "Courses",
					id,
				},
			],
		}),
		/**
		 * Create a new course with id and name of the teacher.
		 *
		 * @param teacherId ID of the teacher
		 * @param teacherName Name of the teacher
		 */
		createCourse: build.mutation<
			Course,
			{ teacherId: string; teacherName: string }
		>({
			query: (body) => ({
				url: `courses`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Courses"],
		}),
		/**
		 * Update an existing course with the courseId and formData.
		 *
		 * @param courseId ID of the course to update
		 * @param formData Data of the course to be updated
		 */
		updateCourse: build.mutation<
			Course,
			{ courseId: string; formData: FormData }
		>({
			query: ({ courseId, formData }) => ({
				url: `courses/${courseId}`,
				method: "PUT",
				body: formData,
			}),
			invalidatesTags: (result, error, { courseId }) => [
				{ type: "Courses", id: courseId },
			],
		}),
		/**
		 * Delete a course with the courseId provided.
		 *
		 * @param courseId ID of the course to delete
		 */
		deleteCourse: build.mutation<{ message: string }, string>({
			query: (courseId) => ({
				url: `courses/${courseId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Courses"],
		}),

		/* STRIPE */
		/**
		 * Create a Stripe payment intent.
		 *
		 */
		createStripePaymentIntent: build.mutation<
			{ clientSecret: string },
			{ amount: number }
		>({
			query: ({ amount }) => ({
				url: `transactions/stripe/payment-intent`,
				method: "POST",
				body: { amount },
			}),
		}),

		/* TRANSACTION */
		/**
		 *	Create a transaction record when purchasing a course.
		 *
		 */
		createTransaction: build.mutation<Transaction, Partial<Transaction>>({
			query: (transaction) => ({
				url: "transactions",
				method: "POST",
				body: transaction,
			}),
		}),
		/**
		 * Query the transactions.
		 * If userId is provided, query the transactions of that user, else query all the transactions in database.
		 *
		 * @param userId ID of the user
		 */
		getTransactions: build.query<Transaction[], string>({
			query: (userId) => `transactions?userId=${userId}`,
		}),

		/* USER COURSE PROGRESS */
		/**
		 * Query the enrolled courses of a user.
		 *
		 * @param userId ID of the user
		 */
		getUserEnrolledCourses: build.query<Course[], string>({
			query: (userId) => `users/course-progress/${userId}/enrolled-courses`,
			providesTags: ["Courses", "UserCourseProgress"],
		}),
		/**
		 * Query the progress of the course completed by a user.
		 *
		 * @param userId ID of the user
		 * @param courseId ID of the course
		 */
		getUserCourseProgress: build.query<
			UserCourseProgress,
			{ userId: string; courseId: string }
		>({
			query: ({ userId, courseId }) =>
				`users/course-progress/${userId}/courses/${courseId}`,
			providesTags: ["UserCourseProgress"],
		}),
		/**
		 * Update the progress of the course completed by a user.
		 *
		 * @param userId ID of the user
		 * @param courseId ID of the course
		 * @param progressData Progresses of the sections completed from frontend
		 */
		updateUserCourseProgress: build.mutation<
			UserCourseProgress,
			{
				userId: string;
				courseId: string;
				progressData: {
					sections: SectionProgress[];
				};
			}
		>({
			query: ({ userId, courseId, progressData }) => ({
				url: `users/course-progress/${userId}/courses/${courseId}`,
				method: "PUT",
				body: progressData,
			}),
			invalidatesTags: ["UserCourseProgress"],
			/* Optimistic Update */
			async onQueryStarted(
				{ userId, courseId, progressData },
				{ dispatch, queryFulfilled }
			) {
				const patchResult = dispatch(
					api.util.updateQueryData(
						"getUserCourseProgress",
						{ userId, courseId },
						(draft) => {
							Object.assign(draft, {
								...draft,
								sections: progressData.sections,
							});
						}
					)
				);

				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),
	}),
});

export const {
	useUpdateUserMutation,
	useGetCoursesQuery,
	useGetCourseQuery,
	useCreateCourseMutation,
	useUpdateCourseMutation,
	useDeleteCourseMutation,
	useGetTransactionsQuery,
	useCreateTransactionMutation,
	useCreateStripePaymentIntentMutation,
	useGetUserEnrolledCoursesQuery,
	useGetUserCourseProgressQuery,
	useUpdateUserCourseProgressMutation,
} = api;
