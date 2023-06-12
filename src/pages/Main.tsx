import { TodoProvider } from "../common/context/TodoContext";
import TodoList from "../components/Todo/TodoList";

const Main = () => {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
};

export default Main;
