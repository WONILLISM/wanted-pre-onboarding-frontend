import React, { ChangeEvent, useEffect, useState } from "react";
import { Todo, deleteTodo } from "../common/api/todo";
import useAuth from "../common/hooks/useAuth";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const { user } = useAuth();
  const [todoItem, setTodoItem] = useState<Todo>(todo);

  const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setTodoItem({ ...todoItem, isCompleted: checked });
  };

  const handleDeleteItem = () => {
    if (user) {
      deleteTodo(todo.id, user);
    }
  };

  return (
    <li>
      <label>
        <input type="checkbox" onChange={handleCompleteChange} />
        <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button" onClick={handleDeleteItem}>
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
