import React from "react";
import InsertTodo from "./InsertTodo";
import TodoItem from "./TodoItem";
import axios from "axios";
import { getApiV1Todos, postApiV1Todos, patchApiV1Todos } from "./routes";

class TodoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todoItems: [], isArchived: false };
  }

  filterArchivedTodoItems = () => {
    if (this.state.isArchived) {
      return this.state.todoItems.filter(todoItem => todoItem.archived);
    } else {
      const notArchivedtodoItems = this.state.todoItems.filter(
        todoItem => !todoItem.archived
      );
      return notArchivedtodoItems;
    }
  };

  listTitle = () => {
    if (this.state.isArchived) {
      return "Archived List";
    } else {
      return "TodoList";
    }
  };

  sortBy(key, order) {
    this.setState(prevState => {
      let sortedList = prevState.todoItems.sort((todoItemOne, todoItemTwo) => {
        if (this.orderCondition(todoItemOne, todoItemTwo, key, order)) {
          return 1;
        } else if (todoItemOne[key] === todoItemTwo[key]) {
          return 0;
        } else {
          return -1;
        }
      });
      return { todoItems: sortedList, isArchived: prevState.isArchived };
    });
  }

  orderCondition(todoItemOne, todoItemTwo, key, order) {
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

  updateTodoItem = (updateTodoItemTitle, updateTodoItem) => {
    axios
      .patch(patchApiV1Todos(updateTodoItem), {
        todo: {
          title: updateTodoItemTitle,
          archived: updateTodoItem.archived
        }
      })
      .then(response => {
        let todoItem = response.data.data;
        this.setState(prevState => {
          return {
            todoItems: [
              ...prevState.todoItems,
              {
                id: todoItem.id,
                title: todoItem.title,
                archived: todoItem.archived,
                createdAt: new Date(todoItem.inserted_at * 1000).getTime()
              }
            ]
          };
        });
      });
  };

  deleteTodoItem = todoItem => {
    this.setState(prevState => {
      let newTodoItems = prevState.todoItems.filter(
        newTodoItem => todoItem.id !== newTodoItem.id
      );
      return {
        todoItems: newTodoItems
      };
    });
  };

  archiveTodo = archiveTodoItem => {
    axios
      .patch(patchApiV1Todos(archiveTodoItem), {
        todo: {
          title: archiveTodoItem.title,
          archived: !archiveTodoItem.archived
        }
      })
      .then(response => {
        let resTodoItem = response.data.data;
        this.setState(prevState => {
          let archivedTodoItems = prevState.todoItems.map(todoItem => {
            if (todoItem.id === resTodoItem.id) {
              return resTodoItem;
            } else {
              return todoItem;
            }
          });
          return {
            todoItems: archivedTodoItems
          };
        });
      });
  };

  createTodoItem = todoItem => {
    axios
      .post(postApiV1Todos(), {
        todo: {
          title: todoItem.title,
          archived: todoItem.archived
        }
      })
      .then(response => {
        let todoItem = response.data.data;
        this.setState(prevState => {
          return {
            todoItems: [
              ...prevState.todoItems,
              {
                id: todoItem.id,
                title: todoItem.title,
                archived: todoItem.archived,
                createdAt: new Date(todoItem.inserted_at * 1000).getTime()
              }
            ]
          };
        });
      });
  };

  componentDidMount() {
    axios
      .get(getApiV1Todos())
      .then(response => {
        // この形式はjsonの決まりらしい。後でググる。
        let todoItems = response.data.data.map(todoItem => {
          return {
            id: todoItem.id,
            title: todoItem.title,
            archived: todoItem.archived,
            createdAt: new Date(todoItem.inserted_at * 1000).getTime()
          };
        });
        this.setState(prevState => {
          return { ...prevState, todoItems: todoItems };
        });
      })
      .catch(error => {
        // errorをいい感じにAPI側から渡せば良いのか分かってないので、consoleに出すだけにしている。
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <h1>TodoApplication</h1>
        <h2>InsertTodo</h2>
        <InsertTodo handleOnClick={this.createTodoItem} />
        <h2>Change List</h2>
        <div>
          <div
            onClick={() =>
              this.setState(prevState => {
                return { isArchived: !prevState.isArchived };
              })
            }
          >
            {this.state.isArchived
              ? "Archived TodoItems"
              : "Not Archvied TodoItems"}
          </div>
        </div>
        {this.returnSortTodoItems()}
        <h2>{this.listTitle()}</h2>
        {this.filterArchivedTodoItems().map((todoItem, index) => (
          <div key={index}>
            <TodoItem
              todoItem={todoItem}
              updateTodoItem={this.updateTodoItem}
              deleteTodoItem={this.deleteTodoItem}
              archiveTodo={this.archiveTodo}
            />
          </div>
        ))}
      </>
    );
  }
}

export default TodoListPage;
