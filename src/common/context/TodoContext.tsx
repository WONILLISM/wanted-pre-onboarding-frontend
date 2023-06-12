import React, { createContext, useState } from "react";

import { deleteTodo, getTodos, postTodo, putTodo } from "../api/todo";
import { Todo } from "../interface/Todo";

interface TodoContextType {
  todos: Todo[] | null;
  addTodo: (todo: string) => void;
  fetchTodos: () => void;
  updateTodo: ({
    id,
    todo,
    isCompleted,
  }: {
    id: number;
    todo: string;
    isCompleted: boolean;
  }) => void;
  removeTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

interface TodoProviderProps {
  children: React.ReactNode;
}
export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const addTodo = async (todo: string) => {
    const postResult = await postTodo(todo);

    if (postResult) {
      fetchTodos();
    } else {
      console.log("TODO 추가에 실패했습니다.");
    }
  };

  const fetchTodos = async () => {
    const todosResult = await getTodos();

    if (todosResult) {
      setTodos(todosResult);
    } else {
      console.log("TODO 목록 조회에 실패했습니다.");
    }
  };

  const updateTodo = async ({
    id,
    todo,
    isCompleted,
  }: {
    id: number;
    todo: string;
    isCompleted: boolean;
  }) => {
    const updateResult = await putTodo(id, todo, isCompleted);

    if (updateResult) {
      fetchTodos();
    } else {
      console.log("TODO 업데이트에 실패했습니다.");
    }
  };

  const removeTodo = async (id: number) => {
    const removeResult = await deleteTodo(id);

    if (removeResult === "success") {
      fetchTodos();
    } else {
      console.log("TODO 삭제에 실패했습니다.");
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, fetchTodos, updateTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
