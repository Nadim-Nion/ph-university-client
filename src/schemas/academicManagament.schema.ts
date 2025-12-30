import z from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ error: "Name is required" }),
  year: z.string({ error: "Year is required" }),
  startMonth: z.string({ error: "Start month is required" }),
  endMonth: z.string({ error: "End month is required" }),
});

export const academicFacultySchema = z.object({
  // name: z.string({ error: "Faculty name is required" }),
  name: z.string({ error: "Faculty name is required" }),
});
