import type { ReactNode } from "react";
import { Navigate } from "react-router";
import {
  logout,
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
const dispatch = useAppDispatch();

  console.log("🚀 ~ ProtectedRoute ~ role:", role);
  console.log("🚀 ~ ProtectedRoute ~ user:", user)

  if(role !== undefined && role !== user?.role){
    dispatch(logout());
    return <Navigate to={"/login"} replace />;
  }

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
