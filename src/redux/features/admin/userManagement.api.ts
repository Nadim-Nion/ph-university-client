import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all academic semesters
    // getAllSemesters: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();

    //     // parms.append("limit", 10);
    //     // params.append(args[0].name, args[0].value)

    //     if (args.length > 0) {
    //       args.forEach((item: TQueryParams) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }

    //     return {
    //       url: "/academic-semesters",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   transformResponse: (response: TResponse<TAcademicSemester[]>) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),

    // Create an academic semester
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddStudentMutation } = userManagementApi;
