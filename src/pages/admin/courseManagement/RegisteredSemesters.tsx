import {
  Alert,
  Button,
  Dropdown,
  Spin,
  Table,
  Tag,
  type TableColumnsType,
} from "antd";
import moment from "moment";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import type { TRegisteredSemester, TStaus } from "../../../types";

// interface DataType {
//   key: string;
//   // _id: string;
//   name: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
// }

const items = [
  {
    key: "UPCOMING",
    label: "UPCOMING",
  },
  {
    key: "ONGOING",
    label: "ONGOING",
  },
  {
    key: "ENDED",
    label: "ENDED",
  },
];

export type TDataType = Pick<
  TRegisteredSemester,
  "status" | "startDate" | "endDate"
> & { key: string };

const RegisteredSemesters = () => {
  // const [semesterId, setSemesterId] = useState("");
  const {
    data: registeredSemesterData,
    isFetching,
    isLoading,
  } = useGetAllRegisteredSemestersQuery(undefined);
  const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation();

  const tableData =
    registeredSemesterData &&
    registeredSemesterData.data &&
    registeredSemesterData.data.map(
      ({ _id, academicSemester, status, startDate, endDate }) => ({
        key: _id,
        name: `${academicSemester?.name} ${academicSemester?.year}`,
        status,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
      }),
    );

  const handleStatusUpdate = (semesterId: string, status: TStaus) => {
    const updateData = {
      semesterId,
      status,
    };

    updateSemesterRegistration(updateData);
  };

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item: TStaus) => {
        // let color;
        // if (item === "UPCOMING") {
        //   color = "blue";
        // } else if (item === "ONGOING") {
        //   color = "green";
        // } else {
        //   color = "red";
        // }
        const statusColor: Record<TStaus, string> = {
          UPCOMING: "blue",
          ONGOING: "green",
          ENDED: "red",
        };
        const color = statusColor[item] || "yellow";
        return <Tag color={color}>{item}</Tag>;
      },
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
      render: (item) => {
        return (
          <Dropdown
            menu={{
              items,
              onClick: (info) =>
                handleStatusUpdate(item.key, info.key as TStaus),
            }} // handleStatusUpdate(info.key as TStaus)
            trigger={["click"]}
            placement="bottomLeft"
            arrow={{ pointAtCenter: true }}
          >
            <Button>Update</Button>
          </Dropdown> // onClick={() => setSemesterId(item.key)}
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
