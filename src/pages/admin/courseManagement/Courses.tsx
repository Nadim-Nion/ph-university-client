import { Alert, Button, Modal, Spin, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  useAddFacultyMembersMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
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
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
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
    return (
      <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
    );
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

const AddFacultyModal = ({ facultyInfo }: { facultyInfo: TDataType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log("facultyInfo.key:", facultyInfo.key);
  const { data: facultyData } = useGetAllFacultiesQuery(undefined);
  // console.log(facultyData?.data);
  const [addFacultyMembers] = useAddFacultyMembersMutation();

  const facultyOptions = facultyData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyMemberData = {
      courseId: facultyInfo.key,
      faculties: data.faculties,
    };

    addFacultyMembers(facultyMemberData);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultyOptions}
            name="faculties"
            label="Faculties"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
