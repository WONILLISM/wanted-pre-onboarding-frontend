import { preOnboardingAPI } from ".";

interface SignUpParams {
  email: string;
  password: string;
}

type SignUpResponse = "success" | "fail";

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
