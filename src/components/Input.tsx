import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  dataTestId?: string;
  helpText?: string;
  label?: string;
  value: string;
}

const Input = ({ dataTestId, helpText, label, value, ...rest }: Props) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input data-testid={dataTestId} {...rest} />
      {!!value && helpText && <div>{helpText}</div>}
    </div>
  );
};

export default Input;
