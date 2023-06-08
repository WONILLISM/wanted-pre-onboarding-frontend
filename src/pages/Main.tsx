import React, { useEffect, useState } from "react";
import { Todo, getTodos } from "../common/api/todo";
import useAuth from "../common/hooks/useAuth";
import TodoList from "../components/TodoList";

const Main = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    if (user) {
      const todoRes = await getTodos(user);

      setTodos(todoRes);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
};

export default Main;
