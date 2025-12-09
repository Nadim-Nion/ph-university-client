import { Table, type TableColumnsType, type TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api.";

interface DataType {
  key: string;
  // _id: string;
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
}

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllSemestersQuery(undefined);

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

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
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
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
    // console.log(filters);
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
