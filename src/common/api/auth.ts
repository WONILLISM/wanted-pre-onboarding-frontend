import { preOnboardingAPI } from ".";

interface SignUpParams {
  email: string;
  password: string;
}

type SignUpResponse = "success" | "fail";

interface SignInPrams {
  email: string;
  password: string;
}

type SignInResponse = string | "fail";

export const signUp = async ({
  email,
  password,
}: SignUpParams): Promise<SignUpResponse> => {
  try {
    await preOnboardingAPI.post(
      "/auth/signup",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};

export const signIn = async ({
  email,
  password,
}: SignInPrams): Promise<SignInResponse> => {
  try {
    const res = await preOnboardingAPI.post(
      "/auth/signin",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.access_token;
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
