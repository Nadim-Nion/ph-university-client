import { useParams } from "react-router"


const StudentDetails = () => {

  const {studentId} = useParams();

  return (
    <div>
        <h1>Student Details of {studentId}</h1>
    </div>
  )
}

export default StudentDetails
