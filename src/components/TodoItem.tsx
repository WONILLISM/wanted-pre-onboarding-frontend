import React, { ChangeEvent, useEffect, useState } from "react";
import { Todo } from "../common/api/todo";

interface Props {
  todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
  const [todoItem, setTodoItem] = useState<Todo>(todo);

  const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setTodoItem({ ...todoItem, isCompleted: checked });
  };

  return (
    <li>
      <label>
        <input type="checkbox" onChange={handleCompleteChange} />
        <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </li>
  );
};

export default TodoItem;
