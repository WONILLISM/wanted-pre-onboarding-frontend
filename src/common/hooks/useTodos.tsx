import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodos = () => {
  const state = useContext(TodoContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
};
