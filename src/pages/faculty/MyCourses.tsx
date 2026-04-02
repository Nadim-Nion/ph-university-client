import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";

const MyCourses = () => {

  const {data} = useGetAllFacultyCoursesQuery(undefined);
  console.log(data)

  return (
    <div>
      <h2>My Courses</h2>
    </div>
  );
};

export default MyCourses;
