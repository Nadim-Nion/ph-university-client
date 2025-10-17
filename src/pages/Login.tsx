import { Button, Row } from "antd";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { setUser, type TUser } from "../redux/features/auth/authSlice";

type Inputs = {
  id: string;
  password: string;
};

const Login = () => {
  // const { register } = useForm<Inputs>({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (error) {
    console.log("error:", error);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    console.log("data in login:", data);
    const toastId = toast.loading("Logging in ...");

    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login successful", {id: toastId, duration: 2000});

      navigate(`/${user?.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", {id: toastId, duration: 2000});
      console.log("error in Login:", error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="id" label="ID:" />
        <PHInput type="password" name="password" label="Password:" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
