import React from "react";
// import TodoInput from "./TodoInput";

class InsertTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: { id: "", title: "", createdAt: "", archived: false }
    };
  }

  handleOnChange = event => {
    this.setState({
      todoItem: {
        id: this.props.lastTodoItemId + 1,
        title: event.target.value,
        createdAt: new Date().toLocaleDateString(),
        archived: false
      }
    });
  };

  render() {
    return (
      <div>
        <input
          onChange={event => this.handleOnChange(event)}
          value={this.state.todoItem.title}
        />
        <input
          type="button"
          value="Todoを作成する"
          onClick={() => {
            this.setState({
              todoItem: { id: "", title: "" }
            });
            this.props.handleOnClick(this.state.todoItem);
          }}
        />
      </div>
    );
  }
}

export default InsertTodo;
