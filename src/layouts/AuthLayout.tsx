import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../common/hooks/useAuth";
import styled from "styled-components";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate replace to="/todo" />;
  }

  return (
    <RootStyle>
      <FormBoxStyle>
        <Outlet />
      </FormBoxStyle>
    </RootStyle>
  );
};

const RootStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBoxStyle = styled.div`
  width: 360px;
  padding: 1.5rem 2rem 1.5rem 2rem;
  background-color: #f5f5f5;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 8px;
`;

export default AuthLayout;
