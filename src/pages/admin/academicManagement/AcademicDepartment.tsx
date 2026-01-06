import {
  Alert,
  Button,
  Spin,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useState } from "react";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api.";
import type { TQueryParams } from "../../../types";
import type { TAcademicDepartment } from "../../../types/academicManagemeny.type";

export type TDataType = {
  key: string;
  name: string;
  academicFaculty: string;
};

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);

  const {
    data: departmentData,
    isLoading,
    isFetching,
  } = useGetAllDepartmentsQuery(params);

  // Dynamic academic department filterinng options
  const nameFilteringOptions = departmentData?.data.map(
    ({ name }: Pick<TAcademicDepartment, "name">) => ({
      text: name,
      value: name,
    })
  );

  const facultyFilteringOptions = departmentData?.data.map(
    ({ academicFaculty }: TAcademicDepartment) => ({
      text: academicFaculty.name,
      // value: academicFaculty.name,
      value: academicFaculty._id,
    })
  );

  const tableData =
    departmentData &&
    departmentData.data &&
    departmentData.data.map(
      ({ _id, name, academicFaculty }: TAcademicDepartment) => ({
        key: _id,
        name,
        academicFaculty: academicFaculty.name,
        // academicFaculty: academicFaculty._id,
      })
    );

  const columns: TableColumnsType<TDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: nameFilteringOptions,
      onFilter: (value, record) => record.name.includes(value as string),
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      filters: facultyFilteringOptions,
      // onFilter: (value, record) => {
      //   console.log({value, record});
      //   return record.academicFaculty.includes(value as string)
      // },
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
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters?.academicFaculty?.forEach((item) => {
        queryParams.push({ name: "academicFaculty", value: item });
      });

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

export default AcademicDepartment;
