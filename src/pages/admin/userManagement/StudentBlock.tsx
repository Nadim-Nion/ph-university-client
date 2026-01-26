import { Button, Modal, Space } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import {
  useGetSingleStudentQuery,
  useUpdateUserStatusMutation,
} from "../../../redux/features/admin/userManagement.api";

const StudentBlock = () => {
  const { studentId } = useParams();

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const { data: studentData } = useGetSingleStudentQuery(studentId as string);
  const user = studentData?.data?.user;

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    if (!user) return;

    setOpen(false);

    const data = {
      status: "blocked",
    };

    updateUserStatus({ userId: user, ...data });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <>
        <Space>
          <Button type="primary" onClick={showModal}>
            Change User Status
          </Button>
        </Space>
        <Modal
          open={open}
          // title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          // footer={(_, { OkBtn, CancelBtn }) => (
          //   <>
          //     <Button>Custom Button</Button>
          //     <CancelBtn />
          //     <OkBtn />
          //   </>
          // )}
        >
          <h2>Are you sure you want to block this student?</h2>
        </Modal>
      </>
    </div>
  );
};

export default StudentBlock;
