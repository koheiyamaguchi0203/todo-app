import React from "react";
import InsertTodo from "./InsertTodo";

class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <React.Fragment>
        <h1>TodoApplication</h1>
        <h2>InsertTodo</h2>
        <InsertTodo />
        <h2>SortTodo</h2>
        <div>
          <div>Todoのものだけ表示する</div>
          <div>Archiveされたものだけを表示する</div>
          <div>全て表示する</div>
        </div>
        <h2>ListTodo</h2>
        <div>
          {this.state.todoItems.map((todoItem, index) => (
            <div key={index}>{todoItem.title}</div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default TodoListPage;
