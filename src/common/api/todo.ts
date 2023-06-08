import { preOnboardingAPI } from ".";
import { User } from "../context/AuthContext";

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export const getTodos = async (user: User) => {
  try {
    const res = await preOnboardingAPI.get("/todos", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
