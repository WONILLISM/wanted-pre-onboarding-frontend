import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { signIn, signUp } from "../api/auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!!token) {
      setUser({ token: token });
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
      return;
    }

    localStorage.setItem("access-token", token);
    setUser({ token: token });
    navigate("/todo");
  };

  const register = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await signUp({ email, password });

    if (response === "fail") return;

    navigate("/signin");
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    setUser(null);
  };

  return { user, login, register, logout };
};

export default useAuth;
