import React from "react";
import InsertTodo from "./InsertTodo";
import TodoItem from "./TodoItem";

class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: props.todoItems, archivedList: false };
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

  sortedList = todoItems => {
    if (this.state.archivedList) {
      let archivedTodoItems = todoItems.filter(todoItem => todoItem.archived);
      return archivedTodoItems;
    } else {
      let notArchivedtodoItems = todoItems.filter(
        todoItem => !todoItem.archived
      );
      return notArchivedtodoItems;
    }
  };

  allList = todoItems => {
    return this.state.todoItems;
  };

  listTitle = () => {
    if (this.state.archivedList) {
      return "Archived List";
    } else {
      return "TodoList";
    }
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
          <div
            onClick={() =>
              this.setState(prevState => {
                return { archivedList: !prevState.archivedList };
              })
            }
          >
            {this.state.archivedList
              ? "Archived TodoItems"
              : "Not Archvied TodoItems"}
          </div>
        </div>
        <h2>{this.listTitle()}</h2>
        {this.sortedList(this.state.todoItems).map((todoItem, index) => (
          <div key={index}>
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
                  return {
                    todoItems: [...newTodoItems]
                  };
                })
              }
            >
              削除する
            </div>
            <div
              onClick={() => {
                this.setState(prevState => {
                  let archivedTodoItems = prevState.todoItems.map(
                    prevTodoItem => {
                      if (prevTodoItem.id === todoItem.id) {
                        prevTodoItem.archived = !prevTodoItem.archived;
                      }
                      return prevTodoItem;
                    }
                  );
                  return { todoItems: archivedTodoItems };
                });
              }}
            >
              {todoItem.archived ? "Todo" : "Archive"}
            </div>
            <br />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TodoListPage;
