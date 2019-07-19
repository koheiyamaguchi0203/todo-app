import React from "react";

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
        // UnixTimeを入れているのはJSの日付の比較する時になんか困ったから。どうして困ったのかは覚えてない。
        createdAt: new Date().getTime(),
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
