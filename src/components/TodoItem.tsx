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
    </li>
  );
};

export default TodoItem;
