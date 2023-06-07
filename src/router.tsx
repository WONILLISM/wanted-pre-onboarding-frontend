import { useRoutes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const Router = () => {
  return useRoutes([
    { path: "signin", element: <SignIn /> },
    { path: "signup", element: <SignUp /> },
  ]);
};

export default Router;
