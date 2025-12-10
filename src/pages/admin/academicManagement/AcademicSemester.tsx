import { Table, type TableColumnsType, type TableProps } from "antd";
import { useState } from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api.";
import type { TAcademicSemester } from "../../../types/academicManagemeny.type";

// interface DataType {
//   key: string;
//   // _id: string;
//   name: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
// }

export type TDataType = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
> & { key: string };

const AcademicSemester = () => {
  const [params, setParams] = useState([]);

  const { data: semesterData } = useGetAllSemestersQuery(params);
  /* 
  [
    { name: "name", value: "Fall" },
  ]
  */

  const tableData =
    semesterData &&
    semesterData.data &&
    semesterData.data.map(({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    }));

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<TDataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
    console.log({ filters, extra });

    if (extra.action === "filter") {
      const queryParams: { name: string; value: string }[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) => (
        queryParams.push({name: 'year', value: item})
      ))

      console.log("QueryParams:", queryParams);

      setParams(queryParams);
    }
  };

  return (
    // <div>
    //   <h2>Academic Semester</h2>
    // </div>
    <Table<TDataType>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
