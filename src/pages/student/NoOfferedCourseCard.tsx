import { Button, Result } from "antd";
import { NavLink } from "react-router";

const NoOfferedCourseCard = () => {
  return (
    <Result
      status="error"
      title="No Offered Course Found"
      extra={
        <NavLink to="/student/dashboard">
          <Button type="primary" key="console">
            Go to Dashboard
          </Button>
        </NavLink>
      }
    />
  );
};

export default NoOfferedCourseCard;
