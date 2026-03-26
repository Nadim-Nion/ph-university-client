import type { ReactNode } from "react";
import { Navigate } from "react-router";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserFromToken } from "../../utils/getUserFromToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  // const user = useAppSelector(selectCurrentUser); // We have extracted the user from redux which is not standard practise and it can be easily maniputed by the user. So we will decode the token and extract the user from it.

  const dispatch = useAppDispatch();
  const user = getUserFromToken(token as string);

  console.log("user:", user);

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace />;
  }

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
