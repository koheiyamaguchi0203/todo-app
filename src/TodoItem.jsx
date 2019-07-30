import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItem: this.props.todoItem,
      onClick: false
    };
  }

  handleOnChange = event => {
    event.persist();
    this.setState(prevState => ({
      todoItem: { ...prevState.todoItem, title: event.target.value }
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.todoItem.id !== this.props.todoItem.id) {
      this.setState({
        todoItem: this.props.todoItem,
        onClick: prevState.onClick
      });
    }
  }

  render() {
    if (this.state.onClick) {
      return (
        <React.Fragment>
          ID:{this.state.todoItem.id}
          <br />
          <input
            value={this.state.todoItem.title}
            onChange={event => {
              this.handleOnChange(event);
            }}
          />
          <br />
          Created At:
          {new Date(this.state.todoItem.createdAt).toLocaleDateString()}
          <div
            onClick={() => {
              this.setState(prevState => ({
                todoItem: {
                  ...prevState.todoItem
                },
                onClick: false
              }));
              this.props.updateTodoItem(this.state.todoItem);
              this.setState({ onClick: false });
            }}
          >
            保存する
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div onClick={() => this.setState({ onClick: true })}>
            ID:{this.state.todoItem.id}
            <br />
            Title:{this.state.todoItem.title}
            <br />
            Created At:
            {new Date(this.state.todoItem.createdAt).toLocaleDateString()}
            <br />
            <div onClick={() => this.props.deleteTodoItem()}>削除する</div>
            {/* これに統一する */}
            <div onClick={() => this.props.archiveTodo(this.state.todoItem)}>
              {this.state.todoItem.archived ? "Todo" : "Archive"}
            </div>
            <br />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default TodoItem;
