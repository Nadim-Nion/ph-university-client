import type { TAcademicSemester } from "./academicManagemeny.type";

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
