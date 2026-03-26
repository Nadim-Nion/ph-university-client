import type { TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "./verifyToken";

export const getUserFromToken = (token: string) => {
  let user: TUser | undefined;

  if (token) {
    user = verifyToken(token) as TUser;
  }
  return user;
};

/* I have completed the video of module (32-3) */
