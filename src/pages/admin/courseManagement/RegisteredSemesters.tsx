import { Alert, Button, Spin, Table, type TableColumnsType } from "antd";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";
import type { TRegisteredSemester } from "../../../types";

// interface DataType {
//   key: string;
//   // _id: string;
//   name: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
// }

export type TDataType = Pick<
  TRegisteredSemester,
  "status" | "startDate" | "endDate"
> & { key: string };

const RegisteredSemesters = () => {
  // const [params] = useState<TQueryParams[]>([]); // setParams

  const {
    data: registeredSemesterData,
    isFetching,
    isLoading,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const tableData =
    registeredSemesterData &&
    registeredSemesterData.data &&
    registeredSemesterData.data.map(
      ({ _id, academicSemester, status, startDate, endDate }) => ({
        key: _id,
        name: `${academicSemester?.name} ${academicSemester?.year}`,
        status,
        startDate,
        endDate,
      }),
    );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
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

export default RegisteredSemesters;
