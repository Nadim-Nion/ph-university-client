import { Button, Col, Divider, Form, Input, Row } from "antd";
import dayjs from "dayjs";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { useParams } from "react-router";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import {
  useGetAllDepartmentsQuery,
  useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api.";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "../../../redux/features/admin/userManagement.api";
import type { TAcademicDepartment } from "../../../types";


const StudentUpdate = () => {
  const { studentId } = useParams();

  const [updateStudent] = useUpdateStudentMutation();

  const { data: studentData } = useGetSingleStudentQuery(studentId as string);

  const { data: semesterData, isLoading: sIsLoading } =
    useGetAllSemestersQuery(undefined);

  const { data: departmentData, isLoading: dIsLoading } =
    useGetAllDepartmentsQuery(undefined);

  const semesterDataOptions = semesterData?.data?.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));

  const departmentDataOptions = departmentData?.data?.map(
    (department: Pick<TAcademicDepartment, "name" | "_id">) => ({
      label: department.name,
      value: department._id,
    }),
  );

  const studentDefaultValues = studentData?.data
    ? {
        name: {
          firstName: studentData.data.name.firstName,
          middleName: studentData.data.name.middleName,
          lastName: studentData.data.name.lastName,
        },
        gender: studentData.data.gender,
        dateOfBirth: studentData.data.dateOfBirth
          ? dayjs(studentData.data.dateOfBirth)
          : null,
        bloogGroup: studentData.data.bloogGroup,
        email: studentData.data.email,
        contactNo: studentData.data.contactNo,
        emergencyContactNo: studentData.data.emergencyContactNo,
        presentAddress: studentData.data.presentAddress,
        permanentAddress: studentData.data.permanentAddress,
        guardian: {
          fatherName: studentData.data.guardian.fatherName,
          fatherOccupation: studentData.data.guardian.fatherOccupation,
          fatherContactNo: studentData.data.guardian.fatherContactNo,
          motherName: studentData.data.guardian.motherName,
          motherOccupation: studentData.data.guardian.motherOccupation,
          motherContactNo: studentData.data.guardian.motherContactNo,
        },
        localGuardian: {
          name: studentData.data.localGuardian.name,
          occupation: studentData.data.localGuardian.occupation,
          contactNo: studentData.data.localGuardian.contactNo,
          address: studentData.data.localGuardian.address,
        },
        admissionSemester: studentData.data.admissionSemester._id,
        academicDepartment: studentData.data.academicDepartment._id,
      }
    : undefined;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    const formattedData = {
      ...data,
      dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : null,
    };

    const studentData = {
      password: "student123",
      student: formattedData,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    updateStudent({ studentId, data: formData });

    // This is development purpose only for debugging
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
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
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={bloodGroupOptions}
                name="bloogGroup"
                label="Blood Group"
              />
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
          </Row>

          <Divider>Contact Info</Divider>
          <Row gutter={8}>
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
              <PHInput type="text" name="bloogGroup" label="Blood Group" />
            </Col>
          </Row>

          <Divider>Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>
          </Row>

          <Divider>Local Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              {/* <PHInput
                type="text"
                name="admissionSemester"
                label="Admission Semester"
              /> */}
              <PHSelect
                options={semesterDataOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
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

export default StudentUpdate;
