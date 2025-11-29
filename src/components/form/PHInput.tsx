import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

const PHInput = ({ type, name, label }: TInputProps) => {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {/* {label ? label : null} */}
        <Controller
          name={name}
          render={({ field }) => (
            <Form.Item label={label}>
              <Input type={type} id={name} {...field} size="large" />
            </Form.Item>
          )}
        />
      </div>
    </div>
  );
};

export default PHInput;
