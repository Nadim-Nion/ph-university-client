import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api.";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log("Academic Semester Data:", data);
  return (
    <div>
      <h2>Academic Semester</h2>
    </div>
  );
};

export default AcademicSemester;
