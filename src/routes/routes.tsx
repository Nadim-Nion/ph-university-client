import { createBrowserRouter } from "react-router";
import App from "../App";
// import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
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
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routerGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routerGenerator(facultyPaths),
  },
  {
    path: "/student",
 element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
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
