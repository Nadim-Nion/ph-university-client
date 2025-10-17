import { Input } from "antd";
import { useFormContext } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  const { register } = useFormContext();
  return (
    <div>
      <>
      {label ? label : null}
        <Input type={type} id={name} {...register(name)} />
      </>
    </div>
  );
};

export default PHInput;
