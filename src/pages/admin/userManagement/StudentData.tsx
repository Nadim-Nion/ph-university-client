import {
  Alert,
  Button,
  Pagination,
  Space,
  Spin,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import type { TQueryParams, TStudent } from "../../../types";

// interface DataType {
//   key: string;
//   // _id: string;
//   name: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
// }

export type TDataType = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
> & { key: string };

const StudentData = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    // { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  /* 
  [
    { name: "name", value: "Fall" },
  ]
  */

  // console.log({ isLoading, isFetching });

  const metaData = studentData?.meta;

  const tableData =
    studentData &&
    studentData.data &&
    studentData.data.map(({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    }));

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      render: (item) => {
        // console.log(item)
        return (
          <Space>
            <Link to={`/admin/students-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/student-update/${item.key}`}>
              <Button>Update</Button>
            </Link>
            <Link to={`/admin/student-block/${item.key}`}>
              <Button>Block</Button>
            </Link>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra,
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    // console.log({ filters, extra });

    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item }),
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item }),
      );

      // console.log("QueryParams:", queryParams);

      setParams(queryParams);
    }
  };

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
    <>
      <Table<TDataType>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        current={page}
        total={metaData?.totalDoc}
        pageSize={metaData?.limit}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default StudentData;
