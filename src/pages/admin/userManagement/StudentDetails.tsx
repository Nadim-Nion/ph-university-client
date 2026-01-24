import { Descriptions } from "antd";
import { useParams } from "react-router"
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";


const StudentDetails = () => {

  const {studentId} = useParams();

  const {data: student, isLoading, isError} = useGetSingleStudentQuery(studentId as string) ;
  console.log({student})

  const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Address',
    span: 2,
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '5',
    label: 'Remark',
    children: 'empty',
  },
];

  return (
    <div>
        <h1>Student Details of {studentId}</h1>
        <Descriptions title="User Info" layout="vertical" items={items} />
    </div>
  )
}

export default StudentDetails
