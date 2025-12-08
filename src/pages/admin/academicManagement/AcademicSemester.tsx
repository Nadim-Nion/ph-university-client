import { Table, type TableColumnsType, type TableProps } from "antd";
import type React from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api.";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllSemestersQuery(undefined);
  console.log("Academic Semester Data:", semesterData);

  const tableData = semesterData?.data.map(({
    _id,
    name,
    year,
    startMonth,
    endMonth,
  }) => ({
    _id,
    name,
    year,
    startMonth,
    endMonth,
  }));

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: 'full-header' },
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Start Month",
      dataIndex: "startMonth"
    },
    {
      title: "End Month",
      dataIndex: "endMonth"
    }
  ];


  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    console.log(filters)
  };

  return (
    // <div>
    //   <h2>Academic Semester</h2>
    // </div>
    <Table<DataType>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
