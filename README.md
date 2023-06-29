# 원티드 프리온보딩 프론트엔드 - 선발 과제

## ✅ Intro

### 🌝 지원자

- 이름 : 박원일

### 📚 기술 스택

**Platforms & Laguage**

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" /><img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=black" /><img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white" /><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />

**Tools**  
<img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />

## 🙋 프로젝트 실행 방법

터미널에서 아래를 순서대로 입력해주세요.

1. `git glone git@github.com:WONILLISM/wanted-pre-onboarding-frontend.git`
2. `cd wanted-pre-onboarding-frontend`
3. `npm i`
4. `npm start`

test용 아이디는 아래와 같습니다.
ID : wonillism@test.com
PW : 123123123

## 🎬 데모 영상 및 배포 링크

배포링크 : https://wonillism.netlify.app/signin

# 기능 설명

## 인증

### useAuth

사전 과제 내용에는 필요 없었지만, 나중에 로그아웃, 프로필, 권한 등 유저 정보가 필요한 경우가 많을 수 있다. 로그아웃, 프로필은 보통 상단의 GNB에 있는 경우가 많고, 권한에 따라 보여져야하는 컴포넌트는 어딘가 깊숙히 있을 수 있다. 따라서 ContextAPI와 Custom hook을 이용하여 확장성을 높여주었다.

[useAuth.tsx](/src/common/hooks/useAuth.tsx)  
[AuthContext.tsx](/src/common/context/AuthContext.tsx)

해당 프로젝트는 회원가입과 로그인의 양식이 똑같아서 복잡하지 않지만, 후에 회원가입 양식이 복잡해질 경우와 form 의 재사용성을 높이기 위해 `useForm` hook을 만들어서 관리했다. 그리고 입력마다 유효성 검사를 하기 위해 제어 컴포넌트를 사용했다.

### 비제어 컴포넌트 vs 제어 컴포넌트

form 데이터들의 유효성 검사 방식에는 아래와 같이 두 가지가 있다.

- 사용자가 입력할 때마다 유효성 검사를 하는 방법
- 사용자가 양식 작성을 모두 마친 후 제출 후에 유효성 검사를 하는 방법

리액트 공식문서 상에는 되도록이면 제어 컴포넌트를 사용하는게 좋다고 되어있으나, 상황에 맞추어 사용해야된다고 생각한다.

제어 컴포넌트는 리액트가 상태값에 직접 관여하여 상태 값이 업데이트 될 때마다 리랜더링이 일어난다. 따라서 입력할 때마다 유효성 검사하기에 더 좋다. 하지만 form이 복잡해지면 계속되는 리랜더링에 의해 성능 저하가 일어 날 수 있다.  
비제어 컴포넌트는 input의 속성들에의해 DOM에 직접 저장되는 값들을 제어하여 필요할 때 가져와서 사용가능하다. 따라서 리액트가 직접 관여하지 않기때문에 매 입력마다 리랜더링이 발생하지 않는다. 하지만 신뢰 가능한 단일 출처 원칙이 무너질 가능성이 있다.

### useForm Hook 보완 이후

변경 전 코드

```js
 ...

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
 ...

export default SignIn;
```

변경 후 코드

```js

...

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

...

export default SignIn;

```

`useForm` hook 을 적용하기 전과 후의 코드 가독성의 차이가 많이난다.  
기존의 방식은 `input` 값 마다 상태로 처리하고, 그에 따른 유효성 검사를 위해 만들어진 상태값들과 `handler`들이 너무 많아, `form`이 좀 더 복잡해진다면 매우 읽기 힘든 코드가 될 것이다.

### useForm

`useForm` hook 코드

```js
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

```

후에 `useForm`의 확장성을 고려하여 `validation`을 필수인지 아닌지, pattern(정규식)에 맞는지 아닌지 그리고 커스텀할 수 있는 방식으로 만들었다. 그리고 validations의 타입을 Object를 기반으로 특정 타입의 부분 집합을 만족하는 타입을 정의할 수 있도록 `Partial`타입을 사용하였고, {key: value}의 형태가 추가될 수 있도록 `Record`타입을 사용하였다. 이는 모두 확장성을 고려한 것이다.

`validation` 뿐만아니라 `values`, `errors` 모두 마찬가지이다.

```js
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
```

validate 함수에서 key 매개변수를 any로 받았는데 조금 찝찝하다. `input`의 속성인 `name`값을 `key`값으로 하고 싶어 구현한건데, `string`타입을 `keyof T` 타입으로 바꿀 방법이 생각나지 않았다.

```js
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
```

`input` 값의 매 입력마다 유효성 검사하기 위해 `onChange` 함수안에 `validate` 함수를 넣어 매 입력마다 유효성 검사를 하였다.

`handleSubmit` 함수도 제출시에 유효성 검사를 할 수 있도록 후에 확장성을 고려하여 만들어 두었다.

## TODO

Todo 역시 `ContextAPI`와 `useTodo`를 사용하였다.  
todo의 구조상 `todo list` > `todo item` > todo 값, todo 수정 버튼 등` 의 구조로 되어있다.

따라서 `todo에` 대한 CRUD가 일어날 때 최신의 상태를 유지해주고 props 드릴링이 최대한 일어나지 않도록하기 위해 `todo context` 안에서 해결하였다.

하지만 `useForm`을 이용한 todo관리와 좀 더 가독성 좋은 코드와, 관심사 분리를 통해 보완이 필요해보인다.

[TodoContext](src/common/context/TodoContext.tsx)  
[useTodos](src/common/hooks/useTodos.tsx)
