import React from "react";
import InsertTodo from "./InsertTodo";
import TodoItem from "./TodoItem";

class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: [], archivedList: false };
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

  listTitle = () => {
    if (this.state.archivedList) {
      return "Archived List";
    } else {
      return "TodoList";
    }
  };

  sortBy(key, order) {
    this.setState(prevState => {
      let sortedList = prevState.todoItems.sort((todoItemOne, todoItemTwo) => {
        if (this.descOrascCondition(todoItemOne, todoItemTwo, key, order)) {
          return 1;
        } else if (todoItemOne[key] === todoItemTwo[key]) {
          return 0;
        } else {
          return -1;
        }
      });
      return { todoItems: sortedList, archivedList: prevState.archivedList };
    });
  }

  descOrascCondition(todoItemOne, todoItemTwo, key, order) {
    if (order === "desc") {
      return todoItemOne[key] > todoItemTwo[key];
    } else if (order === "asc") {
      return todoItemOne[key] < todoItemTwo[key];
    }
  }

  returnSortTodoItems() {
    return (
      <>
        <h2>Sort TodoItems</h2>
        {["id", "title", "createdAt"].map((sortKey, index) => {
          return (
            <React.Fragment key={index}>
              <div>Sort By {sortKey}</div>
              <div onClick={() => this.sortBy(sortKey, "desc")}>・desc</div>
              <div onClick={() => this.sortBy(sortKey, "asc")}>・asc</div>
            </React.Fragment>
          );
        })}
      </>
    );
  }

  updateTodoItem(updateTodoItem) {
    this.setState(prevState => {
      let todoItems = prevState.todoItems.map(todoItem => {
        if (todoItem.id === updateTodoItem.id) {
          return updateTodoItem;
        } else {
          return todoItem;
        }
      });
      return { todoItems: todoItems };
    });
  }

  deleteTodoItem(todoItem) {
    this.setState(prevState => {
      let newTodoItems = prevState.todoItems.filter(
        newTodoItem => todoItem.id !== newTodoItem.id
      );
      return {
        todoItems: [...newTodoItems]
      };
    });
  }

  archiveTodo(todoItem) {
    this.setState(prevState => {
      let archivedTodoItems = prevState.todoItems.map(prevTodoItem => {
        if (prevTodoItem.id === todoItem.id) {
          prevTodoItem.archived = !prevTodoItem.archived;
        }
        return prevTodoItem;
      });
      return { todoItems: archivedTodoItems };
    });
  }

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
        <h2>Change List</h2>
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
        {this.returnSortTodoItems()}
        <h2>{this.listTitle()}</h2>
        {this.sortedList(this.state.todoItems).map((todoItem, index) => (
          <div key={index}>
            <TodoItem
              todoItem={todoItem}
              updateTodoItem={() => this.updateTodoItem(todoItem)}
              deleteTodoItem={() => this.deleteTodoItem(todoItem)}
              archiveTodo={() => this.archiveTodo(todoItem)}
            />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default TodoListPage;
