import { Navigate, useRoutes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import useAuth from "./common/hooks/useAuth";

const Router = () => {
  const { user } = useAuth();
  return useRoutes([
    {
      element: <MainLayout />,
      children: [{ path: "todo", element: <Main /> }],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "", element: !user ? <Navigate replace to="signin" /> : <></> },
      ],
    },
  ]);
};

export default Router;
