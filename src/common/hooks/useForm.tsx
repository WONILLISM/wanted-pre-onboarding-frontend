import React, { ChangeEvent, FormEvent, useState } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

type Errors<T> = Partial<Record<keyof T, string>>;

const useForm = <T extends Record<keyof T, any> = {}>(props: {
  initialValues?: Partial<T>;
  validations?: Validations<T>;
  onSubmit?: () => void;
}) => {
  const { initialValues, validations, onSubmit } = props;
  const [values, setValues] = useState<T>((initialValues || {}) as T);
  const [errors, setErrors] = useState<Errors<T>>({});

  const validate = (key: any, value: string | boolean | undefined) => {
    if (validations) {
      const validation = validations[key as keyof T];

      if (validation) {
        const { pattern } = validation;

        if (pattern && pattern.value) {
          if (!RegExp(pattern.value).test(value as string)) {
            setErrors({ ...errors, [key]: pattern.message });
          } else {
            setErrors({ ...errors, [key]: "" });
          }
        }
      }
    }
  };

  const onChange = (event: ChangeEvent<unknown>) => {
    const { target } = event;

    let key: any;
    let finalValue: string | boolean | undefined;

    if (target instanceof HTMLInputElement) {
      const { type, checked, value, name } = target;
      key = name;
      finalValue = type === "checkbox" ? checked : value;
    } else if (target instanceof HTMLTextAreaElement) {
      const { value, name } = target;
      key = name;
      finalValue = value;
    }

    validate(key, finalValue);

    setValues({ ...values, [key]: finalValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onSubmit) onSubmit();
  };

  return { values, errors, onChange, handleSubmit };
};

export default useForm;
