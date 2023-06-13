import { useEffect } from "react";

import TodoItem from "./TodoItem";
import { useTodos } from "../../common/hooks/useTodos";
import NewTodo from "./NewTodo";
import styled from "styled-components";

const TodoList = () => {
  const { todos, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <RootStyle>
      <TitleStyle>TODO LIST</TitleStyle>
      <NewTodo />
      <TodosWrapper>
        {todos && todos.map((todo) => <TodoItem todo={todo} />)}
      </TodosWrapper>
    </RootStyle>
  );
};

const RootStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleStyle = styled.div`
  font-size: 32px;
  font-weight: 500;
  letter-spacing: 0.08em;
`;

const TodosWrapper = styled.ul`
  margin-top: 8px;
  padding: 0px 16px;
`;

export default TodoList;
