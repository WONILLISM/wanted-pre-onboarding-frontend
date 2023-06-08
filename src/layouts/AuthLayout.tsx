import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../common/hooks/useAuth";

const AuthLayout = () => {
  const { authenticated } = useAuth();
  if (authenticated) {
    return <Navigate replace to="/todo" />;
  }

  return <Outlet />;
};

export default AuthLayout;
