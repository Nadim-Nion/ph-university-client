import { Layout, Menu } from "antd";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { getUserFromToken } from "../../utils/getUserFromToken";

const { Sider } = Layout;

const USER_ROLES = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  // const user = useAppSelector(selectCurrentUser);
/* We have extracted the user from redux which is not standard practise and it can be easily maniputed by the user. So we will decode the token and extract the user from it. */

  const token = useAppSelector(selectCurrentToken);
   const user = getUserFromToken(token as string);
  let sidebarItems;

  switch (user!.role) {
    case USER_ROLES.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLES.ADMIN);
      break;

    case USER_ROLES.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, USER_ROLES.FACULTY);
      break;

    case USER_ROLES.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, USER_ROLES.STUDENT);
      break;

    default:
      break;
  }
  return (
    <div>
      <Sider
        style={{ height: "100vh", position: "sticky", top: "0", left: "0" }} // , position: "sticky", top: 0, left: 0
        breakpoint="lg"
        collapsedWidth="0"
        /* onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }} */
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>PH Uni</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
