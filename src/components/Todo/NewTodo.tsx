import React, { ChangeEvent, useState } from "react";
import { useTodos } from "../../common/hooks/useTodos";

const NewTodo = () => {
  const { addTodo } = useTodos();
  const [newTodo, setNewTodo] = useState<string>("");

  const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTodo(value);
  };

  const handleAddTodoClick = () => {
    addTodo(newTodo);
  };

  return (
    <div>
      <input data-testid="new-todo-input" onChange={handleNewTodoChange} />
      <button data-testid="new-todo-add-button" onClick={handleAddTodoClick}>
        추가
      </button>
    </div>
  );
};

export default NewTodo;
