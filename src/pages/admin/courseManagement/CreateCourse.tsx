/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import type { TCourse, TPreRequisiteCourse, TResponse } from "../../../types";

function CreateCourse() {
  const [addCourse] = useAddCourseMutation();

  const { data: courses } = useGetAllCoursesQuery(undefined);

  const prerequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,

      preRequisiteCourses: data?.preRequisiteCourses
        ? data.preRequisiteCourses.map((item: TPreRequisiteCourse) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    try {
      const res = (await addCourse(courseData)) as TResponse<TCourse>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Course created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to create course", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" label="Title" name="title" />

          <PHInput type="text" label="Prefix" name="prefix" />

          <PHInput type="text" label="Code" name="code" />

          <PHInput type="text" label="Credits" name="credits" />

          <PHSelect
            mode="multiple"
            options={prerequisiteCoursesOptions}
            label="Prerequisite Courses"
            name="preRequisiteCourses"
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}

export default CreateCourse;
