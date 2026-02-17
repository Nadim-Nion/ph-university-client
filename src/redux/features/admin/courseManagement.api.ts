import type {
  TCourse,
  TQueryParams,
  TRegisteredSemester,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Semester Registration
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RegisteredSemester"],
    }),

    // Get All Registered Semesters
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        // console.log({params})

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);

            // console.log(params.toString());
          });
        }

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["RegisteredSemester"],
    }),

    // Update Semester Registration Status
    updateSemesterRegistration: builder.mutation({
      query: ({ semesterId, status }) => ({
        url: `/semester-registrations/${semesterId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["RegisteredSemester"],
    }),

    // Get all courses
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        // console.log({params})

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);

            // console.log(params.toString());
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Course"],
    }),

    // Add Course
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterRegistrationMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
} = courseManagementApi;
