import { Button, Table, type TableColumnsType } from "antd";
import { useParams } from "react-router";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";

export type TDataType = {
  key: string;
  name: string;
  roll: string;
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
  console.log(facultyCoursesData);

  const tableData =
    facultyCoursesData &&
    facultyCoursesData.data &&
    facultyCoursesData.data.map(({ _id, student }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
    }));

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
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
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

export default MyStudents;
