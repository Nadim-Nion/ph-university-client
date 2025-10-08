import { Layout, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const USER_ROLES = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const role = "admin";
  let sidebarItems;

  switch (role) {
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
        style={{ height: "100vh" }}
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
