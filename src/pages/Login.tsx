/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Row } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

// type Inputs = {
//   id: string;
//   password: string;
// };

/* I have watched the video of module 29-1 till 3:17 mins */

const Login = () => {
  // const { register } = useForm<Inputs>({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (error) {
    console.log("error:", error);
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    // console.log("data in login:", data);
    const toastId = toast.loading("Logging in ...");

    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login successful", { id: toastId, duration: 2000 });

      navigate(`/${user?.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      // console.log("error in Login:", error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="id" label="ID:" />
        <PHInput type="password" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
