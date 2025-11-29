import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";

const nameOptions = [
  {
    label: "Autumn",
    value: "01",
  },
  {
    label: "Summer",
    value: "02",
  },
  {
    label: "Fall",
    value: "03",
  },
];

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  label: (currentYear + number).toString(),
  value: (currentYear + number).toString(),
}));

function CreateAcademicSemester() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    const name = nameOptions[Number(data?.name) - 1]?.label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
    };
    console.log("🚀 ~ onSubmit ~ semesterData:", semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={nameOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={nameOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}

export default CreateAcademicSemester;
