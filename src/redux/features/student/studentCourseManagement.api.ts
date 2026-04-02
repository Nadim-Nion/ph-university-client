import type { TQueryParams, TResponse } from "../../../types";
import type { TOfferedCourseForStudent } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all offered courses for a student
    getAllOfferedCourseForStudent: builder.query({
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
          url: "/offered-courses/my-offered-courses",
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

export const {
  useGetAllOfferedCourseForStudentQuery,
  useEnrollCourseMutation,
} = studentCourseApi;
