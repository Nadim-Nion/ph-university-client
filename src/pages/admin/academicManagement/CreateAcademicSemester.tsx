import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
// import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";

// const nameOptions = [
//   {
//     label: "Autumn",
//     value: "01",
//   },
//   {
//     label: "Summer",
//     value: "02",
//   },
//   {
//     label: "Fall",
//     value: "03",
//   },
// ];


const nameOptions = [
  {
    label: "Autumn",
    value: "Autumn 01",
  },
  {
    label: "Summer",
    value: "Summer 02",
  },
  {
    label: "Fall",
    value: "Fall 03",
  },
];

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data in create academic semester:", data);

    const semesterData = data.name.split(' ');
    const name = semesterData[0];
    const code = semesterData[1];
    const semesterDataObj = {name, code}
    console.log("🚀 ~ onSubmit ~ semesterData:", semesterDataObj);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="name" options={nameOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
