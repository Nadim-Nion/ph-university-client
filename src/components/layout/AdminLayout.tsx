import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div>
      <h2>This is Navbar</h2>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
