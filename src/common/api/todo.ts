import { preOnboardingAPI } from ".";
import { Todo } from "../interface/Todo";

import { getAccessToken } from "./auth";

type GetTodosResult = Todo[] | null;
type PostTodoResult = Todo | null;
type PutTodoResult = Todo | null;
type DeleteTodoResult = "success" | "fail";

export const getTodos = async (): Promise<GetTodosResult> => {
  const token = getAccessToken();

  try {
    const response = await preOnboardingAPI.get("/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const postTodo = async (todo: string): Promise<PostTodoResult> => {
  const token = getAccessToken();

  try {
    const response = await preOnboardingAPI.post(
      "/todos",
      {
        todo: todo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const putTodo = async (
  id: number,
  todo: string,
  isCompleted: boolean
): Promise<PutTodoResult> => {
  try {
    const token = getAccessToken();

    const response = await preOnboardingAPI.put(
      `/todos/${id}`,
      {
        todo: todo,
        isCompleted: isCompleted,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteTodo = async (id: number): Promise<DeleteTodoResult> => {
  try {
    const token = getAccessToken();

    const response = await preOnboardingAPI.delete(`/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
