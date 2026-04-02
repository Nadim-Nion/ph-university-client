import type { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "./academicManagemeny.type";
import type { TOfferedCourse, TRegisteredSemester } from "./courseManagement.type";

export type TOfferedCourseForStudent = {
  _id: string;
  semesterRegistration: TRegisteredSemester;
  academicSemester: TAcademicSemester;
  academicFaculty: TAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  course: TCourseForStudent;
  faculty: string;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  enrolledCourses: object[];
  completedCourses: object[];
  completedCourseIds: string[];
  isPrerequisitesFulfilled: boolean;
  isAlreadyEnrolled: boolean;
  offeredCourse: TOfferedCourse;
};

export type TCourseForStudent = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses: object[];
  __v: number;
};
