import React from "react";
import InsertTodo from "./InsertTodo";
import TodoItem from "./TodoItem";

class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: props.todoItems };
  }

  lastTodoItemId = () => {
    if (this.state.todoItems.length !== 0) {
      let todoItemsById = this.state.todoItems.sort(
        (todoItemOne, todoItemTwo) => todoItemOne >= todoItemTwo
      );
      return todoItemsById.slice(-1)[0].id;
    }
    return 0;
  };

  render() {
    return (
      <React.Fragment>
        <h1>TodoApplication</h1>
        <h2>InsertTodo</h2>
        <InsertTodo
          handleOnClick={todoItem => {
            this.setState(state => ({
              todoItems: [...state.todoItems, todoItem]
            }));
          }}
          lastTodoItemId={this.lastTodoItemId()}
        />
        <h2>SortTodo</h2>
        <div>
          <div>Todoのものだけ表示する</div>
          <div>Archiveされたものだけを表示する</div>
          <div>全て表示する</div>
        </div>
        <h2>ListTodo</h2>
        {/* {console.log(this.state.todoItems)} */}
        {this.state.todoItems.map((todoItem, index) => (
          <div key={index}>
            {/* {console.log(todoItem)} */}
            <TodoItem
              todoItem={todoItem}
              handleOnClick={updateTodoItem => {
                let todoItems = this.state.todoItems.map(todoItem => {
                  if (todoItem.id === updateTodoItem.id) {
                    return updateTodoItem;
                  } else {
                    return todoItem;
                  }
                });
                this.setState({ todoItems: todoItems });
              }}
            />
            <div
              onClick={() =>
                this.setState(prevState => {
                  let newTodoItems = prevState.todoItems.filter(
                    newTodoItem => todoItem.id !== newTodoItem.id
                  );
                  // console.log(...newTodoItems);
                  return {
                    todoItems: [...newTodoItems]
                  };
                })
              }
            >
              削除する
            </div>
            <br />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TodoListPage;
