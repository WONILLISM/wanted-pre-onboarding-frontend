import React, { ChangeEvent, useState } from "react";
import { Todo, createTodo } from "../common/api/todo";
import useAuth from "../common/hooks/useAuth";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  const { user } = useAuth();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTodo(value);
  };

  const handleAddTodoClick = () => {
    if (user) {
      createTodo(user, newTodo);
    }
  };
  return (
    <div>
      <div>
        <input data-testid="new-todo-input" onChange={handleNewTodoChange} />
        <button data-testid="new-todo-add-button" onClick={handleAddTodoClick}>
          추가
        </button>
      </div>
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
