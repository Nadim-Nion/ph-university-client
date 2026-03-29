import { Button, Row } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangeStudentPasswordMutation } from "../redux/features/admin/userManagement.api";
import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import type { TResponse, TUser } from "../types";

const ChangePassword = () => {
  const [changePassword] = useChangeStudentPasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const res = (await changePassword(data).unwrap()) as TResponse<TUser>;

    if (res?.success) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
    else{
        toast.error(res?.error?.data?.message || "Failed to change password");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="password" name="newPassword" label="New Password:" />
        <Button htmlType="submit">Change Password</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
