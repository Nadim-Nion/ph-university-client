import {
  Alert,
  Spin,
  Table,
  type TableColumnsType,
} from "antd";
import {
  useGetAllOfferedCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";

/* export type TDataType = Pick<
  TOfferedCourse, "academicSemester" | "academicFaculty" | "academicDepartment" | "course" | "faculty" | "section" | "maxCapacity" | "days" | "startTime" | "endTime"> & { key: string }; */

  export type TDataType = {
  key: string;
  academicSemester: string;
  academicFaculty: string;
  academicDepartment: string;
  course: string;
  faculty: string;
  section: number;
  maxCapacity: number;
  days: string;
  startTime: string;
  endTime: string;
};

const OfferedCourses = () => {
  const {data: offeredCoursesData, isFetching, isLoading} = useGetAllOfferedCoursesQuery(undefined);

  const tableData =
    offeredCoursesData &&
    offeredCoursesData.data &&
    offeredCoursesData.data.map(
      ({ _id, academicSemester,academicFaculty, academicDepartment, course, faculty, section, maxCapacity, days, startTime, endTime }) => ({
        key: _id,
        academicSemester: `${academicSemester?.name} ${academicSemester?.year}`,
        academicFaculty: academicFaculty?.name,
        academicDepartment: academicDepartment?.name,
        course: course?.title,
        faculty: `${faculty.name.firstName} ${faculty.name.middleName} ${faculty.name.lastName}`,
        section,
        maxCapacity,
        days: days.join(", "),
        startTime: startTime,
        endTime: endTime,
      }),
    );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Academic Semester",
      dataIndex: "academicSemester",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Academic Department",
      dataIndex: "academicDepartment",
    },
    {
      title: "Course",
      dataIndex: "course",
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
    },
    {
      title: "Section",
      dataIndex: "section",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Days",
      dataIndex: "days",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    }
  ];

  // const onChange: TableProps<TDataType>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   // console.log("params", pagination, filters, sorter, extra);
  //   // console.log({ filters, extra });

  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParams[] = [];

  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );

  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );

  //     // console.log("QueryParams:", queryParams);

  //     setParams(queryParams);
  //   }
  // };

  if (isLoading) {
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>;
  }

  return (
    // <div>
    //   <h2>Academic Semester</h2>
    // </div>
    <Table<TDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default OfferedCourses;
