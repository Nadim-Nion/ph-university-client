import { Input } from "antd";
import { Controller } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        {label ? label : null}
        <Controller
          name={name}
          render={({ field }) => <Input type={type} id={name} {...field} />}
        />
      </div>
    </div>
  );
};

export default PHInput;
