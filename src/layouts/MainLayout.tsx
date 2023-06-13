import styled from "styled-components";
import useAuth from "../common/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <RootStyle>
      <Outlet />
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

export default MainLayout;
