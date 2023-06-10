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

    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (user: User, todo: string) => {
  try {
    const res = await preOnboardingAPI.post(
      "/todos",
      {
        todo: todo,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: number, user: User) => {
  try {
    const res = await preOnboardingAPI.delete(`/todos/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
