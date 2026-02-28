/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Col, Flex } from "antd";
import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { daysOptions } from "../../../constants/global";
import {
  useGetAllAcademicFacultiesQuery,
  useGetAllDepartmentsQuery,
} from "../../../redux/features/admin/academicManagement.api.";
import {
  useAddOfferedCourseMutation,
  useGetAllCourseFacultiesQuery,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
} from "../../../redux/features/admin/courseManagement.api";
import type {
  TAcademicDepartment,
  TAcademicFaculty,
  TCourse,
  TFacultyMember,
  TOfferedCourse,
  TRegisteredSemester,
  TResponse,
} from "../../../types";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const { data: registeredSemester } =
    useGetAllRegisteredSemestersQuery(undefined);
  const { data: academicFaculty } = useGetAllAcademicFacultiesQuery(undefined);
  const { data: academicDepartment } = useGetAllDepartmentsQuery(undefined);
  const { data: course } = useGetAllCoursesQuery(undefined);
  const { data: courseFaculty } = useGetAllCourseFacultiesQuery(courseId, {
    skip: !courseId,
  });
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const registeredSemesterOptions = registeredSemester?.data?.map(
    (item: TRegisteredSemester) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    }),
  );

  const academicFacultyOptions = academicFaculty?.data?.map(
    (item: TAcademicFaculty) => ({
      value: item._id,
      label: item.name,
    }),
  );

  const academicDepartmentOptions = academicDepartment?.data?.map(
    (item: TAcademicDepartment) => ({
      value: item._id,
      label: item.name,
    }),
  );

  const courseOptions = course?.data?.map((item: TCourse) => ({
    value: item._id,
    label: item.title,
  }));

  const courseFacultyOptions = courseFaculty?.data?.faculties?.map(
    (item: TFacultyMember) => ({
      value: item._id,
      label: `${item.name.firstName} ${item.name.middleName || ""} ${item.name.lastName}`,
    }),
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating offered course...");

    const offerCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: data?.startTime?.format("HH:mm") || "0:00",
      endTime: data?.endTime?.format("HH:mm") || "0:00",
    };

    try {
      const res = (await addOfferedCourse(offerCourseData)) as TResponse<TOfferedCourse>;

      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Offered course created successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create offered course", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={registeredSemesterOptions}
          />

          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />

          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions}
          />

          <PHSelectWithWatch
            label="Course"
            name="course"
            options={courseOptions}
            onValueChange={setCourseId}
          />

          <PHSelect
            label="Faculty"
            name="faculty"
            options={courseFacultyOptions}
            disabled={!courseId}
          />

          <PHInput type="text" label="Section" name="section" />

          <PHInput type="text" label="Max Capacity" name="maxCapacity" />

          <PHSelect
            label="Days"
            name="days"
            options={daysOptions}
            mode="multiple"
          />

          <PHTimePicker label="Start Time" name="startTime" />

          <PHTimePicker label="End Time" name="endTime" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
