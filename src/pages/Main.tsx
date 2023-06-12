import styled from "styled-components";
import { TodoProvider } from "../common/context/TodoContext";
import TodoList from "../components/Todo/TodoList";

const Main = () => {
  return (
    <TodoProvider>
      <TodoListStyle>
        <TodoList />
      </TodoListStyle>
    </TodoProvider>
  );
};

const TodoListStyle = styled.div`
  width: 360px;
  padding: 20px 16px;

  background-color: #f5f5f5;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 8px;
`;

export default Main;
