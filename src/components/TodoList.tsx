import React from "react";
import { Todo } from "../common/api/todo";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  return (
    <div>
      {todos &&
        todos.map((todo) => (
          <li>
            <label>
              <input type="checkbox" />
              <span>{todo.todo}</span>
            </label>
          </li>
        ))}
    </div>
  );
};

export default TodoList;
