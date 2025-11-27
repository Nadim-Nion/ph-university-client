import { Form, Select } from "antd";

interface PHSelectProps {
  label: string;
}

const PHSelect = ({ label }: PHSelectProps) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Form.Item label={label}>
      <Select
        //   defaultValue="lucy"
        style={{ width: "100%" }}
        onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
          { value: "disabled", label: "Disabled", disabled: true },
        ]}
      />
    </Form.Item>
  );
};

export default PHSelect;
