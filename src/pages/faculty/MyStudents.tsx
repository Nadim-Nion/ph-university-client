import { Button, Modal, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import {
  useGetAllFacultyCoursesQuery,
  useUpdateCourseMarksMutation,
} from "../../redux/features/faculty/facultyCourses.api";

export type TDataType = {
  key: string;
  name: string;
  roll: string;
  semesterRegistration: string;
  offeredCourse: string;
  student: string;
};

const MyStudents = () => {
  const { registeredSemesterId, courseId } = useParams();
  const { data: facultyCoursesData, isFetching } = useGetAllFacultyCoursesQuery(
    [
      {
        name: "semesterRegistration",
        value: registeredSemesterId,
      },
      {
        name: "course",
        value: courseId,
      },
    ],
  );

  const tableData =
    facultyCoursesData &&
    facultyCoursesData.data &&
    facultyCoursesData.data.map(
      ({ _id, student, semesterRegistration, offeredCourse }) => ({
        key: _id,
        name: student.fullName,
        roll: student.id,
        semesterRegistration: semesterRegistration._id,
        offeredCourse: offeredCourse._id,
        student: student._id,
      }),
    );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll",
      dataIndex: "roll",
    },
    {
      title: "Semester Registration",
      dataIndex: "semesterRegistration",
    },
    {
      title: "Offered Course",
      dataIndex: "offeredCourse",
    },
    {
      title: "Student",
      dataIndex: "student",
    },
    {
      title: "Action",
      render: (item) => {
        return <UpdateMarksModal studentInfo={item} />;
      },
    },
  ];

  return (
    <Table<TDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

const UpdateMarksModal = ({ studentInfo }: { studentInfo: TDataType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateCourseMarks] = useUpdateCourseMarksMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const marksData = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        classTest2: Number(data.classTest2),
        midTerm: Number(data.midTerm),
        finalTerm: Number(data.finalTerm),
      },
    };
    await updateCourseMarks(marksData);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Mid Term" />
          <PHInput type="text" name="finalTerm" label="Final Term" />
          <Button htmlType="submit">Update</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
