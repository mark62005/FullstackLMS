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
	tagTypes: ["Courses", "Users"],
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
			query: (id) => `course/${id}`,
			providesTags: (results, error, id) => [
				{
					type: "Courses",
					id,
				},
			],
		}),
	}),
});

export const { useUpdateUserMutation, useGetCoursesQuery, useGetCourseQuery } =
	api;
