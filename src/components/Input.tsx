import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  dataTestId?: string;
  error?: string;
  label?: string;
  value: string;
}

const Input = ({ dataTestId, error, label, value, ...rest }: Props) => {
  return (
    <RootStyle>
      {label && <label>{label}</label>}
      <InputWrapper>
        <input data-testid={dataTestId} {...rest} />
        {!!value && error && <Error>{error}</Error>}
      </InputWrapper>
    </RootStyle>
  );
};

const RootStyle = styled.div`
  display: flex;

  padding: 4px 0px;
`;

const InputWrapper = styled.div`
  margin-left: auto;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Error = styled.div`
  margin-top: 4px;
  font-size: 0.8rem;
`;

export default Input;
