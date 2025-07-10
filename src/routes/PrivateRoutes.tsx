import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();
  return user?.userId == "" ? <Navigate to="/chat" replace /> : children;
};

export default PrivateRoute;
