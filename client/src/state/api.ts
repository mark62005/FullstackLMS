import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type Course } from "@/types";

const customBaseQuery = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: any
) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
	});

	try {
		const result: any = await baseQuery(args, api, extraOptions);

		if (result.data) {
			result.data = result.data.data;
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
	tagTypes: ["Courses"],
	endpoints: (build) => ({
		// TODO: api endpoints

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

export const { useGetCoursesQuery, useGetCourseQuery } = api;
