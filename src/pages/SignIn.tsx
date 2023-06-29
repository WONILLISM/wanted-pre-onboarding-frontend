import styled from "styled-components";

import Input from "../components/Input";
import useAuth from "../common/hooks/useAuth";
import useForm from "../common/hooks/useForm";

interface SignInValues {
  email: string;
  password: string;
}

const signInValidationSchema = {
  email: {
    pattern: {
      value: "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+$",
      message: "이메일 형식이 올바르지 않습니다.",
    },
  },
  password: {
    pattern: {
      value: "^.{8,}$",
      message: "비밀번호 형식이 올바르지 않습니다.",
    },
  },
};

const SignIn = () => {
  const { login } = useAuth();

  const onSubmit = () => {
    login(values);
  };

  const { values, errors, onChange, handleSubmit } = useForm<SignInValues>({
    initialValues: { email: "", password: "" },
    validations: signInValidationSchema,
    onSubmit: onSubmit,
  });

  return (
    <RootStyle>
      <TitleStyle>LOGIN</TitleStyle>
      <form onSubmit={handleSubmit}>
        <Input
          data-testid="email-input"
          type="text"
          label="email"
          name="email"
          value={values.email}
          error={errors?.email}
          onChange={onChange}
        />
        <Input
          data-testid="password-input"
          type="password"
          label="password"
          name="password"
          value={values.password}
          error={errors?.password}
          onChange={onChange}
        />
        <Button
          data-testid="signin-button"
          type="submit"
          disabled={
            !!!values.email ||
            !!!values.password ||
            !!errors.email ||
            !!errors.password
          }
        >
          로그인
        </Button>
      </form>
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
