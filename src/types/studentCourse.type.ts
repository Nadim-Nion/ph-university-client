export type TOfferedCourseForStudent = {
  _id: string
  semesterRegistration: string
  academicSemester: string
  academicFaculty: string
  academicDepartment: string
  course: TCourseForStudent
  faculty: string
  maxCapacity: number
  section: number
  days: string[]
  startTime: string
  endTime: string
  createdAt: string
  updatedAt: string
  __v: number
  enrolledCourses: object[]
  completedCourses: object[]
  completedCourseIds: string[]
  isPrerequisitesFulfilled: boolean
  isAlreadyEnrolled: boolean
}

export type TCourseForStudent ={
  _id: string
  title: string
  prefix: string
  code: number
  credits: number
  isDeleted: boolean
  preRequisiteCourses: object[]
  __v: number
}
