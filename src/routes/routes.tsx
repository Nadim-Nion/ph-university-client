import { createBrowserRouter } from "react-router";
import App from "../App";
// import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routerGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routerGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routerGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routerGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
