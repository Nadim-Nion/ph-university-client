import { Button, Col, Flex } from "antd";
import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api.";
import type { TAcademicFaculty } from "../../../types";

const OfferedCourses = () => {
  const [facultyId, setFacultyId] = useState("");
  console.log('From Parent Component:', facultyId)

  const { data: academicFaculty } = useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFaculty?.data?.map(
    (item: TAcademicFaculty) => ({
      value: item._id,
      label: item.name,
    }),
  );

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
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
            onValueChange={setFacultyId}
          />

          <PHInput disabled={!facultyId} type="text" label="Test" name="test" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferedCourses;
