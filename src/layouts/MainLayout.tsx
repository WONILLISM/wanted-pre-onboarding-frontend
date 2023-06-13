import useAuth from "../common/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default MainLayout;
