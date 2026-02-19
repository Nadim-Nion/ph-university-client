import { Alert, Button, Spin, Table, type TableColumnsType } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import type { TCourse } from "../../../types";

// interface DataType {
//   key: string;
//   // _id: string;
//   name: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
// }

export type TDataType = Pick<TCourse, "title" | "code"> & { key: string };

const Courses = () => {
  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);
  console.log({ coursesData });

  const tableData =
    coursesData &&
    coursesData.data &&
    coursesData.data.map(({ _id, title, prefix, code }) => ({
      key: _id,
      title: title,
      code: `${prefix}${code}`,
    }));

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Title",
      dataIndex: "title",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: () => {
        return <Button>Assign Faculty</Button>;
      },
    },
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

export default Courses;
