import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../common/hooks/useAuth";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate replace to="/todo" />;
  }

  return <Outlet />;
};

export default AuthLayout;
