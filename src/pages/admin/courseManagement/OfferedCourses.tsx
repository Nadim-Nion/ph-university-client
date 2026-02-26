import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api.";
import type { TAcademicFaculty } from "../../../types";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";

const OfferedCourses = () => {
  const { data: academicFaculty } = useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFaculty?.data?.map((item: TAcademicFaculty) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ data });
  };

  /* I have watched the video of the module (31-10) till 7:42 mins */

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelectWithWatch
            label="Academic Semester"
            name="academicSemester"
            options={academicFacultyOptions}
          />

          <PHInput type="text" label="Test" name="test" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferedCourses;
