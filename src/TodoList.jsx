import React from "react";
import TodoItem from "./TodoItem";

const TodoList = props => {
  return props.todoItems.map((todoItem, index) => (
    <div key={index}>
      <TodoItem todoItem={todoItem} handleOnClick={}
       />
    </div>
  ));
};

export default TodoList;
