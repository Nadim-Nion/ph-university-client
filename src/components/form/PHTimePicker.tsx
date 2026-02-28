import { Form, TimePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  label?: string;
  name: string;
};

const PHTimePicker = ({ label, name }: TTimePickerProps) => {
  const format = "HH:mm";

  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker
              defaultValue={dayjs("00:00", format)}
              format={format}
              {...field}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
