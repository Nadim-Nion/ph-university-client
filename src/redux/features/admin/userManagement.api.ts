import type { TQueryParams, TResponse, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all academic semesters
    getAllStudents: builder.query({
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
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponse<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // Create an academic semester
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    // Get single student
    getSingleStudent: builder.query({
      query: (studentId: string) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),

      transformResponse: (response: TResponse<TStudent>) => {
        return {
          data: response.data,
        };
      },
    }),

    // Update student
    updateStudent: builder.mutation({
      query: ({ studentId, ...data }) => ({
        url: `/students/${studentId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Update User status (block/active)
    updateUserStatus: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `/users/change-status/${userId}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useUpdateUserStatusMutation,
} = userManagementApi;
