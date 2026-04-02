import type { TQueryParams, TResponse } from "../../../types";
import type { TOfferedCourseForStudent } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const facultyCoursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all enrolled courses for a faculty member
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // parms.append("limit", 10);
        // params.append(args[0].name, args[0].value)

        if (args && args.length > 0) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/enrolled-courses/faculty-enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["OfferedCourse"],
      transformResponse: (response: TResponse<TOfferedCourseForStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // Enroll in a course
    enrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/create-enrolled-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["OfferedCourse"],
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery } = facultyCoursesApi;
