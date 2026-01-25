import { Descriptions, type DescriptionsProps } from "antd";
import { useParams } from "react-router";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();

  const { data } = useGetSingleStudentQuery(studentId as string);

  const studentData = data?.data;

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Full Name",
      children: studentData?.fullName,
    },
    {
      key: "2",
      label: "Student ID",
      children: studentData?.id,
    },
    {
      key: "3",
      label: "Email",
      children: studentData?.email,
    },
    {
      key: "4",
      label: "Gender",
      children: studentData?.gender
        ? studentData.gender.charAt(0).toUpperCase() +
          studentData.gender.slice(1)
        : "—",
    },
    {
      key: "5",
      label: "Date of Birth",
      children: studentData?.dateOfBirth
        ? new Date(studentData.dateOfBirth).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
    },
    {
      key: "6",
      label: "Contact No",
      children: studentData?.contactNo,
    },
    {
      key: "7",
      label: "Emergency Contact",
      children: studentData?.emergencyContactNo,
    },
    {
      key: "8",
      label: "Present Address",
      span: 2,
      children: studentData?.presentAddress,
    },
    {
      key: "9",
      label: "Permanent Address",
      span: 2,
      children: studentData?.permanentAddress,
    },
    {
      key: "10",
      label: "Admission Semester",
      children: `${studentData?.admissionSemester.name} ${studentData?.admissionSemester.year}`,
    },
    {
      key: "11",
      label: "Academic Department",
      children: studentData?.academicDepartment.name,
    },
    {
      key: "12",
      label: "Academic Faculty",
      children: studentData?.academicDepartment.academicFaculty.name,
    },
    {
      key: "13",
      label: "Father's Name",
      children: studentData?.guardian.fatherName,
    },
    {
      key: "14",
      label: "Father's Occupation",
      children: studentData?.guardian.fatherOccupation,
    },
    {
      key: "15",
      label: "Father's Contact",
      children: studentData?.guardian.fatherContactNo,
    },
    {
      key: "16",
      label: "Mother's Name",
      children: studentData?.guardian.motherName,
    },
    {
      key: "17",
      label: "Mother's Occupation",
      children: studentData?.guardian.motherOccupation,
    },
    {
      key: "18",
      label: "Mother's Contact",
      children: studentData?.guardian.motherContactNo,
    },
    {
      key: "19",
      label: "Local Guardian",
      children: studentData?.localGuardian.name,
    },
    {
      key: "20",
      label: "Local Guardian Occupation",
      children: studentData?.localGuardian.occupation,
    },
    {
      key: "21",
      label: "Local Guardian Contact",
      children: studentData?.localGuardian.contactNo,
    },
    {
      key: "22",
      label: "Local Guardian Address",
      span: 2,
      children: studentData?.localGuardian.address,
    },
  ];

  return (
    <div>
      <Descriptions title="Student Details" layout="vertical" items={items} />
    </div>
  );
};

export default StudentDetails;
