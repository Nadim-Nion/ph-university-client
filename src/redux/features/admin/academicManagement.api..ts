import type { TAcademicSemester, TQueryParams, TResponse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all academic semesters
    getAllSemesters: builder.query({
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
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponse<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // Create an academic semester
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),

    // Get all academic faculties
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args && args.length > 0) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/academic-faculties",
          method: "GET",
          params: params,
        };
      },
    }),

    // Create an academic faculty
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),

    // Get all academic departments
    getAllDepartments: builder.query({
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
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
       transformResponse: (response) => {
          return {
            data: response.data,
            meta: response.meta,
          }
        }
    }),

    // Create an academic department
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAllFacultiesQuery,
  useAddAcademicFacultyMutation,
  useGetAllDepartmentsQuery,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
