import { Button, Col, Divider, Form, Input, Row } from "antd";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import Swal from "sweetalert2";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api.";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import type { TAcademicDepartment } from "../../../types";

const facultyDefaultValues = {
  designation: "Lecturer",
  name: {
    firstName: "Mridul ",
    middleName: "Das",
    lastName: "Rahman",
  },
  gender: "male",
  email: "faculty3@gmail.com",
  // dateOfBirth: "1990-01-01",
  contactNo: "123",
  emergencyContactNo: "123",
  bloodGroup: "A+",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
  // academicDepartment: "Department of Electrical Engineering",
};

const CreateFaculty = () => {
  const [addFaculty, { data: addFacultyData, error }] = useAddFacultyMutation();

  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllDepartmentsQuery(undefined);

  const departmentDataOptions = departmentData?.data?.map(
    (department: Pick<TAcademicDepartment, "name" | "_id">) => ({
      label: department.name,
      value: department._id,
    }),
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      password: "faculty123",
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);

    addFaculty(formData);
  };

  if (addFacultyData?.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Faculty created successfully 😊",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  if (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Failed to create faculty 😢",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
          <Divider>Faculty Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      {...field}
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              {/* <PHInput
                type="text"
                name="academicDepartment"
                label="Academic Department"
              /> */}
              <PHSelect
                options={departmentDataOptions}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
