import React from "react";

const TodoListPage = props => {
  return (
    <React.Fragment>
      <h1>TodoApplication</h1>
      <h2>InsertTodo</h2>
      <div>
        <input />
        <input type="submit" value="Todoを追加する" />
      </div>
      <h2>SortTodo</h2>
      <div>
        <div>Todoのものだけ表示する</div>
        <div>Archiveされたものだけを表示する</div>
        <div>全て表示する</div>
      </div>
      <h2>ListTodo</h2>
      <div>
        {props.todoItems.map((todoItem, index) => (
          <div key={index}>{todoItem.title}</div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TodoListPage;
