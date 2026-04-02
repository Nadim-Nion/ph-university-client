import { Button, Col, Row } from "antd";
import {
  useEnrollCourseMutation,
  useGetAllOfferedCourseForStudentQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import NoOfferedCourseCard from "./NoOfferedCourseCard";


const OfferedCourse = () => {
  const { data: offeredCourseData } =
    useGetAllOfferedCourseForStudentQuery(undefined);
  const [enrollCourse] = useEnrollCourseMutation();

  type TAcc = Record<
    string,
    {
      courseTitle: string;
      sections: {
        section: number;
        _id: string;
        days: string[];
        startTime: string;
        endTime: string;
      }[];
    }
  >;

  /* type TAcc = {
    [index:string]: any;
  } */

  const singleObj = offeredCourseData?.data?.reduce((acc: TAcc, item) => {
    // console.log("item:", item);
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });

    return acc;
  }, {});
  // console.log("singleObj:", singleObj);
  // console.log(
  //   "singleObj with Values:",
  //   Object.values(singleObj ? singleObj : {}),
  // );

  const modifiedData = Object.values(singleObj ? singleObj : {});

  const handleEnroll = async (courseId: string) => {
    const enrollData = {
      offeredCourse: courseId,
    };

    const res = await enrollCourse(enrollData);
    console.log("res:", res);
  };

  if (!modifiedData.length) {
    // return <h1>No Offered Course Found</h1>
    return <NoOfferedCourseCard />
  }

  return (
    <Row gutter={[0, 10]}>
      {modifiedData.map((item) => {
        return (
          <Col
            span={24}
            key={item.courseTitle}
            style={{ border: "solid #d4d4d4 2px" }}
          >
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((sectionItem, index) => {
                return (
                  <Row
                    justify={"space-between"}
                    align={"middle"}
                    key={index}
                    style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}
                  >
                    <Col span={5}>Section: {sectionItem.section}</Col>
                    <Col span={5}>Days: {sectionItem.days.join(" , ")}</Col>
                    <Col span={5}>Start Time: {sectionItem.startTime}</Col>
                    <Col span={5}>End Time: {sectionItem.endTime}</Col>
                    <Button onClick={() => handleEnroll(sectionItem._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;

/* 
- The object we are getting
[
{course: {title: "React"}, section: '1', _id: '562726aggagqtqgfafa'},
{course: {title: "React"}, section: '2', _id: '942726aggagqtqgfdfds'},
{course: {title: "Redux"}, section: '1', _id: '34567gsfetffsgsgagg'},
]

- We want to group courses by section and display them like this:
[

{
courseTitle: "React",

section: [
{section: '1', _id: '562726aggagqtqgfafa'},
{section: '2', _id: '942726aggagqtqgfdfds'},
]

}

] 
*/
