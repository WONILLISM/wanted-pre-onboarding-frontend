import useAuth from "../common/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default MainLayout;
