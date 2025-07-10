import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { user } = useAuth();
  console.log(user, "user");
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PublicRoute;
