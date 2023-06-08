import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { signIn } from "../api/auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!!token) {
      setAuthenticated(true);
    }
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const token = await signIn({ email, password });

    if (token === "fail") {
      console.log(token);
      return;
    }

    localStorage.setItem("access-token", token);
    setAuthenticated(true);
    navigate("/todo");
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    setAuthenticated(false);
  };

  return { authenticated, login, logout };
};

export default useAuth;
