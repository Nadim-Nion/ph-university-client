import { Col, Row } from "antd";
import { useGetAllEnrolledCoursesForStudentQuery } from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
  const { data: enrolledCourseData } =
    useGetAllEnrolledCoursesForStudentQuery(undefined);

  return (
    <Row
      gutter={[0, 10]}
      justify="space-between"
      align={"middle"}
      style={{ border: "solid #d4d4d4 2px", padding: "10px" }}
    >
      {enrolledCourseData?.data?.map((item) => (
        <Col span={12} key={item._id}>
          <Col span={24}>Course: {item.course.title}</Col>
          <Col span={24}>Section: {item.offeredCourse.section}</Col>
          <Col span={24}>Days: {item.offeredCourse.days.join(", ")}</Col>
        </Col>
      ))}
    </Row>
  );
};

export default MySchedule;
