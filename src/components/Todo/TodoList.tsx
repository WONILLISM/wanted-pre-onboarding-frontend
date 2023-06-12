import { ChangeEvent, useEffect, useState } from "react";

import TodoItem from "./TodoItem";
import { useTodos } from "../../common/hooks/useTodos";
import NewTodo from "./NewTodo";

const TodoList = () => {
  const { todos, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <NewTodo />

      {todos && todos.map((todo) => <TodoItem todo={todo} />)}
    </div>
  );
};

export default TodoList;
