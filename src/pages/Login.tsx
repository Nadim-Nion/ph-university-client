import { Button } from "antd";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";

type Inputs = {
  id: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const [login, { data, error }] = useLoginMutation();
  console.log("🚀 ~ Login ~ data, error in Login.tsx:", {data, error});

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userInfo = {
      id: data.id,
      Password: data.password,
    };

    login(userInfo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
