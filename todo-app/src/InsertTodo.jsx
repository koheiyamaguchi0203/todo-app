import React from "react";
// import TodoInput from "./TodoInput";

class InsertTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: { title: "" }
    };
  }

  handleOnChange = event => {
    this.setState({
      todoItem: { title: event.target.value }
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
            this.props.handleOnClick(this.state.todoItem);
            this.setState({ todoItem: { title: "" } });
          }}
        />
      </div>
    );
  }
}

export default InsertTodo;
