import { ChangeEvent, MouseEvent, useState } from "react";
import Input from "../components/Input";
import useAuth from "../common/hooks/useAuth";
import styled from "styled-components";

const SignIn = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [emailHelpText, setEmailHelpText] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [passwordHelpText, setPasswordHelpText] = useState<string>("");

  const emailRegex = /\S+@\S+/;
  const passwordRegex = /^.{8,}$/;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (emailRegex.test(value)) {
      setIsValidEmail(true);
      setEmailHelpText("올바른 이메일 형식입니다.");
    } else {
      setIsValidEmail(false);
      setEmailHelpText("올바르지 않은 이메일 형식입니다.");
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (passwordRegex.test(value)) {
      setIsValidPassword(true);
      setPasswordHelpText("올바른 비밀번호 형식입니다.");
    } else {
      setIsValidPassword(false);
      setPasswordHelpText("올바르지 않은 비밀번호 형식입니다.");
    }
    setPassword(value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    login({ email, password });
  };

  return (
    <RootStyle>
      <TitleStyle>LOGIN</TitleStyle>
      <Input
        data-testid="email-input"
        label="email"
        helpText={emailHelpText}
        value={email}
        type="email"
        onChange={handleEmailChange}
      />
      <Input
        data-testid="password-input"
        label="password"
        helpText={passwordHelpText}
        value={password}
        type="password"
        onChange={handlePasswordChange}
      />
      <Button
        data-testid="signin-button"
        disabled={!isValidEmail || !isValidPassword}
        onClick={handleSubmit}
      >
        로그인
      </Button>
    </RootStyle>
  );
};

const RootStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleStyle = styled.div`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.08em;

  margin-bottom: 12px;
`;

const Button = styled.button`
  margin-top: 12px;
`;

export default SignIn;
