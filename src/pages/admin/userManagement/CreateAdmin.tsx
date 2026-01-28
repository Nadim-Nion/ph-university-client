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
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";

const adminDefaultValues = {
  designation: "Admin",
  name: {
    firstName: "Mr. Mezbaul",
    middleName: "Abedin",
    lastName: "Forhan",
  },
  gender: "male",
  // dateOfBirth: "1998-04-24",
  email: "mezbaul2@programming-hero.com",
  contactNo: "12356789",
  emergencyContactNo: "12356789",
  bloogGroup: "O+",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
};

const CreateAdmin = () => {
  const [addAdmin, { data: addAdminData, error }] = useAddAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const adminData = {
      password: "admin123",
      admin: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);

    addAdmin(formData);
  };

  if (addAdminData?.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Admin created successfully 😊",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  if (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Failed to create admin 😢",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValues}>
          <Divider>Admin Info</Divider>
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
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
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
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
