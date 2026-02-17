/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddSemesterRegistrationMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import type { TPreRequisiteCourse } from "../../../types";

function CreateCourse() {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data: courses } = useGetAllCoursesQuery(undefined);

  const prerequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    const courseData = {
      ...data,
      isDeleted: false,

      prerequisiteCourses: data?.prerequisiteCourses?.map(
        (item: TPreRequisiteCourse) => ({
          course: item,
          isDeleted: false,
        }),
      ),
    };
    console.log("🚀 ~ onSubmit ~ courseData:", courseData);

    // try {
    //   const res = (await addSemesterRegistration(
    //     semesterData,
    //   )) as TResponse<TAcademicSemester>;
    //   if (res.error) {
    //     toast.error(res.error?.data?.message, { id: toastId });
    //   } else {
    //     toast.success("Academic semester created successfully", {
    //       id: toastId,
    //     });
    //   }
    // } catch (error) {
    //   toast.error("Failed to create academic semester", { id: toastId });
    // }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <PHInput type="text" label="Title" name="title" />

          <PHInput type="text" label="Prefix" name="prefix" />

          <PHInput type="text" label="Code" name="code" />

          <PHInput type="text" label="Credits" name="credits" />

          <PHSelect
            mode="multiple"
            options={prerequisiteCoursesOptions}
            label="Prerequisite Courses"
            name="prerequisiteCourses"
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}

export default CreateCourse;
