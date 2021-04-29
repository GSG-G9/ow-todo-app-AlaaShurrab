import { useState, useCallback } from "react";
import update from "immutability-helper";

import Card from "./Card";

import styles from "../styles/Todos.module.css";

const TodoTable = ({ todos,setTodos, checkTodo }) => {
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = todos[dragIndex];
      setTodos(
        update(todos, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [todos]
  );
  console.log(todos);
  return (
    <div>
      {todos.map((toDo,index) => (
        <Card
          key={toDo.key}
          index={index}
          toDo={toDo}
          moveCard={moveCard}
          checkTodo={checkTodo}
        />
      ))}
    </div>
  );
};

export default TodoTable;
