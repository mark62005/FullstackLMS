import { Course } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
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
