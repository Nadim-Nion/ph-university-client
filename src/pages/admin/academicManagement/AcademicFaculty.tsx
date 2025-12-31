import {
  Alert,
  Button,
  Spin,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/academicManagement.api.";
import type { TQueryParams } from "../../../types";
import type { TAcademicFaculty } from "../../../types/academicManagemeny.type";

/* interface DataType {
  key: React.Key;
  name: string;
} */

export type TDataType = TAcademicFaculty & { key: string };

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);

  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAllFacultiesQuery(params);

  const tableData =
    facultyData &&
    facultyData.data &&
    facultyData.data.map(({ _id, name }: TAcademicFaculty) => ({
      key: _id,
      name,
    }));

  // Dynamic Academic Faculty filtering options
  const facultyFilteringOptions = facultyData?.data.map(
    (faculty: { name: string }) => ({
      text: faculty.name,
      value: faculty.name,
    })
  );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Faculty Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: facultyFilteringOptions,
      onFilter: (value, record) => record.name.includes(value as string),
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   }
      // ],
    },
    {
      title: "Action",
      render: () => (
        <div>
          <Button>Update</Button>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    //  console.log({filters, extra})

    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

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
    <Table<TDataType>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
