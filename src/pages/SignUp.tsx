import { ChangeEvent, MouseEvent, useState } from "react";
import Input from "../components/Input";
import { signUp } from "../common/api/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();

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

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    const response = await signUp({ email, password });

    if (response === "fail") return;

    navigate("/signin");
  };

  return (
    <RootStyle>
      <TitleStyle>REGISTER</TitleStyle>
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
        data-testid="signup-button"
        disabled={!isValidEmail || !isValidPassword}
        onClick={handleSubmit}
      >
        회원가입
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

export default SignUp;
