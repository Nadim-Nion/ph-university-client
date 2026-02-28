import type { TAcademicSemester } from "./academicManagemeny.type";
import type { TFacultyMember } from "./userManagement.type";

export type TRegisteredSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: string; // number
  credits: string; // number
  isDeleted: boolean;
  preRequisiteCourses: TPreRequisiteCourse[];
};

export type TPreRequisiteCourse = {
  course: string;
  isDeleted: boolean;
  _id: string;
};

export type TStaus = "UPCOMING" | "ONGOING" | "ENDED";

export type TCourseFaculty = {
  faculties: TFacultyMember[];
}

export type TOfferedCourse = {
  semesterRegistration: string
  academicFaculty: string
  academicDepartment: string
  course: string
  faculty: string
  section: number
  maxCapacity: number
  days: string[]
  startTime: string
  endTime: string
}
